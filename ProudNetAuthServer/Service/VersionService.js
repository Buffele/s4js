var AuthOPCode = require('../../Core/S4League/Auth/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
var COptionVersionCheckReq = require('../../Core/S4League/Auth/C2S/COptionVersionCheckReq')

var log = new Logger('VersionService', true)

var VersionService = function(server) {
	this.server = server
}

VersionService.prototype = {
	handleCOptionVersionCheckReq: function(session, packet) {
		log.debug('Packet Received [COptionVersionCheckReq]')
		var packet = COptionVersionCheckReq.deserialize(packet)

		log.debug('Account ID: ' + packet.accountId + ' Checksum: ' + packet.checksum)

		// TODO...
	}
}

module.exports = VersionService