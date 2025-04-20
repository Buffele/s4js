var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ItemUseChangeNickCancelResult = require('../../Core/S4League/Game/Constants/ItemUseChangeNickCancelResult')
var ItemUseChangeNickResult = require('../../Core/S4League/Game/Constants/ItemUseChangeNickResult')
var NickCheckResult = require('../../Core/S4League/Game/Constants/NickCheckResult')

// C2S
var CNickCheckReq = require('../../Core/S4League/Game/C2S/CNickCheckReq')
var CItemUseChangeNickReq = require('../../Core/S4League/Game/C2S/CItemUseChangeNickReq')
var CItemUseChangeNickCancelReq = require('../../Core/S4League/Game/C2S/CItemUseChangeNickCancelReq')

// S2C
var SNickCheckAck = require('../../Core/S4League/Game/S2C/SNickCheckAck')
var SItemUseChangeNickAck = require('../../Core/S4League/Game/S2C/SItemUseChangeNickAck')
var SItemUseChangeNickCancelAck = require('../../Core/S4League/Game/S2C/SItemUseChangeNickCancelAck')

var log = new Logger('NickService', true)

var NickService = function(server) {
	this.server = server
}

NickService.prototype = {
	handleCNickCheckReq: function(session, packet) {
		log.debug('Packet Received [CNickCheckReq]')
		var packet = CNickCheckReq.deserialize(packet)

		log.debug('Name: ' + packet.name)

		// TODO: If Name is invalid:
		//this.server.send(session, GameOPCode.SNickCheckAck, SNickCheckAck.serialize(NickCheckResult.InvalidCharacters))

		this.server.send(session, GameOPCode.SNickCheckAck, SNickCheckAck.serialize(NickCheckResult.OK))
		log.debug('Packet Sent [SNickCheckAck]')
	},
	handleCItemUseChangeNickReq: function(session, packet) {
		log.debug('Packet Received [CItemUseChangeNickReq]')
		var packet = CItemUseChangeNickReq.deserialize(packet)

		log.debug('Item ID: ' + packet.itemId + ' Name: ' + packet.name)

		this.server.send(session, GameOPCode.SItemUseChangeNickAck, SItemUseChangeNickAck.serialize(ItemUseChangeNickResult.OK))
		log.debug('Packet Sent [SItemUseChangeNickAck]')
	},
	handleCItemUseChangeNickCancelReq: function(session, packet) {
		log.debug('Packet Received [CItemUseChangeNickCancelReq]')
		var packet = CItemUseChangeNickCancelReq.deserialize(packet)

		this.server.send(session, GameOPCode.SItemUseChangeNickCancelAck, SItemUseChangeNickCancelAck.serialize(ItemUseChangeNickCancelResult.OK))
		log.debug('Packet Sent [SItemUseChangeNickCancelAck]')
	}
}

module.exports = NickService