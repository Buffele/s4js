var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')
var ShopResourceType = require('../../Core/S4League/Game/Constants/ShopResourceType')

// C2S
var CItemBuyItemReq = require('../../Core/S4League/Game/C2S/CItemBuyItemReq')
var CNewShopUpdateCheckReq = require('../../Core/S4League/Game/C2S/CNewShopUpdateCheckReq')
var CShoppingBasketActionReq = require('../../Core/S4League/Game/C2S/CShoppingBasketActionReq')
var CShoppingBasketDeleteReq = require('../../Core/S4League/Game/C2S/CShoppingBasketDeleteReq')
var CRandomShopUpdateCheckReq = require('../../Core/S4League/Game/C2S/CRandomShopUpdateCheckReq')
var CRandomShopRollingStartReq = require('../../Core/S4League/Game/C2S/CRandomShopRollingStartReq')

// S2C
var SItemUpdateInventoryAck = require('../../Core/S4League/Game/S2C/SItemUpdateInventoryAck')
var SItemBuyItemAck = require('../../Core/S4League/Game/S2C/SItemBuyItemAck')
var SNewShopUpdateCheckAck = require('../../Core/S4League/Game/S2C/SNewShopUpdateCheckAck')
var SNewShopUpdateInfoAck = require('../../Core/S4League/Game/S2C/SNewShopUpdateInfoAck')
var SRandomShopUpdateCheckAck = require('../../Core/S4League/Game/S2C/SRandomShopUpdateCheckAck')
var SRandomShopUpdateInfoAck = require('../../Core/S4League/Game/S2C/SRandomShopUpdateInfoAck')
var SRandomShopRollingStartAck = require('../../Core/S4League/Game/S2C/SRandomShopRollingStartAck')
var SShoppingBasketActionAck = require('../../Core/S4League/Game/S2C/SShoppingBasketActionAck')
var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')

var log = new Logger('ShopService', true)

var ShopService = function(server) {
	this.server = server
}

ShopService.prototype = {
	handleCItemBuyItemReq: function(session, packet) {
		log.debug('Packet Received [CItemBuyItemReq]')
		var packet = CItemBuyItemReq.deserialize(packet)

		log.debug('Count: ' + packet.items.length)

		for (var i = 0; i < packet.items.length; i++) {
			var item = packet.items[i]
			log.debug('Item ID: ' + item.itemId + ' Shop ID: ' + item.shopId + ' Period Type: ' + item.periodType + ' Period: ' + item.period + ' Color: ' + item.color + ' Effect ID: ' + item.effectId)

			item.id = Math.floor(Math.random() * (2147483647 - 1 + 1)) + 1
			item.expireTime = 0
			item.durability = 18000
			item.effects = [
				{
					effectId: item.effectId
				}
			]
			item.enchantMP = 0
			item.enchantLevel = 0

			this.server.send(session, GameOPCode.SItemUpdateInventoryAck, SItemUpdateInventoryAck.serialize(1, item))
			log.debug('Packet Sent [SItemUpdateInventoryAck]')

			this.server.send(session, GameOPCode.SItemBuyItemAck, SItemBuyItemAck.serialize(item))
			log.debug('Packet Sent [SItemBuyItemAck]')
		}

		//SMoneyRefreshCashInfoAck
	},
	handleCNewShopUpdateCheckReq: function(session, packet) {
		log.debug('Packet Received [CNewShopUpdateCheckReq]')
		var packet = CNewShopUpdateCheckReq.deserialize(packet)

		log.debug('Date 1: ' + packet.date1 + ' Date 2: ' + packet.date2 + ' Date 3: ' + packet.date3 + ' Date 4: ' + packet.date4)
		log.debug('Checksum 1: ' + packet.checksum1 + ' Checksum 2: ' + packet.checksum2 + ' Checksum 3: ' + packet.checksum3 + ' Checksum 4: ' + packet.checksum4)

		this.server.send(session, GameOPCode.SNewShopUpdateCheckAck, SNewShopUpdateCheckAck.serialize(packet.date1, packet.date2, packet.date3, packet.date4))
		log.debug('Packet Sent [SNewShopUpdateCheckAck]')

		return
		// TODO

		// NewShopPrice
		this.server.send(session, GameOPCode.SNewShopUpdateInfoAck, SNewShopUpdateInfoAck.serialize(ShopResourceType.NewShopPrice, new Buffer(0), 0, 0, '1'))
		log.debug('Packet Sent [SNewShopUpdateInfoAck]')

		// NewShopEffect
		this.server.send(session, GameOPCode.SNewShopUpdateInfoAck, SNewShopUpdateInfoAck.serialize(ShopResourceType.NewShopEffect, new Buffer(0), 0, 0, '1'))
		log.debug('Packet Sent [SNewShopUpdateInfoAck]')

		// NewShopItem
		this.server.send(session, GameOPCode.SNewShopUpdateInfoAck, SNewShopUpdateInfoAck.serialize(ShopResourceType.NewShopItem, new Buffer(0), 0, 0, '1'))
		log.debug('Packet Sent [SNewShopUpdateInfoAck]')

		// NewShopUniqueItem
		this.server.send(session, GameOPCode.SNewShopUpdateInfoAck, SNewShopUpdateInfoAck.serialize(ShopResourceType.NewShopUniqueItem, new Buffer(0), 0, 0, '1'))
		log.debug('Packet Sent [SNewShopUpdateInfoAck]')
	},
	handleCShoppingBasketActionReq: function(session, packet) {
		log.debug('Packet Received [CShoppingBasketActionReq]')
		var packet = CShoppingBasketActionReq.deserialize(packet)

		log.debug('Unk1: ' + packet.unk1 + ' Unk2: ' + packet.unk2)

		log.debug('Item ID: ' + packet.item.itemId + ' Shop ID: ' + packet.item.shopId + ' Period Type: ' + packet.item.periodType + ' Period: ' + packet.item.period + ' Color: ' + packet.item.color + ' Effect ID: ' + packet.item.effectId)

		packet.item.id = Math.floor(Math.random() * (2147483647 - 1 + 1)) + 1

		this.server.send(session, GameOPCode.SShoppingBasketActionAck, SShoppingBasketActionAck.serialize(1, packet.item))
		log.debug('Packet Sent [SShoppingBasketActionAck]')
	},
	handleCShoppingBasketDeleteReq: function(session, packet) {
		log.debug('Packet Received [CShoppingBasketDeleteReq]')
		var packet = CShoppingBasketDeleteReq.deserialize(packet)

		for (var i = 0; i < packet.itemIds.length; i++) {
			var id = packet.itemIds[i]
			log.debug('#' + i + ' Item ID: ' + id)

			item = {
				id: id,
				itemId: 0,
				shopId: 0,
				periodType: 0,
				period: 0,
				color: 0,
				effectId: 0
			}

			this.server.send(session, GameOPCode.SShoppingBasketActionAck, SShoppingBasketActionAck.serialize(3, item))
			log.debug('Packet Sent [SShoppingBasketActionAck]')
		}
	},
	handleCRandomShopUpdateCheckReq: function(session, packet) {
		log.debug('Packet Received [CRandomShopUpdateCheckReq]')
		var packet = CRandomShopUpdateCheckReq.deserialize(packet)

		log.debug('Unk: ' + packet.unk)

		this.server.send(session, GameOPCode.SRandomShopUpdateCheckAck, SRandomShopUpdateCheckAck.serialize('20160419150226'))
		log.debug('Packet Sent [SRandomShopUpdateCheckAck]')

		this.server.send(session, GameOPCode.SRandomShopUpdateInfoAck, SRandomShopUpdateInfoAck.serialize())
		log.debug('Packet Sent [SRandomShopUpdateInfoAck]')
	},
	handleCRandomShopRollingStartReq: function(session, packet) {
		log.debug('Packet Received [CRandomShopRollingStartReq]')
		var packet = CRandomShopRollingStartReq.deserialize(packet)

		log.debug(Packet.dump(packet.remaining))

		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedToRequestTask))
		log.debug('Packet Sent [SServerResultAck]')

		return
		// TODO

		// TODO
		//SMoneyRefreshCashInfoAck
		//SItemUpdateInventoryAck

		this.server.send(session, GameOPCode.SRandomShopRollingStartAck, SRandomShopRollingStartAck.serialize())
		log.debug('Packet Sent [SRandomShopRollingStartAck]')
	}
}

module.exports = ShopService