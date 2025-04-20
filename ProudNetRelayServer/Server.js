var RelayOPCode = require('../Core/S4League/Relay/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetServer = require('../Core/ProudNet/Server')

var ConfigManager = require('./Manager/ConfigManager')

var DataService = require('./Service/DataService')
var RelayService = require('./Service/RelayService')

var log = new Logger('Server', true)

log.info('Starting ProudNetServer...')

var server = new ProudNetServer({
	protocolVersion: Common.RelayProtocolVersion,
	enableRelaying: true,
	enableC2S2CUDP: ConfigManager.proudnet.enableC2S2CUDP,
	enableC2CUDP: ConfigManager.proudnet.enableC2CUDP,
	encryptedMessageKeyLength: ConfigManager.proudnet.encryptionKeyLength,
	enableNagleAlgorithm: 0,
	enableP2PEncryptedMessaging: 1,
	rsaBits: ConfigManager.proudnet.rsaBits
})

var dataService = new DataService(server)

var relayService = new RelayService(server, dataService)

server.on('connect', function(session) {
	log.debug('Connection opened')
})

server.on('packet', function(session, opCode, packet) {
	if(opCode === RelayOPCode.CLoginReq) {
		relayService.handleCLoginReq(session, packet)
	} else if(opCode === RelayOPCode.CNotifyInfoReq) {
		relayService.handleCNotifyInfoReq(session, packet)
	} else {
		log.warning('Unknown Packet Received [' + RelayOPCode.getKeyByValue(opCode) + ']')
		log.debug(Packet.dump(packet.readRemaining()))
	}
})

var util = require('util')
var zlib = require('zlib')
var EventOPCode = require('../Core/S4League/Relay/Constants/EventOPCode')
var RelayOPCode = require('../Core/S4League/Relay/Constants/OPCode')

// SC
var Packet_ = require('../Core/S4League/Relay/SC/Packet')

// C2C
var EventPacket = require('../Core/S4League/Relay/C2C/EventPacket')
var PlayerSpawnReq = require('../Core/S4League/Relay/C2C/PlayerSpawnReq')
var PlayerSpawnAck = require('../Core/S4League/Relay/C2C/PlayerSpawnAck')
var DamageInfo = require('../Core/S4League/Relay/C2C/DamageInfo')
var Snapshot = require('../Core/S4League/Relay/C2C/Snapshot')
var StateSync = require('../Core/S4League/Relay/C2C/StateSync')
var BgEffect = require('../Core/S4League/Relay/C2C/BgEffect')
var RebirthObject = require('../Core/S4League/Relay/C2C/RebirthObject')
// var AimedPoint = require('../Core/S4League/Relay/C2C/AimedPoint')
var FlyStateSync = require('../Core/S4League/Relay/C2C/FlyStateSync')
var BallSync = require('../Core/S4League/Relay/C2C/BallSync')
var BallSnapshot = require('../Core/S4League/Relay/C2C/BallSnapshot')
var AbilityChangeSync = require('../Core/S4League/Relay/C2C/AbilityChangeSync')
var SyncObjectObstruction = require('../Core/S4League/Relay/C2C/SyncObjectObstruction')

var Chat = require('../Core/S4League/Relay/C2C/Chat')
var P2PEventMessage = require('../Core/S4League/Relay/C2C/P2PEventMessage')

server.on('checkPackets', function(opCode, packet, through) {
	//log.info('Server Check Packet')
	//log.debug(opCode)
	//log.debug(Packet.dump(packet))

	if (opCode === RelayOPCode.Chat) {
		log.debug('Packet Received [Chat]')
		var packet = Chat.deserialize(packet)

		log.info('Message: ' + packet.message)
	} else if (opCode === RelayOPCode.P2PEventMessage) {
		log.warning('Host ID: ' + hostId)
		log.debug('Packet Received [P2PEventMessage]')
		var packet = P2PEventMessage.deserialize(packet)

		if (packet.type === GameEventMessage.ChatMessage) {
			log.debug('[ChatMessage] Sender Account ID: ' + packet.accountId + ' Text: ' + packet.message)
		} else if (packet.type === GameEventMessage.Kicked) {
			log.debug('[Kicked] Sender Account ID: ' + packet.accountId + ' Text: ' + packet.message)
		} else {
			log.warning('GameEventMessage Received [' + GameEventMessage.getKeyByValue(packet.type) + ']')
		}
	} else if (opCode === RelayOPCode.Packet) {
		//log.debug('Packet Received [Packet]')
		var packet = Packet_.deserialize(packet)

		//log.debug('Compressed: ' + packet.compressed)

		if (packet.compressed) {
			packet.data = zlib.inflateSync(packet.data)
		}

		var packet = new Packet(packet.data)
		var packet = EventPacket.deserialize(packet)
		var eventOPCode = packet.opCode
		var packet = new Packet(packet.data)

		if (eventOPCode === EventOPCode.PlayerSpawnReq) {
			log.debug('Event Received [PlayerSpawnReq] through [' + through + ']')
			var packet = PlayerSpawnReq.deserialize(packet)

			log.debug(util.inspect(packet, {showHidden: false, depth: null}))
		} else {
			//log.warning('Event received: [' + EventOPCode.getKeyByValue(eventOPCode) + '][' + eventOPCode + ']')
			//log.debug(Packet.dump(packet.readRemaining()))
		}
	} else {
		//log.warning('Packet received: [' + RelayOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
		//log.debug(Packet.dump(packet.readRemaining()))
	}
})

server.on('error', function(session, e) {
	relayService.closed(session)
	if(e.code == 'ECONNRESET') {
		log.debug('Connection closed')
	} else {
		log.error('Unhandled session error occured:')
		log.error(e)
	}
})

server.on('end', function(session) {
	relayService.closed(session)
	log.debug('Connection closed')
})

server.listen(ConfigManager.port, ConfigManager.ip)

log.info('Server started on ' + ConfigManager.ip + ':' + ConfigManager.port)