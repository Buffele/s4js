var readline = require('readline')

var AeriaGamesUtils = require('../Core/AeriaGames/Utils')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetClient = require('../Core/ProudNet/Client')

var AuthOPCode = require('../Core/S4League/Auth/Constants/OPCode')
var GameOPCode = require('../Core/S4League/Game/Constants/OPCode')

var Config = require('./Config')
var ConfigManager = require('./Manager/ConfigManager')

// Auth
var AuthLoginResult = require('../Core/S4League/Auth/Constants/LoginResult')

// Game
var GameLoginResult = require('../Core/S4League/Game/Constants/LoginResult')
var ServerResult = require('../Core/S4League/Game/Constants/ServerResult')

// Auth C2S
var CLoginEUReq = require('../Core/S4League/Auth/C2S/CLoginEUReq')

// Auth S2C
var SLoginEUAck = require('../Core/S4League/Auth/S2C/SLoginEUAck')

// Game C2S
var CLoginRequestReq = require('../Core/S4League/Game/C2S/CLoginRequestReq')
var CItemUseCapsuleReq = require('../Core/S4League/Game/C2S/CItemUseCapsuleReq')

// Game S2C
var SLoginRequestAck = require('../Core/S4League/Game/S2C/SLoginRequestAck')
var SPlayerAccountInfoAck = require('../Core/S4League/Game/S2C/SPlayerAccountInfoAck')
var SItemInventoryInfoAck = require('../Core/S4League/Game/S2C/SItemInventoryInfoAck')
var SItemUpdateInventoryAck = require('../Core/S4League/Game/S2C/SItemUpdateInventoryAck')

var log = new Logger('Client', true)

var aeriaAccToken = ''
var accountId = ''
var sessionId = ''
var accessToken = ''
var refreshToken = ''
var expireDate = ''

var connectTimeout = null
var stop = false

process.on('StartToken', function () {
	//log.debug('Getting Token from AeriaGames...')

	AeriaGamesUtils.authorize(ConfigManager.username, ConfigManager.password, function (err, result) {
		if (err) {
			log.error(err)
		}

		//log.debug('Token successfully generated')

		aeriaAccToken = result

		process.emit('TokenDone')
	})
})

process.on('TokenDone', function () {
	log.debug('Starting AuthClient...')

	var authClient = new ProudNetClient({
		protocolVersion: Common.AuthProtocolVersion
	})

	authClient.connect(Config.auth.port, Config.auth.ip, function () {
		log.debug('Connected to ' + Config.auth.ip + ':' + Config.auth.port)
	})

	authClient.on('connect', function () {
		authClient.send(AuthOPCode.CLoginEUReq, CLoginEUReq.serialize('', '', '', '', 0, 0, 0, '', 0, '', '', aeriaAccToken, accessToken, refreshToken, expireDate))
		log.debug('Packet Sent [CLoginEUReq]')
		aeriaAccToken = ''
	})

	authClient.on('packet', function (opCode, packet) {
		if (opCode === AuthOPCode.SLoginEUAck) {
			log.debug('Packet Received [SLoginEUAck]')
			var packet = SLoginEUAck.deserialize(packet)

			//log.debug('Session ID: ' + packet.sessionId)
			log.debug('Result: ' + AuthLoginResult.getKeyByValue(packet.result))
			//log.debug('Access Token: ' + packet.accessToken)
			//log.debug('Refresh Token: ' + packet.refreshToken)
			//log.debug('Expire Date: ' + packet.expireDate)

			if (packet.result === AuthLoginResult.OK) {
				accountId = packet.accountId
				sessionId = packet.sessionId
				accessToken = packet.accessToken
				refreshToken = packet.refreshToken
				expireDate = packet.expireDate

				//log.info('Auth Login Done')

				authClient.destroy()
				process.emit('AuthDone')
			} else {
				authClient.destroy()
				process.emit('StartToken')
			}
		}
	})

	authClient.on('error', function (e) {
		if (e.code == 'ECONNRESET') {
			log.error('Connection abnormally closed')
		} else if (e.code == 'ECONNREFUSED') {
			log.error('Connection refused. Server down?')
		} else {
			log.error('Unhandled error occured: ' + e.code)
		}
	})

	authClient.on('close', function () {
		log.info('Connection closed')
	})
})

process.on('AuthDone', function () {
	var loginSuccess = false
	var accountInfoSuccess = false

	function checkIfReady(self) {
		if (!loginSuccess) {
			return
		}

		if (!accountInfoSuccess) {
			return
		}


	}

	log.debug('Starting GameClient...')

	var gameClient = new ProudNetClient({
		protocolVersion: Common.GameProtocolVersion
	})

	var number = ConfigManager.server//getRandomInt(1, Config.game.servers.length)

	gameClient.connect(Config.game.port, Config.game.servers[number - 1], function () {
		log.info('Connected to ' + Config.game.servers[number - 1] + ':' + Config.game.port)
	})

	gameClient.on('connect', function () {
		gameClient.send(GameOPCode.CLoginRequestReq, CLoginRequestReq.serialize(0, '', accountId, sessionId, 1593901313, true, '', 0, '', accessToken, refreshToken, expireDate))
		log.debug('Packet Sent [CLoginRequestReq]')
	})

	gameClient.on('packet', function (opCode, packet) {
		if (opCode === GameOPCode.SLoginRequestAck) {
			log.debug('Packet Received [SLoginRequestAck]')
			var packet = SLoginRequestAck.deserialize(packet)

			//log.debug('Account ID: ' + packet.accountId)
			log.debug('Result: ' + GameLoginResult.getKeyByValue(packet.result))
			//log.debug('Unk 1: ' + packet.unk1)
			//log.debug('Unk 2: ' + packet.unk2)
			//log.debug('Unk 3: ' + packet.unk3)
			//log.debug('Unk 4: ' + packet.unk4)

			if (packet.result === GameLoginResult.OK) {

			} else {
				gameClient.destroy()
				process.emit('StartToken')
			}
		//} else if (opCode === GameOPCode.SPlayerAccountInfoAck) {
		//	log.debug('Packet Received [SPlayerAccountInfoAck]')
		//	var packet = SPlayerAccountInfoAck.deserialize(packet)

		} else if (opCode === GameOPCode.SItemInventoryInfoAck) {
			log.debug('Packet Received [SItemInventoryInfoAck]')
			var packet = SItemInventoryInfoAck.deserialize(packet)
			var items = packet.items
			//console.log(items)
			log.info('Item Count: ' + items.length)
			for (var i = 0; i < items.length; i++) {
				var item = items[i]
				var itemInfo = 'ID: ' + item.id + ' Item ID: ' + item.itemId
				if(item.shopId === 2) {
					itemInfo += ' Amount: ' + item.durability
				}
				log.info(itemInfo)
			}

			/*
			setInterval(function() {
				gameClient.send(GameOPCode.CItemUseCapsuleReq, CItemUseCapsuleReq.serialize(1464275475))
				log.debug('Packet Sent [CItemUseCapsuleReq]')
			}, 600)
			*/
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
	})

	gameClient.on('error', function (e) {
		if (e.code == 'ECONNRESET') {
			log.error('Connection abnormally closed')
		} else if (e.code == 'ECONNREFUSED') {
			log.error('Connection refused. Server down?')
		} else {
			log.error('Unhandled error occured: ' + e.code)
		}
	})

	gameClient.on('close', function () {
		clearTimeout(connectTimeout)
		log.info('Connection closed')
	})
})

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

process.emit('StartToken')

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

rl.on('line', function (line) {
	var word = line.split(' ')
	if (word[0] === '/exit') {
		log.info('Stopping...')
		stop = true
	} else if (word[0] === '/stop') {
		log.info('Stopping...')
		stop = true
	} else {
		log.warning('Unknown Command: ' + word[0])
	}
})
