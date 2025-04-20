var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var CombiCheckNameResult = require('../../Core/S4League/Chat/Constants/CombiCheckNameResult')

// C2S
var CCombiCheckNameReq = require('../../Core/S4League/Chat/C2S/CCombiCheckNameReq')
var CCombiActionReq = require('../../Core/S4League/Chat/C2S/CCombiActionReq')

// S2C
var SCombiCheckNameAck = require('../../Core/S4League/Chat/S2C/SCombiCheckNameAck')
var SCombiActionAck = require('../../Core/S4League/Chat/S2C/SCombiActionAck')

var log = new Logger('CombiService', true)

var CombiService = function(server) {
	this.server = server
}

CombiService.prototype = {
	handleCCombiCheckNameReq: function(session, packet) {
		log.debug('Packet Received [CCombiCheckNameReq]')
		var packet = CCombiCheckNameReq.deserialize(packet)

		log.debug('Name: ' + packet.name)

		// TODO: When Name already used:
		//this.server.send(session, ChatOPCode.SCombiCheckNameAck, SCombiCheckNameAck.serialize(CombiCheckNameResult.NameAlreadyUsed, packet.name))

		this.server.send(session, ChatOPCode.SCombiCheckNameAck, SCombiCheckNameAck.serialize(CombiCheckNameResult.OK, packet.name))
		log.debug('Packet Sent [SCombiCheckNameAck]')
	},
	handleCCombiActionReq: function(session, packet) {
		log.debug('Packet Received [CCombiActionReq]')
		var packet = CCombiActionReq.deserialize(packet)

		log.debug('Remove: ' + packet.remove + ' Account ID: ' + packet.accountId + ' Name: ' + packet.name + ' Combi Name: ' + packet.combiName)

		this.server.send(session, ChatOPCode.SCombiActionAck, SCombiActionAck.serialize(packet.remove, packet.accountId, packet.name, packet.combiName))
		log.debug('Packet Sent [SCombiActionAck]')
	}
}

module.exports = CombiService