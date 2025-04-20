var AuthOPCode = require('../Core/S4League/Auth/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetClient = require('../Core/ProudNet/Client')

var ServerType = require('../Core/S4League/Auth/Constants/ServerType')

// C2S
var CServerListReq = require('../Core/S4League/Auth/C2S/CServerListReq')

// S2C
var SServerListAck = require('../Core/S4League/Auth/S2C/SServerListAck')

var log = new Logger('Client', true)
var Config = require('./Config')

var client = new ProudNetClient({
	protocolVersion: Common.AuthProtocolVersion
})

client.connect(Config.auth.port, Config.auth.ip, function() {
	log.info('Connected to ' + Config.auth.ip + ':' + Config.auth.port)
})

client.on('connect', function() {
	client.send(AuthOPCode.CServerListReq, CServerListReq.serialize())
	log.debug('Packet Sent [CServerListReq]')

	setInterval(function() {
		client.send(AuthOPCode.CServerListReq, CServerListReq.serialize())
		log.debug('Packet Sent [CServerListReq]')
	}, 5000)
})

client.on('packet', function(opCode, packet, encryptMode) {
	if(opCode === AuthOPCode.SServerListAck) {
		log.debug('Packet Received [SServerListAck]')
		var packet = SServerListAck.deserialize(packet)

		var gamePlayerCount = 0
		var chatPlayerCount = 0

		log.debug('Server Count: ' + packet.servers.length)
		for (var i = 0; i < packet.servers.length; ++i) {
			var server = packet.servers[i]

			log.debug('ID: ' + server.id + ' Type: ' + ServerType.getKeyByValue(server.type) +' Name: ' + server.name + ' Limit: ' + server.limit + ' Online: ' + server.online +' IP: ' + server.ip + ' Port: ' + server.port + ' Group: ' + server.group)

			if(server.type === ServerType.Game) {
				gamePlayerCount += server.online
			} else if(server.type === ServerType.Chat) {
				chatPlayerCount += server.online
			}
		}
		log.debug('Total Players Online Game: ' + gamePlayerCount + ' | Chat: ' + chatPlayerCount)
		log.info('Total Players Online Game: ' + gamePlayerCount + ' | Chat: ' + chatPlayerCount + ' | Date: ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds())
	} else {
		log.warning('Packet received: [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
		log.debug(Packet.dump(packet.readRemaining()))
	}
})

client.on('error', function(e) {
	if(e.code == 'ECONNRESET') {
		log.error('Connection abnormally closed')
	} else if(e.code == 'ECONNREFUSED') {
		log.error('Connection refused. Server down?')
	} else {
		log.error('Unhandled error occured: ' + e.code)
	}
})

client.on('close', function() {
	log.info('Connection closed')
})