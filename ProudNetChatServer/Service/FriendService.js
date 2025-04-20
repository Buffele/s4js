var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
var CFriendActionReq = require('../../Core/S4League/Chat/C2S/CFriendActionReq')

// S2C
var SFriendActionAck = require('../../Core/S4League/Chat/S2C/SFriendActionAck')

var log = new Logger('FriendService', true)

var FriendService = function(server) {
	this.server = server
}

FriendService.prototype = {
	handleCFriendActionReq: function(session, packet) {
		log.debug('Packet Received [CFriendActionReq]')
		var packet = CFriendActionReq.deserialize(packet)

		log.debug('Remove: ' + packet.remove + ' Account ID: ' + packet.accountId + ' Name: ' + packet.name)

		this.server.send(session, ChatOPCode.SFriendActionAck, SFriendActionAck.serialize(packet.remove, packet.accountId, packet.name))
		log.debug('Packet Sent [SFriendActionAck]')
	}
}

module.exports = FriendService