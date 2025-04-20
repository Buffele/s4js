var AuthOPCode = require('../../Core/S4League/Auth/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ConfigManager = require('../Manager/ConfigManager')

// C2S
var CServerListReq = require('../../Core/S4League/Auth/C2S/CServerListReq')

// S2C
var SServerListAck = require('../../Core/S4League/Auth/S2C/SServerListAck')

var log = new Logger('ServerService', true)

var ServerService = function(server) {
	this.server = server
}

ServerService.prototype = {
	handleCServerListReq: function(session, packet) {
		log.debug('Packet Received [CServerListReq]')
		var packet = CServerListReq.deserialize(packet)

		this.server.send(session, AuthOPCode.SServerListAck, SServerListAck.serialize(ConfigManager.servers))
		log.debug('Packet Sent [SServerListAck]')
	}
}

module.exports = ServerService