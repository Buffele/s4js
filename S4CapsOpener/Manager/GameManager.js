var events = require('events')
var util = require('util')

var Common = require('../../Core/S4League/Constants/Common')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')
var ProudNetClient = require('../../Core/ProudNet/Client')

var ConfigManager = require('./ConfigManager')

var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')

// Game
var GameLoginResult = require('../../Core/S4League/Game/Constants/LoginResult')
var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')

// Game C2S
var CLoginRequestReq = require('../../Core/S4League/Game/C2S/CLoginRequestReq')
var CItemUseCapsuleReq = require('../../Core/S4League/Game/C2S/CItemUseCapsuleReq')

// Game S2C
var SLoginRequestAck = require('../../Core/S4League/Game/S2C/SLoginRequestAck')
var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')
var SPlayerAccountInfoAck = require('../../Core/S4League/Game/S2C/SPlayerAccountInfoAck')
var SItemInventoryInfoAck = require('../../Core/S4League/Game/S2C/SItemInventoryInfoAck')
var SItemUpdateInventoryAck = require('../../Core/S4League/Game/S2C/SItemUpdateInventoryAck')

var Config = require('../Config')

var log = new Logger('GameManager', true)

var GameManager = function (gameServerConfig) {
	this.client = null

	this.gameServerConfig = gameServerConfig

	events.EventEmitter.call(this)
}

util.inherits(GameManager, events.EventEmitter)

function stop(self, force) {
	if(self.closed) {
		return
	}
	self.closed = true

	self.client.destroy()
	/*
	if(force) {
		self.client.destroy()
	} else {
		self.client.end()
	}
	*/
}

GameManager.prototype.start = function (accountId, sessionId, accessToken, refreshToken, expireDate) {
	this.closed = false
	this.loginSuccess = false
	this.accountInfoSuccess = false
	this.items = []

	this.connectTimeout = setTimeout(function () {
		log.warning('Connect to GameServer timed out!')
		stop(this, true)
	}.bind(this), Config.gameServerConnectTimeOut)

	this.loginTimeout = setTimeout(function () {
		log.warning('Login to GameServer timed out!')
		stop(this)
	}.bind(this), Config.gameServerLoginTimeOut)

	log.info('Login to GameServer')

	this.client = new ProudNetClient({
		protocolVersion: Common.GameProtocolVersion
	})

	this.client.connect(this.gameServerConfig.port, this.gameServerConfig.ip, function () {
		clearTimeout(this.connectTimeout)
		log.info('Connected to ' + this.gameServerConfig.ip + ':' + this.gameServerConfig.port)
	}.bind(this))

	this.client.on('connect', function () {
		var username = ''
		this.client.send(GameOPCode.CLoginRequestReq, CLoginRequestReq.serialize(0, username, accountId, sessionId, 1593901313, true, '', 0, '', accessToken, refreshToken, expireDate, ConfigManager.version))
		log.info('Packet Sent [CLoginRequestReq]')
	}.bind(this))

	this.client.on('packet', function (opCode, packet) {
		if (opCode === GameOPCode.SLoginRequestAck) {
			//log.info('Packet Received [SLoginRequestAck]')
			var packet = SLoginRequestAck.deserialize(packet)
			//log.info('Account ID: ' + packet.accountId)
			log.info('Result: ' + GameLoginResult.getKeyByValue(packet.result))
			//log.info('Unk 1: ' + packet.unk1)
			//log.info('Unk 2: ' + packet.unk2)
			//log.info('Unk 3: ' + packet.unk3)
			//log.info('Unk 4: ' + packet.unk4)

			if (packet.result === GameLoginResult.OK) {
				// Just wait... We need to wait for ServerResult.LoginSuccess
			} else if (packet.result === GameLoginResult.WrongVersion) {
				stop(this)
				log.error('Wrong Version. Please check the config.json.')
				process.exit()
			} else if (packet.result === GameLoginResult.TryAgain) {
				stop(this)
			} else {
				stop(this)
			}
		} else if (opCode === GameOPCode.SServerResultAck) {
			log.info('Packet Received [SServerResultAck]')
			var packet = SServerResultAck.deserialize(packet)

			log.info('Result: ' + ServerResult.getKeyByValue(packet.result))

			if (packet.result === ServerResult.LoginSuccess) {
				clearTimeout(this.loginTimeout)
				log.info('Login Success!')

				log.info('Total Items in Inventory: ' + this.items.length)

				for (var i = 0; i < this.items.length; i++) {
					var item = this.items[i]
					var itemInfo = 'ID: ' + item.id + ' Item ID: ' + item.itemId
					if(item.shopId === 2) {
						itemInfo += ' Amount: ' + item.durability
					}
					log.info(itemInfo)
				}
			} else if (packet.result === ServerResult.AnotherSession) {
				stop(this)
			}
		} else if (opCode === GameOPCode.SItemInventoryInfoAck) {
			log.debug('Packet Received [SItemInventoryInfoAck]')
			var packet = SItemInventoryInfoAck.deserialize(packet)
			var items = packet.items
			log.info('Item Count: ' + items.length)
			for (var i = 0; i < items.length; i++) {
				this.items.push(items[i])
			}
		} else if (opCode === GameOPCode.SItemUpdateInventoryAck) {
			log.debug('Packet Received [SItemUpdateInventoryAck]')
			var packet = SItemUpdateInventoryAck.deserialize(packet)

			var result = packet.result
			var item = packet.item

			var itemInfo = 'ID: ' + item.id + ' Item ID: ' + item.itemId
			if(item.shopId === 2) {
				itemInfo += ' Amount: ' + item.durability
			}
			log.info(itemInfo)
		}
	}.bind(this))

	this.client.on('error', function (e) {
		stop(this)
	}.bind(this))

	this.client.on('close', function () {
		this.emit('failure')
	}.bind(this))
}

GameManager.prototype.destroy = function () {
	if (!this.client) {
		return
	}
	stop(this)
}

module.exports = GameManager
