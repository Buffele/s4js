process.title = 'S4Proxy'

var util = require('util')

var bodyParser = require('body-parser')
var express = require('express')

var Config = require('./Config')

var AuthOPCode = require('../Core/S4League/Auth/Constants/OPCode')
var ChatOPCode = require('../Core/S4League/Chat/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var GameOPCode = require('../Core/S4League/Game/Constants/OPCode')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetProxy = require('../Core/ProudNet/Proxy')

// Auth
var ServerType = require('../Core/S4League/Auth/Constants/ServerType')

// Auth S2C
var SServerListAck = require('../Core/S4League/Auth/S2C/SServerListAck')

// Game C2S
var CXignCodeAliveReq = require('../Core/S4League/Game/C2S/CXignCodeAliveReq')

// Game S2C
var SXignCodeAliveAck = require('../Core/S4League/Game/S2C/SXignCodeAliveAck')

var log = new Logger('Program', true)

log.info('Starting S4Proxy...')

var lastGameSession
var lastAccountId

var authProxy = new ProudNetProxy({
	protocolVersion: Common.AuthProtocolVersion,
	destinationIp: Config.auth.target.ip,
	destinationPort: Config.auth.target.port
})

authProxy.listen(Config.auth.source.port, Config.auth.source.ip)

authProxy.on('clientPacketReceived', function(session, opCode, packet) {
	log.debug('[AUTH] <-- [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	//log.debug(Packet.dump(packet.data.toBuffer()))

	if(opCode === AuthOPCode.SServerListAck) {
		var packet = new Packet('e')
		packet.writeBuffer(SServerListAck.serialize([
			{
				id: 25,
				type: ServerType.Game,
				name: 'Proxy',
				limit: 4000,
				online: 0,
				ip: '127.0.0.1',
				port: 28008,
				group: 13
			},
			{
				id: 8,
				type: ServerType.Chat,
				name: 'Proxy S4_Chat',
				limit: 4000,
				online: 0,
				ip: '127.0.0.1',
				port: 28013,
				group: 13
			}
		]))
	}

	authProxy.sendToServer(session, opCode, packet)
})

authProxy.on('serverPacketReceived', function(session, opCode, packet) {
	log.debug('[AUTH] --> [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	//log.debug(Packet.dump(packet.data.toBuffer()))

	authProxy.sendToClient(session, opCode, packet)
})

log.info('[AUTH] Proxy started on ' + Config.auth.source.ip + ':' + Config.auth.source.port)

var gameProxy = new ProudNetProxy({
	protocolVersion: Common.GameProtocolVersion,
	destinationIp: Config.game.target.ip,
	destinationPort: Config.game.target.port
})

gameProxy.listen(Config.game.source.port, Config.game.source.ip)

gameProxy.on('clientPacketReceived', function (session, opCode, packet) {
	log.debug('[GAME] <-- [' + GameOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	//log.debug(Packet.dump(packet.data.toBuffer()))

	if (opCode === GameOPCode.SXignCodeAliveAck) {
		var data = SXignCodeAliveAck.deserialize(packet)

		log.warning('[GAME] XignCode Request [AccountID=' + data.accountId + ']')
	}

	gameProxy.sendToServer(session, opCode, packet)

	lastGameSession = session
})

gameProxy.on('serverPacketReceived', function (session, opCode, packet) {
	log.debug('[GAME] --> [' + GameOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	//log.debug(Packet.dump(packet.data.toBuffer()))

	if (opCode === GameOPCode.CXignCodeAliveReq) {
		var data = CXignCodeAliveReq.deserialize(packet)

		log.warning('[GAME] XignCode Answer [AccountID=' + data.accountId + ']')

		if(data.accountId === lastAccountId) {
			log.info('[GAME] CUSTOM XIGNCODE ANSWER FOUND! :)')
			return
		}
	}

	gameProxy.sendToClient(session, opCode, packet)
})

log.info('[GAME] Proxy started on ' + Config.game.source.ip + ':' + Config.game.source.port)

var chatProxy = new ProudNetProxy({
	protocolVersion: Common.ChatProtocolVersion,
	destinationIp: Config.chat.target.ip,
	destinationPort: Config.chat.target.port
})

chatProxy.listen(Config.chat.source.port, Config.chat.source.ip)

chatProxy.on('clientPacketReceived', function(session, opCode, packet) {
	log.debug('[CHAT] <-- [' + ChatOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	//log.debug(Packet.dump(packet.data.toBuffer()))

	chatProxy.sendToServer(session, opCode, packet)
})

chatProxy.on('serverPacketReceived', function(session, opCode, packet) {
	log.debug('[CHAT] --> [' + ChatOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	//log.debug(Packet.dump(packet.data.toBuffer()))

	chatProxy.sendToClient(session, opCode, packet)
})

log.info('[CHAT] Proxy started on ' + Config.chat.source.ip + ':' + Config.chat.source.port)

var app = express()

app.disable('etag')
app.disable('x-powered-by')

app.use(bodyParser.urlencoded({
	limit: '20mb',
	extended: false
}))

app.post('/heartbeat', function (req, res) {
	var accountId = parseInt(req.body.accountId)
	var data = req.body.data

	lastAccountId = accountId

	var binaryData = Buffer.from(data, 'base64')

	log.debug('[HTTP] Heartbeat Request received [AccountID=' + accountId + ',DataSize=' + binaryData.length + ']')
	console.log(Packet.dump(binaryData))

	var packet = new Packet('E')
	packet.writeBuffer(SXignCodeAliveAck.serialize(accountId, binaryData))
	gameProxy.sendToServer(lastGameSession, GameOPCode.SXignCodeAliveAck, packet)

	res.sendStatus(200)
})

app.use(function(req, res) {
	res.sendStatus(404)
})

app.listen(Config.http.port, Config.http.ip)

log.info('[HTTP] S4Proxy listening on ' + Config.http.ip + ':' + Config.http.port)
