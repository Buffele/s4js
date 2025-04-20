process.title = 'S4Proxy';

var util = require('util');

var bodyParser = require('body-parser');
var express = require('express');

var Config = require('./Config');

var AuthOPCode = require('../Core/S4League/Auth/Constants/OPCode');
var ChatOPCode = require('../Core/S4League/Chat/Constants/OPCode');
var Common = require('../Core/S4League/Constants/Common');
var GameOPCode = require('../Core/S4League/Game/Constants/OPCode');
var Logger = require('../Core/Utils/Logger');
var Packet = require('../Core/Network/Packet');
var ProudNetProxy = require('../Core/ProudNet/Proxy');

// Auth
var ServerType = require('../Core/S4League/Auth/Constants/ServerType');

// Auth C2S
var CLoginKRReq = require('../Core/S4League/Auth/C2S/CLoginKRReq');

// Auth S2C
var SLoginEUAck = require('../Core/S4League/Auth/S2C/SLoginEUAck');
var SServerListAck = require('../Core/S4League/Auth/S2C/SServerListAck');

// Game C2S
var CLoginRequestReq = require('../Core/S4League/Game/C2S/CLoginRequestReq');

// Chat C2S
var CLoginReq = require('../Core/S4League/Chat/C2S/CLoginReq');

var log = new Logger('Program', true);

log.info('Starting S4Proxy...');

const startAuthProxy = () => {
	var authProxy = new ProudNetProxy({
		protocolVersion: Common.AuthProtocolVersion,
		destinationIp: Config.auth.target.ip,
		destinationPort: Config.auth.target.port,
	});

	authProxy.listen(Config.auth.source.port, Config.auth.source.ip)

	authProxy.on('clientPacketReceived', function(session, opCode, packet) {
		log.debug('[AUTH] <-- [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']');
		log.debug(Packet.dump(packet.data.toBuffer()));

		if (opCode === AuthOPCode.SLoginEUAck) {
			const data = SLoginEUAck.deserialize(packet);
			console.log(data);
		} else if(opCode === AuthOPCode.SServerListAck) {
			var packet = new Packet('e')

			var servers = [];

			var serverId = 1;

			for(var i = 0; i < Config.servers.length; i++) {
				var server = Config.servers[i];

				servers.push({
					id: ++serverId,
					type: ServerType.Game,
					name: server.name,
					limit: 4000,
					online: 0,
					ip: server.game.source.ip,
					port: server.game.source.port,
					group: server.groupId,
				});

				servers.push({
					id: ++serverId,
					type: ServerType.Chat,
					name: server.name,
					limit: 4000,
					online: 0,
					ip: server.chat.source.ip,
					port: server.chat.source.port,
					group: server.groupId,
				});
			}

			packet.writeBuffer(SServerListAck.serialize(servers));
		}

		authProxy.sendToServer(session, opCode, packet);
	})

	authProxy.on('serverPacketReceived', function(session, opCode, packet) {
		log.debug('[AUTH] --> [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
		log.debug(Packet.dump(packet.data.toBuffer()))

		if(opCode === AuthOPCode.CLoginEUReq) {
			log.debug("Sending uwu req");
			var kr = new Packet('e');
			kr.writeBuffer(CLoginKRReq.serialize(Config.account.name, Config.account.id));
			authProxy.sendToClient(session, 5001, kr)
			return;
		}

		authProxy.sendToClient(session, opCode, packet)
	});

	log.info('[AUTH] Proxy started on ' + Config.auth.source.ip + ':' + Config.auth.source.port);
}

const startGameProxy = (server) => {
	var gameProxy = new ProudNetProxy({
		protocolVersion: Common.GameProtocolVersion,
		destinationIp: server.game.target.ip,
		destinationPort: server.game.target.port
	})

	gameProxy.listen(server.game.source.port, server.game.source.ip)

	gameProxy.on('clientPacketReceived', function (session, opCode, packet) {
		log.debug('[GAME] <-- [' + GameOPCode.getKeyByValue(opCode) + '][' + opCode + ']');
		log.debug(Packet.dump(packet.data.toBuffer()));

		gameProxy.sendToServer(session, opCode, packet);
	});

	gameProxy.on('serverPacketReceived', function (session, opCode, packet) {
		log.debug('[GAME] --> [' + GameOPCode.getKeyByValue(opCode) + '][' + opCode + ']');
		log.debug(Packet.dump(packet.data.toBuffer()));

		if (opCode === GameOPCode.CLoginRequestReq) {
			var deserialized = CLoginRequestReq.deserialize(packet);
			console.log(deserialized);

			deserialized.strPlayerName = Config.account.name;
			deserialized.ulSerial = Config.account.id;

			packet = new Packet('E');
			packet.writeBuffer(CLoginRequestReq.serialize(deserialized));
		}

		gameProxy.sendToClient(session, opCode, packet);
	});

	log.info('[GAME] Proxy started on ' + server.game.source.ip + ':' + server.game.source.port);
}

const startChatProxy = (server) => {
	var chatProxy = new ProudNetProxy({
		protocolVersion: Common.ChatProtocolVersion,
		destinationIp: server.chat.target.ip,
		destinationPort: server.chat.target.port,
	});

	chatProxy.listen(server.chat.source.port, server.chat.source.ip);

	chatProxy.on('clientPacketReceived', function(session, opCode, packet) {
		log.debug('[CHAT] <-- [' + ChatOPCode.getKeyByValue(opCode) + '][' + opCode + ']');
		log.debug(Packet.dump(packet.data.toBuffer()));

		chatProxy.sendToServer(session, opCode, packet);
	});

	chatProxy.on('serverPacketReceived', function(session, opCode, packet) {
		log.debug('[CHAT] --> [' + ChatOPCode.getKeyByValue(opCode) + '][' + opCode + ']');
		log.debug(Packet.dump(packet.data.toBuffer()));

		if(opCode === ChatOPCode.CLoginReq) {
			var deserialized = CLoginReq.deserialize(packet)
			console.log(deserialized)

			deserialized.name = Config.account.name;
			deserialized.accountId = Config.account.id;

			packet = new Packet('E')
			packet.writeBuffer(CLoginReq.serialize(deserialized))
		}

		chatProxy.sendToClient(session, opCode, packet);
	});

	log.info('[CHAT] Proxy started on ' + server.chat.source.ip + ':' + server.chat.source.port);
}

const startServers = () => {
	for (var i = 0; i < Config.servers.length; i++) {
		var server = Config.servers[i];

		log.info('[SERVER] Starting ' + server.name + '...');

		startGameProxy(server);
		startChatProxy(server);
	}
}

startAuthProxy();
startServers();

var app = express();

app.disable('etag');
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({
	limit: '20mb',
	extended: false,
}));

app.use(function(req, res) {
	res.sendStatus(404);
});

app.listen(Config.http.port, Config.http.ip);

log.info('[HTTP] S4Proxy listening on ' + Config.http.ip + ':' + Config.http.port);
