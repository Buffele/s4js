var util = require('util')
var zlib = require('zlib')

var EventOPCode = require('../Core/S4League/Relay/Constants/EventOPCode')
var RelayOPCode = require('../Core/S4League/Relay/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetClient = require('../Core/ProudNet/Client')

var Config = require('./Config')

var GameEventMessage = require('../Core/S4League/Game/Constants/GameEventMessage')

// C2S
var CLoginReq = require('../Core/S4League/Relay/C2S/CLoginReq')
var CNotifyInfoReq = require('../Core/S4League/Relay/C2S/CNotifyInfoReq')

// S2C
var SLoginAck = require('../Core/S4League/Relay/S2C/SLoginAck')
var SEnterPlayerAck = require('../Core/S4League/Relay/S2C/SEnterPlayerAck')

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
var AimedPoint = require('../Core/S4League/Relay/C2C/AimedPoint')
var FlyStateSync = require('../Core/S4League/Relay/C2C/FlyStateSync')
var BallSync = require('../Core/S4League/Relay/C2C/BallSync')
var BallSnapshot = require('../Core/S4League/Relay/C2C/BallSnapshot')
var AbilityChangeSync = require('../Core/S4League/Relay/C2C/AbilityChangeSync')
var SyncObjectObstruction = require('../Core/S4League/Relay/C2C/SyncObjectObstruction')

var Chat = require('../Core/S4League/Relay/C2C/Chat')
var P2PEventMessage = require('../Core/S4League/Relay/C2C/P2PEventMessage')

var log = new Logger('Client', true)

var players = []

function createPlayerSpawnReq(oldCharacter, accountId, name) {
	// SpawnReq
	var data = {
		accountId: accountId,
		unk1: 0,
		//slot: 257,
		slot: 256,
		team: 0,
		position: { x: 0.0078125, y: 999424, z: 0.0078125 },
		rotation: { x: 0, y: 130 },
		clothes: [
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 }
		],
		skills: [
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 }
		],
		weapons1: [
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 }
		],
		weapons2: [
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 },
			{ val1: 0, val2: 0, val3: 0, val4: 0 }
		],
		selectedWeaponSlot: 3,
		gender: 0,
		name: name,
		unk9: 0,
		country: '',
		currentHp: 120,
		maxHp: 120,
		unk12: 0.0078125,
		unk13: 4,
		unk14: new Buffer([0x00, 0x00, 0x00, 0x00, 0xaa, 0xe5, 0x2a, 0x77, 0x00, 0x00, 0x00, 0x00, 0x93, 0xe9, 0x2a, 0x77, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x04, 0x81, 0x4d, 0x00, 0x00, 0x00, 0x00, 0xfa, 0x00, 0x2b, 0x77, 0x00, 0x00, 0xff, 0x00])
	}

	var eventPacket = EventPacket.serialize(EventOPCode.PlayerSpawnReq, PlayerSpawnReq.serialize(data, oldCharacter))
	var packet_ = Packet_.serialize(0, eventPacket)

	var packet = new Packet()
	packet.writeUInt8(1) // OPCode - RMI ID
	packet.writeUInt16LE(RelayOPCode.Packet) // RMI ID
	packet.writeBuffer(packet_)

	return packet.data.toBuffer()
}

//for (i = 1309021; i < 1309311; i++) {
var accountId = new Date().getTime()
var config = {
	tunnelId: buildTunnelId(1, 9, 1),
	accountId: accountId,//100,//13765814, //new Date().getTime()
	name: 'Test' + accountId//'BlingBlangBlong'
}

function buildTunnelId(server, channel, room) {
	server = server + ''
	channel = channel + ''
	room = room + ''

	if (channel.length === 1) {
		channel = '0' + channel
	}

	if (room.length === 1) {
		room = '00' + room
	}

	if (room.length === 2) {
		room = '0' + room
	}

	return server + channel + room
}

load()

function load() {
	log.debug('Tunnel ID: ' + config.tunnelId)
	log.debug('Account ID: ' + config.accountId)

	log.info('Starting ProudNetClient...')

	var client = new ProudNetClient({
		protocolVersion: Common.RelayProtocolVersion,
		enableRelaying: true,
		enableC2S2CUDP: false,
		enableC2CUDP: false
	})

	client.connect(Config.relay.port, Config.relay.ip, function () {
		log.info('Connected to ' + Config.relay.ip + ':' + Config.relay.port)
	})

	client.on('connect', function () {
		client.sendProud(36, new Buffer([0x24, 0x01, 0x01, 0x20, 0xA7, 0x8E, 0xDC, 0xA9, 0xE3, 0xCE, 0x5F, 0xE7, 0x5D, 0x9F, 0xD0, 0xB1, 0xFD, 0x81, 0x80, 0x17, 0x54, 0x9F, 0x0F, 0xDF, 0x06, 0xA7, 0x1D, 0x41, 0x3A, 0x51, 0xAD, 0x2B, 0xC4, 0x74, 0x65, 0x73, 0x74]))
		//client.send(RelayOPCode.CLoginReq, CLoginReq.serialize(config.accountId, config.name, 'Session Hash', config.tunnelId, 1))
		//log.debug('Packet Sent [CLoginReq]')
	})

	client.on('packet', function (opCode, packet, hostId) {
		if (opCode === RelayOPCode.SLoginAck) {
			log.debug('Packet Received [SLoginAck]')
			var packet = SLoginAck.deserialize(packet)

			log.debug('Result: ' + packet.result)

			//client.send(RelayOPCode.CLoginReq, CLoginReq.serialize(config.accountId, '****', buildTunnelId(10, 2, room), 0))
			//log.debug('Packet Sent [CLoginReq]')
		} else if (opCode === RelayOPCode.SEnterPlayerAck) {
			log.debug('Packet Received [SEnterPlayerAck]')
			var packet = SEnterPlayerAck.deserialize(packet)

			log.debug('Host ID: ' + packet.hostId + ' Account ID: ' + packet.accountId + ' Name: ' + packet.name)

			// Let's not show ourselves
			if (packet.hostId === client.hostId) {
				return
			}

			//client.sendUnreliableRelay(3, 0, [packet.hostId], createPlayerSpawnReq(false, config.accountId, config.name))
		} else if (opCode === RelayOPCode.Chat) {
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
			//return
			log.debug('Packet Received [Packet]')
			var packet = Packet_.deserialize(packet)

			log.debug('Compressed: ' + packet.compressed)

			if (packet.compressed) {
				packet.data = zlib.inflateSync(packet.data)
			}

			var packet = new Packet(packet.data)
			var packet = EventPacket.deserialize(packet)
			var eventOPCode = packet.opCode
			var packet = new Packet(packet.data)

			if (eventOPCode === EventOPCode.Snapshot) {
				log.debug('Event Received [Snapshot]')
				var packet = Snapshot.deserialize(packet)

				log.debug(util.inspect(packet, { showHidden: false, depth: null }))
			} else {
				log.warning('Event received: [' + EventOPCode.getKeyByValue(eventOPCode) + '][' + eventOPCode + ']')
				log.debug(Packet.dump(packet.readRemaining()))
			}
		} else {
			log.warning('Packet received: [' + RelayOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
			log.debug(Packet.dump(packet.readRemaining()))
		}
	})

	client.on('groupMemberJoin', function (groupHostId, memberHostId) {
		log.debug(new Date().getTime() + ' GroupMemberJoin Group Host ID: ' + groupHostId + ' Member Host ID: ' + memberHostId)
		//return
		if (config.hostId !== memberHostId) {
			//console.log('Send to WatchDogBot!')

			//client.sendP2PGroupMemberLeave([config.watchDogHostId], memberHostId, groupHostId)
		}
	})

	client.on('groupMemberLeave', function (groupHostId, memberHostId) {
		log.debug('GroupMemberLeave Group Host ID: ' + groupHostId + ' Member Host ID: ' + memberHostId)
	})

	client.on('error', function (e) {
		if (e.code == 'ECONNRESET') {
			log.error('Connection abnormally closed')
		} else if (e.code == 'ECONNREFUSED') {
			log.error('Connection refused. Server down?')
		} else {
			log.error('Unhandled error occured: ' + e.code)
		}
	})

	client.on('close', function () {
		log.info('Connection closed')
	})
}
