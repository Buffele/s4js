var util = require('util')

var Common = require('../Core/S4League/Constants/Common')
var GameOPCode = require('../Core/S4League/Game/Constants/OPCode')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetProxy = require('../Core/ProudNet/Proxy')

// C2S
var CLoginRequestReq = require('../Core/S4League/Game/C2S/CLoginRequestReq')

var Config = require('./Config')

var log = new Logger('Proxy', true)

var lastSession

var proxy = new ProudNetProxy({
	protocolVersion: Common.GameProtocolVersion,
	destinationIp: Config.target.ip,
	destinationPort: Config.target.port
})

proxy.listen(Config.source.port, Config.source.ip)

proxy.on('clientPacketReceived', function(session, opCode, packet) {
	
	log.debug('Client <-- Server:')

	log.debug('Packet received: [' + GameOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	log.debug(Packet.dump(packet.data.toBuffer()))

	proxy.sendToServer(session, opCode, packet)

	lastSession = session
})

proxy.on('serverPacketReceived', function(session, opCode, packet) {
	
	log.debug('Client --> Server:')

	log.debug('Packet Sent [' + GameOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	log.debug(Packet.dump(packet.data.toBuffer()))

	if(opCode === GameOPCode.CLoginRequestReq) {

		var deserialized = CLoginRequestReq.deserialize(packet)
		console.log(deserialized)

		deserialized.strPlayerName = "vivi";
		deserialized.ulSerial = 2;

		var packet = new Packet('E')
		packet.writeBuffer(CLoginRequestReq.serialize(deserialized))
	}
	
	proxy.sendToClient(session, opCode, packet)
})

log.info('Proxy started on ' + Config.source.ip + ':' + Config.source.port)

var CRoomAutoMixingTeamReq = require('../Core/S4League/Game/C2S/CRoomAutoMixingTeamReq')
var CRoomChoiceMasterChangeReq = require('../Core/S4League/Game/C2S/CRoomChoiceMasterChangeReq')
var CRoomLeaveRequestReq = require('../Core/S4League/Game/C2S/CRoomLeaveRequestReq')

var readline = require('readline')

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

rl.on('line', function(line) {
	var word = line.split(' ')
	if(word[0] === '/kick') {
		var accountId = parseInt(word[1])
		var reason = parseInt(word[2])

		var packet = new Packet('E')
		packet.writeBuffer(CRoomLeaveRequestReq.serialize(accountId, reason))
		proxy.sendToClient(lastSession, GameOPCode.CRoomLeaveRequestReq, packet)

		log.info('Successfully kicked.')
	} else if(word[0] === '/master') {
		var packet = new Packet('E')
		packet.writeBuffer(CRoomChoiceMasterChangeReq.serialize(13765814))
		proxy.sendToClient(lastSession, GameOPCode.CRoomChoiceMasterChangeReq, packet)

		log.info('Successfully mastered.')
	} else if(word[0] === '/shuffle') {
		var packet = new Packet('E')
		packet.writeBuffer(CRoomAutoMixingTeamReq.serialize())
		proxy.sendToClient(lastSession, GameOPCode.CRoomAutoMixingTeamReq, packet)

		log.info('Successfully shuffled.')
	} else {
		log.warning('Unknown Command: ' + word[0])
	}
})