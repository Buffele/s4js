var fs = require('fs')

var AuthOPCode = require('../../Core/S4League/Auth/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')
var CompressMode = require('../../Core/ProudNet/Constants/CompressMode')

// C2S
var CGameDataXBNReq = require('../../Core/S4League/Auth/C2S/CGameDataXBNReq')

// S2C
var SGameDataXBNAck = require('../../Core/S4League/Auth/S2C/SGameDataXBNAck')

var log = new Logger('XBNService', true)

var XBNService = function(server) {
	this.server = server
	this.xbnData = []

	try {
		var xbns = fs.readdirSync('./XBN')
	} catch(e) {
		log.error('Failed to load XBN Files.')
		log.error(e)
		process.exit()
	}

	xbns.forEach(function(xbn) {
		var data = fs.readFileSync('./XBN/' + xbn)
		this.xbnData.push(data)
	}.bind(this))

	log.info(xbns.length + ' XBN Files loaded')
}

XBNService.prototype = {
	handleCGameDataXBNReq: function(session, packet) {
		log.debug('Packet Received [CGameDataXBNReq]')
		var packet = CGameDataXBNReq.deserialize(packet)

		log.debug('Unk: ' + packet.unk)

		this.xbnData.forEach(function(xbn) {
			this.server.send(session, AuthOPCode.SGameDataXBNAck, SGameDataXBNAck.serialize(xbn), CompressMode.Zip)
			//log.debug('Packet Sent [SGameDataXBNAck]')
		}.bind(this))

		log.debug('XBN Data Sent')
	}
}

module.exports = XBNService