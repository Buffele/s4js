var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
var CLogBeginResponseReq = require('../../Core/S4League/Game/C2S/CLogBeginResponseReq')

var log = new Logger('DevService', true)

var DevService = function(server) {
	this.server = server
}

DevService.prototype = {
	handleCLogBeginResponseReq: function(session, packet) {
		log.debug('Packet Received [CLogBeginResponseReq]')
		var packet = CLogBeginResponseReq.deserialize(packet)

		log.debug('Player ID: ' + packet.playerId)
	}
}

module.exports = DevService