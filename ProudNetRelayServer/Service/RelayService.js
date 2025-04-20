var RelayOPCode = require('../../Core/S4League/Relay/Constants/OPCode')
var HashUtil = require('../../Core/S4League/HashUtil')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var LoginResult = require('../../Core/S4League/Relay/Constants/LoginResult')

// C2S
var CLoginReq = require('../../Core/S4League/Relay/C2S/CLoginReq')
var CNotifyInfoReq = require('../../Core/S4League/Relay/C2S/CNotifyInfoReq')

// S2C
var SLoginAck = require('../../Core/S4League/Relay/S2C/SLoginAck')
var SEnterPlayerAck = require('../../Core/S4League/Relay/S2C/SEnterPlayerAck')

var log = new Logger('RelayService', true)

var RelayService = function(server, data) {
	this.server = server
	this.data = data
}

RelayService.prototype = {
	close: function(session) {
		this.closed(session)
		session.destroy()
	},
	closed: function(session) {
		if(!session.accountId || !session.tunnelId) {
			return
		}

		var room = this.data.getRoomByTunnelID(session.tunnelId)
		if(room) {
			room.players.splice(room.players.indexOf(session), 1)
		}

		this.server.leaveP2PGroup(session)
		this.data.removePlayer(session)

		if(room) {
			if(room.players.length === 0) {
				this.data.removeRoom(room)
				this.server.deleteP2Pgroup(room.groupId)
			}
		}
	},
	handleCLoginReq: function(session, packet) {
		if(session.noLoginAllowed) {
			return
		}

		session.noLoginAllowed = true

		log.debug('Packet Received [CLoginReq]')
		var packet = CLoginReq.deserialize(packet)

		// Session Hash Check
		var expectedSessionHash = HashUtil.calculateSessionHash(packet.accountId, '1234', 4, 0)
		log.debug('Expected Session Hash: ' + expectedSessionHash)
		if(packet.sessionHash === expectedSessionHash) {
			log.info('Session Hash is valid!')
		} else {
			log.error('Session Hash not valid!')
			log.error('Got: ' + packet.sessionHash)
		}

		// Check if the session is already in the room
		if(this.data.getPlayerByID(packet.accountId)) {
			this.server.send(session, RelayOPCode.SLoginAck, SLoginAck.serialize(LoginResult.Failed))
			log.debug('Packet Sent [SLoginAck]')
			session.noLoginAllowed = false
			return
		}

		session.accountId = packet.accountId
		session.name = packet.name
		session.tunnelId = packet.tunnelId

		this.data.addPlayer(session)

		log.debug('Account ID: ' + packet.accountId + ' Name: ' +  packet.name + ' Tunnel ID: ' + packet.tunnelId + ' Created Room: ' + packet.createdRoom)

		// Check if a room already exists
		var room = this.data.getRoomByTunnelID(packet.tunnelId)
		if(!room) {
			// Create a new P2P Group
			var groupId = this.server.createP2PGroup()
			// Room doesn't exists - Create a new one
			room = {
				tunnelId: packet.tunnelId,
				groupId: groupId,
				players: []
			}
			this.data.addRoom(room)
		}
		// Add the player to the room
		room.players.push(session)

		this.server.send(session, RelayOPCode.SEnterPlayerAck, SEnterPlayerAck.serialize(session.hostId, session.accountId, session.name))
		log.debug('Packet Sent [SEnterPlayerAck]')

		this.server.send(session, RelayOPCode.SEnterPlayerAck, SEnterPlayerAck.serialize(session.hostId, session.accountId, session.name))
		log.debug('Packet Sent [SEnterPlayerAck]')

		// Fake Player!!!
		this.server.send(session, RelayOPCode.SEnterPlayerAck, SEnterPlayerAck.serialize(2, 1337, "CRoom"))
		log.debug('Packet Sent [SEnterPlayerAck]')

		// Send a roomlist to the user
		for (var i = 0; i < room.players.length; ++i) {
			var player = room.players[i]
			if(session.hostId === player.hostId) {
				continue
			}
			this.server.send(session, RelayOPCode.SEnterPlayerAck, SEnterPlayerAck.serialize(player.hostId, player.accountId, player.name))
			log.debug('Packet Sent [SEnterPlayerAck]')
		}

		this.server.broadcastToGroup(room.groupId, RelayOPCode.SEnterPlayerAck, SEnterPlayerAck.serialize(session.hostId, session.accountId, session.name))
		log.debug('Packet Sent [SEnterPlayerAck]')

		this.server.joinP2PGroup(room.groupId, session)

		this.server.send(session, RelayOPCode.SLoginAck, SLoginAck.serialize(LoginResult.OK))
		log.debug('Packet Sent [SLoginAck]')
	},
	handleCNotifyInfoReq: function(session, packet) {
		log.debug('Packet Received [CNotifyInfoReq]')
		var packet = CNotifyInfoReq.deserialize(packet)

		log.debug('Host ID:' + packet.hostId)
		log.debug('Remaining: ' + Packet.dump(packet.remaining))
	}
}

module.exports = RelayService