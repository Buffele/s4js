var ChatOPCode = require('../Core/S4League/Chat/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetClient = require('../Core/ProudNet/Client')

var Config = require('./Config')

// C2S
var CLoginReq = require('../Core/S4League/Chat/C2S/CLoginReq')

// S2C
var SLoginAck = require('../Core/S4League/Chat/S2C/SLoginAck')

var log = new Logger('Client', true)

log.info('Starting ProudNetClient...')

var client = new ProudNetClient({
	protocolVersion: Common.ChatProtocolVersion
})

client.connect(Config.chat.port, Config.chat.ip, function() {
	log.info('Connected to ' + Config.chat.ip + ':' + Config.chat.port)
})

client.on('connect', function() {
	client.send(ChatOPCode.CLoginReq, CLoginReq.serialize(1, 'Test', '1234'))
	log.debug('Packet Sent [CLoginReq]')
})

client.on('packet', function(opCode, packet) {
	if(opCode === ChatOPCode.SLoginAck) {
		log.debug('Packet Received [SLoginAck]')
		var packet = SLoginAck.deserialize(packet)

		log.debug('Result: ' + packet.result)
	} else {
		log.warning('Packet received: [' + ChatOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
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