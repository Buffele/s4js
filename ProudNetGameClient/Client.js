var fs = require('fs')

var GameOPCode = require('../Core/S4League/Game/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetClient = require('../Core/ProudNet/Client')

var Config = require('./Config')

var ShopResourceType = require('../Core/S4League/Game/Constants/ShopResourceType')

// C2S
var CLoginRequestReq = require('../Core/S4League/Game/C2S/CLoginRequestReq')
var CNewShopUpdateCheckReq = require('../Core/S4League/Game/C2S/CNewShopUpdateCheckReq')
var CRandomShopUpdateCheckReq = require('../Core/S4League/Game/C2S/CRandomShopUpdateCheckReq')
var CChannelInfoReq = require('../Core/S4League/Game/C2S/CChannelInfoReq')

// S2C
var SLoginRequestAck = require('../Core/S4League/Game/S2C/SLoginRequestAck')
var SChannelListInfoAck = require('../Core/S4League/Game/S2C/SChannelListInfoAck')
var SNewShopUpdateCheckAck = require('../Core/S4League/Game/S2C/SNewShopUpdateCheckAck')
var SNewShopUpdateInfoAck = require('../Core/S4League/Game/S2C/SNewShopUpdateInfoAck')
var SRandomShopUpdateCheckAck = require('../Core/S4League/Game/S2C/SRandomShopUpdateCheckAck')
//var SRandomShopUpdateInfoAck = require('../Core/S4League/Game/S2C/SRandomShopUpdateInfoAck')

var log = new Logger('Client', true)

log.info('Starting ProudNetClient...')

var client = new ProudNetClient({
	protocolVersion: Common.GameProtocolVersion
})

client.connect(Config.game.port, Config.game.ip, function () {
	log.info('Connected to ' + Config.game.ip + ':' + Config.game.port)
})

client.on('connect', function () {
	client.sendProud(36, new Buffer([0x24, 0x01, 0x01, 0x20, 0xA7, 0x8E, 0xDC, 0xA9, 0xE3, 0xCE, 0x5F, 0xE7, 0x5D, 0x9F, 0xD0, 0xB1, 0xFD, 0x81, 0x80, 0x17, 0x54, 0x9F, 0x0F, 0xDF, 0x06, 0xA7, 0x1D, 0x41, 0x3A, 0x51, 0xAD, 0x2B, 0xC4, 0x74, 0x65, 0x73, 0x74]))

	//client.send(GameOPCode.CLoginRequestReq, CLoginRequestReq.serialize(0, '', 1, '1234', 1, false, '', 0, '', 'Token 1', 'Token 2', 'Token 3'))
	//log.debug('Packet Sent [CLoginRequestReq]')

	//client.send(GameOPCode.CNewShopUpdateCheckReq, CNewShopUpdateCheckReq.serialize(
	//	'20170927103214', '20170927103214', '20170927103214', '20170927103214', 
	//	0, 0, 0, 0))
	//log.debug('Packet Sent [CNewShopUpdateCheckReq]')

	//client.send(GameOPCode.CChannelInfoReq, CChannelInfoReq.serialize(5))
	//log.debug('Packet Sent [CChannelInfoReq]')

	//client.send(GameOPCode.CRandomShopUpdateCheckReq, CRandomShopUpdateCheckReq.serialize(257))
	//log.debug('Packet Sent [CRandomShopUpdateCheckReq]')
})

client.on('packet', function (opCode, packet) {
	if (opCode === GameOPCode.SLoginRequestAck) {
		log.debug('Packet Received [SLoginRequestAck]')
		var packet = SLoginRequestAck.deserialize(packet)

		log.debug('Account ID: ' + packet.accountId)
		log.debug('Result: ' + packet.result)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Unk 3: ' + packet.unk3)
		log.debug('Unk 4: ' + packet.unk4)
	} else if (opCode === GameOPCode.SChannelListInfoAck) {
		log.debug('Packet Received [SChannelListInfoAck]')
		var packet = SChannelListInfoAck.deserialize(packet)

		console.log(packet)
	} else if (opCode === GameOPCode.SNewShopUpdateCheckAck) {
		log.debug('Packet Received [SNewShopUpdateCheckAck]')
		var packet = SNewShopUpdateCheckAck.deserialize(packet)

		log.debug('Unk: ' + packet.unk)
		log.debug('Date 1: ' + packet.date1)
		log.debug('Date 2: ' + packet.date2)
		log.debug('Date 3: ' + packet.date3)
		log.debug('Date 4: ' + packet.date4)
	} else if (opCode === GameOPCode.SNewShopUpdateInfoAck) {
		log.debug('Packet Received [SNewShopUpdateInfoAck]')
		var packet = SNewShopUpdateInfoAck.deserialize(packet)

		log.debug('Type: ' + ShopResourceType.getKeyByValue(packet.type))
		log.debug('Compressed Size: ' + packet.compressedSize)
		log.debug('Decompressed Size: ' + packet.decompressedSize)
		log.debug('Date: ' + packet.date)

		fs.writeFile('./Shop/' + ShopResourceType.getKeyByValue(packet.type) + '.shop', packet.data, function (err, result) {
			if (err) {
				return log.error('Error saving File ' + ShopResourceType.getKeyByValue(packet.type) + '.shop.')
			}

			log.info('Successfully saved File ' + ShopResourceType.getKeyByValue(packet.type) + '.shop.')
		})

		//log.debug(Packet.dump(packet.data))
	} else if (opCode === GameOPCode.SRandomShopUpdateCheckAck) {
		log.debug('Packet Received [SRandomShopUpdateCheckAck]')
		var packet = SRandomShopUpdateCheckAck.deserialize(packet)

		log.debug('Date: ' + packet.date)
	} else if (opCode === GameOPCode.SRandomShopUpdateInfoAck) {
		log.debug('Packet Received [SRandomShopUpdateInfoAck]')
		//var packet = SRandomShopUpdateInfoAck.deserialize(packet)

		var data = packet.readRemaining()

		log.debug('Data Length: ' + data.length)
		//log.debug(Packet.dump(data))

		fs.writeFile('./Shop/Random.shop', packet.data, function (err, result) {
			if (err) {
				return log.error('Error saving File Random.shop.')
			}

			log.info('Successfully saved File Random.shop.')
		})
	} else {
		log.warning('Packet received: [' + GameOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
		log.debug(Packet.dump(packet.readRemaining()))
	}
})

client.on('error', function (e) {
	if (e.code == 'ECONNRESET') {
		log.error('Connection abnormally closed')
	} else if (e.code == 'ECONNREFUSED') {
		log.error('Connection refused. Server down?')
	} else {
		log.error('Unhandled error occured: ' + e.code)
	}
})

client.on('close', function () {
	log.info('Connection closed')
})