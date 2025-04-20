var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var HashKeyUtil = require('../../Core/S4League/Game/HashKeyUtil')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ConfigManager = require('../Manager/ConfigManager')

// C2S
var CCheckHashKeyValueReq = require('../../Core/S4League/Game/C2S/CCheckHashKeyValueReq')

var log = new Logger('SecurityService', true)

var SecurityService = function(server) {
	this.server = server

	if(!ConfigManager.resourceHashKeyCheck) {
		return
	}

	this.resourceHashKey = ''

	try {
		log.info('Calculating Resource Hash Key...')
		this.resourceHashKey = HashKeyUtil.calculateHashKeySync('./Resource/resource.s4hd')
		log.info('Done. Hash Key: ' + this.resourceHashKey)
	} catch(e) {
		log.error('Failed to load resource.s4hd.')
		log.error(e)
		process.exit()
	}
}

SecurityService.prototype = {
	handleCCheckHashKeyValueReq: function(session, packet) {
		log.debug('Packet Received [CCheckHashKeyValueReq]')
		var packet = CCheckHashKeyValueReq.deserialize(packet)

		log.debug('Checksum: ' + packet.checksum)

		if(!ConfigManager.resourceHashKeyCheck) {
			return
		}

		if(packet.checksum !== this.resourceHashKey) {
			log.error('Wrong Checksum received. Hacking Trial Detected!')
			session.destroy()
			return
		}

		session.hashKeyCheckSuccess = true
	}
}

module.exports = SecurityService