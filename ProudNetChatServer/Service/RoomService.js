var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
var CRoomInvitationPlayerReq = require('../../Core/S4League/Chat/C2S/CRoomInvitationPlayerReq')

// S2C
var SRoomInvitationPlayerAck = require('../../Core/S4League/Chat/S2C/SRoomInvitationPlayerAck')

var log = new Logger('RoomService', true)

var RoomService = function(server, data) {
	this.server = server
	this.data = data
}

RoomService.prototype = {
	handleCRoomInvitationPlayerReq: function(session, packet) {
		log.debug('Packet Received [CRoomInvitationPlayerReq]')
		var packet = CRoomInvitationPlayerReq.deserialize(packet)

		log.debug('Account ID: ' + packet.accountId)

		// TODO: S2S

		var player = this.data.getPlayerByID(packet.accountId)

		if(!player) {
			return
		}

		this.server.send(player, ChatOPCode.SRoomInvitationPlayerAck, SRoomInvitationPlayerAck.serialize(session.accountId, session.name, 13, 1, 1))
		log.debug('Packet Sent [SRoomInvitationPlayerAck]')
	}
}

module.exports = RoomService