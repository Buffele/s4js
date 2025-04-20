var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
var CChannelListReq = require('../../Core/S4League/Chat/C2S/CChannelListReq')

// S2C
var SChannelPlayerListAck = require('../../Core/S4League/Chat/S2C/SChannelPlayerListAck')

var log = new Logger('ChannelService', true)

var ChannelService = function(server, data) {
	this.server = server
	this.data = data
}

ChannelService.prototype = {
	handleCChannelListReq: function(session, packet) {
		log.debug('Packet Received [CChannelListReq]')
		var packet = CChannelListReq.deserialize(packet)

		this.server.send(session, ChatOPCode.SChannelPlayerListAck, SChannelPlayerListAck.serialize(this.data.players))
		log.debug('Packet Sent [SChannelPlayerListAck]')
	}
}

module.exports = ChannelService