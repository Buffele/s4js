var fs = require('fs')

var AuthOPCode = require('../Core/S4League/Auth/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetClient = require('../Core/ProudNet/Client')

var Config = require('./Config')

var LoginResult = require('../Core/S4League/Auth/Constants/LoginResult')
var ServerType = require('../Core/S4League/Auth/Constants/ServerType')
var XBNType = require('../Core/S4League/Auth/Constants/XBNType')

// C2S
var CLoginKRReq = require('../Core/S4League/Auth/C2S/CLoginKRReq')
var CLoginEUReq = require('../Core/S4League/Auth/C2S/CLoginEUReq')
var CServerListReq = require('../Core/S4League/Auth/C2S/CServerListReq')
var COptionVersionCheckReq = require('../Core/S4League/Auth/C2S/COptionVersionCheckReq')
var CGameDataXBNReq = require('../Core/S4League/Auth/C2S/COptionVersionCheckReq')
var CLoginPHReq = require('../Core/S4League/Auth/C2S/CLoginPHReq')

// S2C
var SLoginKRAck = require('../Core/S4League/Auth/S2C/SLoginKRAck')
var SLoginEUAck = require('../Core/S4League/Auth/S2C/SLoginEUAck')
var SServerListAck = require('../Core/S4League/Auth/S2C/SServerListAck')
var SOptionVersionCheckAck = require('../Core/S4League/Auth/S2C/SOptionVersionCheckAck')
var SGameDataXBNAck = require('../Core/S4League/Auth/S2C/SGameDataXBNAck')
var SLoginPHAck = require('../Core/S4League/Auth/S2C/SLoginPHAck')

var log = new Logger('Client', true)

var xbnCount = 1

log.info('Starting ProudNetClient...')

var client = new ProudNetClient({
	protocolVersion: Common.AuthProtocolVersion
})

client.connect(Config.auth.port, Config.auth.ip, function() {
	log.info('Connected to ' + Config.auth.ip + ':' + Config.auth.port)
})

client.on('connect', function() {
	//client.send(AuthOPCode.CLoginEUReq, CLoginEUReq.serialize('test', 'test', '', '', '', 0, 0, 0, '', 0, '', '', '', '', '', ''))
	//log.debug('Packet Sent [CLoginEUReq]')

	//client.send(AuthOPCode.CLoginKRReq, CLoginKRReq.serialize('', '', '', 3, 0))
	//log.debug('Packet Sent [CLoginKRReq]')

	//client.send(AuthOPCode.CGameDataXBNReq, CGameDataXBNReq.serialize(0))
	//log.debug('Packet Sent [CGameDataXBNReq]')
	
	client.send(AuthOPCode.CServerListReq, CServerListReq.serialize())
	log.debug('Packet Sent [CServerListReq]')

	//client.send(AuthOPCode.COptionVersionCheckReq, COptionVersionCheckReq.serialize(1, 0))
	//log.debug('Packet Sent [COptionVersionCheckReq]')
})

client.on('packet', function(opCode, packet) {
	if(opCode === AuthOPCode.SLoginKRAck) {
		log.debug('Packet Received [SLoginKRAck]')
		var packet = SLoginKRAck.deserialize(packet)

		log.debug('Account ID: ' + packet.accountId)
		log.debug('Account ID 2: ' + packet.accountId2)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Session ID: ' + packet.sessionId)
		log.debug('Result: ' + LoginResult.getKeyByValue(packet.result))
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Unk 3: ' + packet.unk3)
		log.debug('Unk 4: ' + packet.unk4)
		log.debug('Token 1: ' + packet.token1)
		log.debug('Token 2: ' + packet.token2)
		log.debug('Token 3: ' + packet.token3)

	} else if(opCode === AuthOPCode.SLoginEUAck) {
		log.debug('Packet Received [SLoginEUAck]')
		var packet = SLoginEUAck.deserialize(packet)

		log.debug('Account ID: ' + packet.accountId)
		log.debug('Account ID 2: ' + packet.accountId2)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Session ID: ' + packet.sessionId)
		log.debug('Result: ' + LoginResult.getKeyByValue(packet.result))
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Unk 3: ' + packet.unk3)
		log.debug('Unk 4: ' + packet.unk4)
		log.debug('Access Token: ' + packet.accessToken)
		log.debug('Refresh Token: ' + packet.refreshToken)
		log.debug('Expire Date: ' + packet.expireDate)

		//client.send(AuthOPCode.COptionVersionCheckReq, COptionVersionCheckReq.serialize(1, 2))
		//log.debug('Packet Sent [COptionVersionCheckReq]')

		//client.send(AuthOPCode.CServerListReq, CServerListReq.serialize())
		//log.debug('Packet Sent [CServerListReq]')

		//client.send(AuthOPCode.CGameDataXBNReq, CGameDataXBNReq.serialize(0))
		//log.debug('Packet Sent [CGameDataXBNReq]')
	} else if(opCode === AuthOPCode.SServerListAck) {
		log.debug('Packet Received [SServerListAck]')
		var packet = SServerListAck.deserialize(packet)

		var gamePlayerCount = 0
		var chatPlayerCount = 0

		log.debug('Server Count: ' + packet.servers.length)
		for (var i = 0; i < packet.servers.length; ++i) {
			var server = packet.servers[i]

			log.debug('Unk: ' + server.unk + ' ID: ' + server.id + ' Type: ' + ServerType.getKeyByValue(server.type) +' Name: ' + server.name + ' Limit: ' + server.limit + ' Online: ' + server.online +' IP: ' + server.ip + ' Port: ' + server.port + ' Group: ' + server.group)

			if(server.type === 3) {
				gamePlayerCount += server.online
			} else if(server.type === 5) {
				chatPlayerCount += server.online
			}
		}
		log.debug('Total Players Online Game: ' + gamePlayerCount + ' | Chat: ' + chatPlayerCount)
	} else if(opCode === AuthOPCode.SOptionVersionCheckAck) {
		log.debug('Packet Received [SOptionVersionCheckAck]')
		var packet = SOptionVersionCheckAck.deserialize(packet)

		log.debug(Packet.dump(packet.compressedXml))

		fs.writeFile('./data/s4_UserData.s4', packet.compressedXml, function(err, result) {
			if(err) {
				return log.error('Error saving File s4_UserData.s4.')
			}

			log.info('Successfully saved File s4_UserData.s4.')
		})
	} else if(opCode === AuthOPCode.SGameDataXBNAck) {
		log.debug('Packet Received [SGameDataXBNAck]')
		var packet = SGameDataXBNAck.deserialize(packet)
		log.debug('Type: ' + XBNType.getKeyByValue(packet.data[0]))

		var xbnFile = xbnCount + ''
		xbnCount++

		if(xbnFile.length === 1) {
			xbnFile = '0' + xbnFile
		}

		fs.writeFile('./XBN/' + xbnFile + '.xbn', packet.data, function(err, result) {
			if(err) {
				return log.error('Error saving File ' + xbnFile + '.xbn.')
			}

			log.info('Successfully saved File ' + xbnFile + '.xbn.')
		})
	} else if(opCode === AuthOPCode.SLoginPHAck) {
		log.debug('Packet Received [SLoginPHAck]')
		var packet = SLoginPHAck.deserialize(packet)

		log.debug('Account ID: ' + packet.accountId)
		log.debug('Account ID 2: ' + packet.accountId2)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Session ID: ' + packet.sessionId)
		log.debug('Result: ' + LoginResult.getKeyByValue(packet.result))
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Unk 3: ' + packet.unk3)
		log.debug('Unk 4: ' + packet.unk4)
		log.debug('Unk 5: ' + packet.unk5)
		log.debug('Unk 6: ' + packet.unk6)
		log.debug('Unk 7: ' + packet.unk7)
	} else {
		log.warning('Packet received: [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
		log.debug(Packet.dump(packet.readRemaining()))
	}
})

client.on('error', function(e) {
	if(e.code == 'ECONNRESET') {
		log.error('Connection abnormally closed')
	} else if(e.code == 'ECONNREFUSED') {
		log.error('Connection refused. Server down?')
	} else {
		log.error('Unhandled error occured: ' + e.code)
	}
})

client.on('close', function() {
	log.info('Connection closed')
})

var readline = require('readline')

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

rl.on('line', function(line) {
	if(line === 'exit') {
		client.end()
	}
})