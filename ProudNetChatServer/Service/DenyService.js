var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
var CDenyActionReq = require('../../Core/S4League/Chat/C2S/CDenyActionReq')

// S2C
var SDenyActionAck = require('../../Core/S4League/Chat/S2C/SDenyActionAck')

var log = new Logger('DenyService', true)

var DenyService = function(server) {
	this.server = server
}

DenyService.prototype = {
	handleCDenyActionReq: function(session, packet) {
		log.debug('Packet Received [CDenyActionReq]')
		var packet = CDenyActionReq.deserialize(packet)

		log.debug('Remove: ' + packet.remove + ' Account ID: ' + packet.accountId + ' Name: ' + packet.name)

		this.server.send(session, ChatOPCode.SDenyActionAck, SDenyActionAck.serialize(packet.remove, packet.accountId, packet.name))
		log.debug('Packet Sent [SDenyActionAck]')
	}
}

module.exports = DenyService