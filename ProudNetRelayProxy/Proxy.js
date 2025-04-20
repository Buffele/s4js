var util = require('util')
var zlib = require('zlib')

var Common = require('../Core/S4League/Constants/Common')
var EventOPCode = require('../Core/S4League/Relay/Constants/EventOPCode')
var Logger = require('../Core/Utils/Logger')
var OPCode = require('../Core/ProudNet/Constants/OPCode')
var Packet = require('../Core/Network/Packet')
var ProudNetProxy = require('../Core/ProudNet/Proxy')
var RelayOPCode = require('../Core/S4League/Relay/Constants/OPCode')

// C2S
var CNotifyInfoReq = require('../Core/S4League/Relay/C2S/CNotifyInfoReq')

var Config = require('./Config')

var log = new Logger('Proxy', true)

var proxy = new ProudNetProxy({
	protocolVersion: Common.RelayProtocolVersion,
	destinationIp: Config.target.ip,
	destinationPort: Config.target.port,
	enableRelaying: true,
	p2pProxy: true
})

proxy.listen(Config.source.port, Config.source.ip)

proxy.on('clientPacketReceived', function (session, opCode, packet) {
	log.debug('Client <-- Server:')

	log.debug('Packet received: [' + RelayOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	log.debug(Packet.dump(packet.data.toBuffer()))

	proxy.sendToServer(session, opCode, packet)
})

proxy.on('clientProudPacketReceived', function (session, opCode_, packet_) {
	log.debug('Client <-- Server: [ProudNet]')

	log.debug('Packet received: [' + OPCode.getKeyByValue(opCode_) + '][' + opCode_ + ']')
	log.debug(Packet.dump(packet_.data.toBuffer()))

	var packet = new Packet(packet_.data.toBuffer())

	if (opCode_ === 23) { // ReliableRelay2
		var deserialized = {
			hostId: packet.readUInt32LE(),
			frameNumber: packet.readUInt32LE(),
			data: packet.readProudBuffer()
		}

		log.debug('Received from Host ID: ' + deserialized.hostId)

		var packet = new Packet(deserialized.data)

		var magic = packet.readInt16LE()
		var size = packet.readProudSize()
		var opCode = packet.readUInt8()

		if (opCode === OPCode.Rmi) {
			var rmiId = packet.readUInt16LE()

			if (rmiId === 20018) { // OPCode.P2PEventMessage
				var deserialized = {
					type: packet.readUInt32LE(),
					accountId: packet.readUInt64LE(),
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt16LE(),
					message: packet.readProudString()
				}

				log.debug('Type: ' + deserialized.type)
				log.debug('AccountId: ' + deserialized.accountId)
				log.debug('Unk1: ' + deserialized.unk1)
				log.debug('Unk2: ' + deserialized.unk2)
				log.debug('Message: ' + deserialized.message)
			} else if (rmiId === 20025) { // OPCode.Packet
				var deserialized = {
					compressed: packet.readUInt8(),
					data: packet.readProudBuffer()
				}

				if (deserialized.compressed) {
					deserialized.data = zlib.inflateSync(deserialized.data)
				}

				var packet = new Packet(deserialized.data)

				// Event Packet
				var deserialized = {
					opCode: packet.readUInt8(),
					data: packet.readRemaining()
				}

				log.debug('Event Received [' + EventOPCode.getKeyByValue(deserialized.opCode) + ']')
				log.debug(Packet.dump(deserialized.data))
			} else {
				log.warning('Other RMI ID seen: ' + rmiId)
			}
		} else {
			log.warning('Other OPCode seen: [' + OPCode.getKeyByValue(opCode) + '][' + opCode + ']')
			log.debug(Packet.dump(deserialized.data))
		}
	} else if (opCode_ === 24) { // UnreliableRelay2
		var deserialized = {
			hostId: packet.readUInt32LE(),
			data: packet.readProudBuffer()
		}

		log.debug('Received from Host ID: ' + deserialized.hostId)

		var packet = new Packet(deserialized.data)

		var opCode = packet.readUInt8()
		if (opCode === OPCode.Rmi) { // Rmi
			var rmiId = packet.readUInt16LE()

			if (rmiId === 20018) { // OPCode.P2PEventMessage
				var deserialized = {
					type: packet.readUInt32LE(),
					accountId: packet.readUInt64LE(),
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt16LE(),
					message: packet.readProudString()
				}

				log.debug('Type: ' + deserialized.type)
				log.debug('AccountId: ' + deserialized.accountId)
				log.debug('Unk1: ' + deserialized.unk1)
				log.debug('Unk2: ' + deserialized.unk2)
				log.debug('Message: ' + deserialized.message)
			} else if (rmiId === 20025) { // OPCode.Packet
				var deserialized = {
					compressed: packet.readUInt8(),
					data: packet.readProudBuffer()
				}

				if (deserialized.compressed) {
					deserialized.data = zlib.inflateSync(deserialized.data)
				}

				var packet = new Packet(deserialized.data)

				// Event Packet
				var deserialized = {
					opCode: packet.readUInt8(),
					data: packet.readRemaining()
				}

				log.debug('Event Received [' + EventOPCode.getKeyByValue(deserialized.opCode) + ']')
				log.debug(Packet.dump(deserialized.data))
			} else {
				log.warning('Other RMI ID seen: ' + rmiId)
			}
		} else {
			log.warning('Other OPCode seen: ' + opCode)
		}
	}

	proxy.sendToServerProud(session, opCode_, packet_)
})

proxy.on('serverPacketReceived', function (session, opCode, packet) {
	log.debug('Client --> Server:')

	log.debug('Packet Sent [' + RelayOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	log.debug(Packet.dump(packet.data.toBuffer()))

	/*
	if (opCode === RelayOPCode.CNotifyInfoReq) {
		var deserialized = CNotifyInfoReq.deserialize(packet)
		log.debug(util.inspect(deserialized, { showHidden: false, depth: null }))

		deserialized.online = 0

		var packet = new Packet('E')
		packet.writeBuffer(CNotifyInfoReq.serialize(deserialized.hostId, deserialized.peerId, deserialized.online))
	}
	*/

	proxy.sendToClient(session, opCode, packet)
})

proxy.on('serverProudPacketReceived', function (session, opCode, packet) {
	log.debug('Client --> Server: [ProudNet]')

	log.debug('Packet Sent [' + OPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	log.debug(Packet.dump(packet.data.toBuffer()))

	if(opCode === 21) {
		var deserialized = {
			priority: packet.readUInt8(),
			uniqueIdCounter: packet.readProudSize(),
			hostIds: []
		}

		var hostIdCount = packet.readProudSize()

		for (var i = 0; i < hostIdCount; i++) {
			deserialized.hostIds.push(packet.readUInt32LE())
		}

		var opCode = packet.readUInt8()
		log.debug('OP Code: ' + opCode)

		if(opCode === 1) {
			var rmiId = packet.readUInt16LE()
			log.debug('RMI ID: ' + rmiId)

			if(rmiId === 296) { // Chat
				var unk1 = packet.readUInt32LE()
				var unk2 = packet.readUInt16LE()
				var senderAccountId = packet.readUInt32LE()
				var unk3 = packet.readBuffer(10)
				var text = packet.readProudString()

				log.debug('Unk 1: ' + unk1)
				log.debug('Unk 2: ' + unk2)
				log.debug('Sender Account ID: ' + senderAccountId)
				log.debug('Unk 3:')
				log.debug(Packet.dump(unk3))
				log.debug('Text: ' + text)
			}
		}
	}

	proxy.sendToClientProud(session, opCode, packet)
})

log.info('Proxy started on ' + Config.source.ip + ':' + Config.source.port)
