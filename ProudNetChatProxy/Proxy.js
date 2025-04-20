var ChatOPCode = require('../Core/S4League/Chat/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetProxy = require('../Core/ProudNet/Proxy')

var CLoginReq = require('../Core/S4League/Chat/C2S/CLoginReq')
var Config = require('./Config')

var log = new Logger('Proxy', true)

var proxy = new ProudNetProxy({
	protocolVersion: Common.ChatProtocolVersion,
	destinationIp: Config.target.ip,
	destinationPort: Config.target.port
})

proxy.listen(Config.source.port, Config.source.ip)

proxy.on('clientPacketReceived', function(session, opCode, packet) {
	log.debug('Client <-- Server:')

	log.debug('Packet received: [' + ChatOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	log.debug(Packet.dump(packet.data.toBuffer()))

	proxy.sendToServer(session, opCode, packet)
})

proxy.on('serverPacketReceived', function(session, opCode, packet) {
	log.debug('Client --> Server:')

	log.debug('Packet Sent [' + ChatOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	log.debug(Packet.dump(packet.data.toBuffer()))

	if(opCode === ChatOPCode.CLoginReq) {

		var deserialized = CLoginReq.deserialize(packet)
		console.log(deserialized)

		deserialized.name = "vivi";
		deserialized.accountId = 2;

		var packet = new Packet('E')
		packet.writeBuffer(CLoginReq.serialize(deserialized))
	}

	proxy.sendToClient(session, opCode, packet)
})

log.info('Proxy started on ' + Config.source.ip + ':' + Config.source.port)