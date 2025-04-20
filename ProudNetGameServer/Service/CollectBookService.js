var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
var CCollectBookUpdateCheckReq = require('../../Core/S4League/Game/C2S/CCollectBookUpdateCheckReq')
var CCollectBookItemRegistReq = require('../../Core/S4League/Game/C2S/CCollectBookItemRegistReq')

// S2C
var SCollectBookUpdateCheckAck = require('../../Core/S4League/Game/S2C/SCollectBookUpdateCheckAck')
var SCollectBookItemRegistAck = require('../../Core/S4League/Game/S2C/SCollectBookItemRegistAck')

var log = new Logger('CollectBookService', true)

var CollectBookService = function(server) {
	this.server = server
}

CollectBookService.prototype = {
	handleCCollectBookUpdateCheckReq: function(session, packet) {
		log.debug('Packet Received [CCollectBookUpdateCheckReq]')
		var packet = CCollectBookUpdateCheckReq.deserialize(packet)

		log.debug('Date: ' + packet.date)

		this.server.send(session, GameOPCode.SCollectBookUpdateCheckAck, SCollectBookUpdateCheckAck.serialize())
		log.debug('Packet Sent [SCollectBookUpdateCheckAck]')
	},
	handleCCollectBookItemRegistReq: function(session, packet) {
		log.debug('Packet Received [CCollectBookItemRegistReq]')
		var packet = CCollectBookItemRegistReq.deserialize(packet)

		for (var i = 0; i < packet.items.length; i++) {
			var item = packet.items[i]
			this.server.send(session, GameOPCode.SCollectBookItemRegistAck, SCollectBookItemRegistAck.serialize(item.collectionId, item.itemId))
			log.debug('Packet Sent [SCollectBookItemRegistAck]')
		}
	}
}

module.exports = CollectBookService