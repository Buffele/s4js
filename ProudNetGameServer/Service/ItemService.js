var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var EnchantEnchantItemResult = require('../../Core/S4League/Game/Constants/EnchantEnchantItemResult')
var ItemDiscardItemResult = require('../../Core/S4League/Game/Constants/ItemDiscardItemResult')
var ItemRepairItemResult = require('../../Core/S4League/Game/Constants/ItemRepairItemResult')
var ItemUseRecordResetResult = require('../../Core/S4League/Game/Constants/ItemUseRecordResetResult')
var ItemUseType = require('../../Core/S4League/Game/Constants/ItemUseType')
var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')
var UseInstantItemResult = require('../../Core/S4League/Game/Constants/UseInstantItemResult')

// C2S
var CItemUseItemReq = require('../../Core/S4League/Game/C2S/CItemUseItemReq')
var CItemRepairItemReq = require('../../Core/S4League/Game/C2S/CItemRepairItemReq')
var CItemRefundItemReq = require('../../Core/S4League/Game/C2S/CItemRefundItemReq')
var CItemUseRecordResetReq = require('../../Core/S4League/Game/C2S/CItemUseRecordResetReq')
var CItemDiscardItemReq = require('../../Core/S4League/Game/C2S/CItemDiscardItemReq')
var CItemUseCapsuleReq = require('../../Core/S4League/Game/C2S/CItemDiscardItemReq')
var CItemEnchantReq = require('../../Core/S4League/Game/C2S/CItemEnchantReq')
var CUseInstantItemReq = require('../../Core/S4League/Game/C2S/CUseInstantItemReq')
var CUseInstantItemRemoveEffectReq = require('../../Core/S4League/Game/C2S/CUseInstantItemRemoveEffectReq')
var CAlchemyDecompositionReq = require('../../Core/S4League/Game/C2S/CAlchemyDecompositionReq')

// S2C
var SItemUseItemAck = require('../../Core/S4League/Game/S2C/SItemUseItemAck')
var SItemRepairItemAck = require('../../Core/S4League/Game/S2C/SItemRepairItemAck')
var SItemRefundItemAck = require('../../Core/S4League/Game/S2C/SItemRefundItemAck')
var SItemUseRecordResetAck = require('../../Core/S4League/Game/S2C/SItemUseRecordResetAck')
var SItemDiscardItemAck = require('../../Core/S4League/Game/S2C/SItemDiscardItemAck')
var SItemUseCapsuleAck = require('../../Core/S4League/Game/S2C/SItemUseCapsuleAck')
var SEnchantEnchantItemAck = require('../../Core/S4League/Game/S2C/SEnchantEnchantItemAck')
var SUseInstantItemAck = require('../../Core/S4League/Game/S2C/SUseInstantItemAck')
var SEnchantRefreshEnchantGaugeForInstantAck = require('../../Core/S4League/Game/S2C/SEnchantRefreshEnchantGaugeForInstantAck')
var SUseInstantItemRemoveEffectAck = require('../../Core/S4League/Game/S2C/SUseInstantItemRemoveEffectAck')
var SItemInventoryDeleteAck = require('../../Core/S4League/Game/S2C/SItemInventoryDeleteAck')
var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')

var log = new Logger('ItemService', true)

var ItemService = function(server) {
	this.server = server
}

ItemService.prototype = {
	handleCItemUseItemReq: function(session, packet) {
		log.debug('Packet Received [CItemUseItemReq]')
		var packet = CItemUseItemReq.deserialize(packet)

		log.debug('Type: ' + packet.type + ' Char Slot: ' + packet.charSlot + ' Equip Slot: ' + packet.eqSlot + ' Item ID: ' + packet.id)

		if(packet.type === ItemUseType.Equip) {

		} else if(packet.type === ItemUseType.Unequip) {

		} else {
			return log.error('Unknown ItemUseType: ' + ItemUseType.getKeyByValue(packet.type))
		}

		this.server.send(session, GameOPCode.SItemUseItemAck, SItemUseItemAck.serialize(packet.charSlot, packet.eqSlot, packet.id, packet.type))
		log.debug('Packet Sent [SItemUseItemAck]')
	},
	handleCItemRepairItemReq: function(session, packet) {
		log.debug('Packet Received [CItemRepairItemReq]')
		var packet = CItemRepairItemReq.deserialize(packet)

		for (var i = 0; i < packet.items.length; i++) {
			this.server.send(session, GameOPCode.SItemRepairItemAck, SItemRepairItemAck.serialize(ItemRepairItemResult.OK, packet.items[i]))
			log.debug('Packet Sent [SItemRepairItemAck]')
		}
	},
	handleCItemRefundItemReq: function(session, packet) {
		log.debug('Packet Received [CItemRefundItemReq]')
		var packet = CItemRefundItemReq.deserialize(packet)

		log.debug('Item ID: ' + packet.itemId)

		this.server.send(session, GameOPCode.SItemRefundItemAck, SItemRefundItemAck.serialize(packet.itemId, true))
		log.debug('Packet Sent [SItemRefundItemAck]')
		//SMoneyRefreshCashInfoAck
	},
	handleCItemUseRecordResetReq: function(session, packet) {
		log.debug('Packet Received [CItemUseRecordResetReq]')
		var packet = CItemUseRecordResetReq.deserialize(packet)

		log.debug('Item ID: ' + packet.itemId)

		this.server.send(session, GameOPCode.SItemUseRecordResetAck, SItemUseRecordResetAck.serialize(ItemUseRecordResetResult.OK))
		log.debug('Packet Sent [SItemUseRecordResetAck]')
	},
	handleCItemDiscardItemReq: function(session, packet) {
		log.debug('Packet Received [CItemDiscardItemReq]')
		var packet = CItemDiscardItemReq.deserialize(packet)

		log.debug('Item ID: ' + packet.itemId)

		this.server.send(session, GameOPCode.SItemDiscardItemAck, SItemDiscardItemAck.serialize(ItemDiscardItemResult.OK, packet.itemId))
		log.debug('Packet Sent [SItemDiscardItemAck]')
	},
	handleCItemUseCapsuleReq: function(session, packet) {
		log.debug('Packet Received [CItemUseCapsuleReq]')
		var packet = CItemUseCapsuleReq.deserialize(packet)

		log.debug('Item ID: ' + packet.itemId)

		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedToRequestTask))
		log.debug('Packet Sent [SServerResultAck]')

		return
		// TODO

		//SItemUpdateInventoryAck
		//SItemUpdateInventoryAck

		// TODO: When no more caps:
		this.server.send(session, GameOPCode.SItemInventoryDeleteAck, SItemInventoryDeleteAck.serialize(packet.itemId))
		log.debug('Packet Sent [SItemInventoryDeleteAck]')

		this.server.send(session, GameOPCode.SItemUseCapsuleAck, SItemUseCapsuleAck.serialize())
		log.debug('Packet Sent [SItemUseCapsuleAck]')

		//SMoneyRefreshCashInfoAck + PEN
	},
	handleCItemEnchantReq: function(session, packet) {
		log.debug('Packet Received [CItemEnchantReq]')
		var packet = CItemEnchantReq.deserialize(packet)

		log.debug('Item ID: ' + packet.itemId)
		log.debug(Packet.dump(packet.unk))

		//SMoneyRefreshCashInfoAck
		//SItemUpdateInventoryAck
		this.server.send(session, GameOPCode.SEnchantEnchantItemAck, SEnchantEnchantItemAck.serialize(EnchantEnchantItemResult.Normal, packet.itemId, 3299600701))
		log.debug('Packet Sent [SEnchantEnchantItemAck]')
	},
	handleCUseInstantItemReq: function(session, packet) {
		log.debug('Packet Received [CUseInstantItemReq]')
		var packet = CUseInstantItemReq.deserialize(packet)

		log.debug('Item ID: ' + packet.itemId + ' Target Item ID: ' + packet.targetItemId)

		this.server.send(session, GameOPCode.SEnchantRefreshEnchantGaugeForInstantAck, SEnchantRefreshEnchantGaugeForInstantAck.serialize(1, packet.targetItemId, 0, 168))
		log.debug('Packet Sent [SEnchantRefreshEnchantGaugeForInstantAck]')

		// TODO: SItemUpdateInventoryAck (Reducing MP Fill -1)

		this.server.send(session, GameOPCode.SUseInstantItemAck, SUseInstantItemAck.serialize(packet.itemId, packet.targetItemId, UseInstantItemResult.OK))
		log.debug('Packet Sent [SUseInstantItemAck]')
	},
	handleCUseInstantItemRemoveEffectReq: function(session, packet) {
		log.debug('Packet Received [CUseInstantItemRemoveEffectReq]')
		var packet = CUseInstantItemRemoveEffectReq.deserialize(packet)

		log.debug('Item ID: ' + packet.itemId + ' Unk1: ' + packet.unk1 + ' Unk2: ' + packet.unk2 + ' Effect ID: ' + packet.effectId)

		// TODO: Proxy!
		//this.server.send(session, GameOPCode.SUseInstantItemRemoveEffectAck, SUseInstantItemRemoveEffectAck.serialize())
		//log.debug('Packet Sent [SUseInstantItemRemoveEffectAck]')
	},
	handleCPromotionRouletteMachineStartReq: function(session, packet) {
		log.debug('Packet Received [CPromotionRouletteMachineStartReq]')
		//var packet = CPromotionRouletteMachineStartReq.deserialize(packet)

		// TODO

		// Wrong Packet for Error
		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedToRequestTask))
		log.debug('Packet Sent [SServerResultAck]')
	},
	handleCAlchemyDecompositionReq: function(session, packet) {
		log.debug('Packet Received [CAlchemyDecompositionReq]')
		var packet = CAlchemyDecompositionReq.deserialize(packet)

		log.debug('Item ID: ' + packet.itemId)

		// TODO: Proxy!
	}
}

module.exports = ItemService