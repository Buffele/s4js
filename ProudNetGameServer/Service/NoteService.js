var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
//var CNoteGiftItemReq = require('../../Core/S4League/Game/C2S/CNoteGiftItemReq')

// S2C

var log = new Logger('NoteService', true)

var NoteService = function(server) {
	this.server = server
}

NoteService.prototype = {
	handleCNoteGiftItemReq: function(session, packet) {
		log.debug('Packet Received [CNoteGiftItemReq]')
		//var packet = CNoteGiftItemReq.deserialize(packet)

		// TODO
	}
}

module.exports = NoteService