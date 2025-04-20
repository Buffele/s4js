var AuthOPCode = require('../Core/S4League/Auth/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetProxy = require('../Core/ProudNet/Proxy')

var ServerType = require('../Core/S4League/Auth/Constants/ServerType')

var SServerListAck = require('../Core/S4League/Auth/S2C/SServerListAck')
var CLoginEUReq = require('../Core/S4League/Auth/C2S/CLoginEUReq')
var CLoginKRReq = require('../Core/S4League/Auth/C2S/CLoginKRReq')

var Config = require('./Config')

var log = new Logger('Proxy', true)

var proxy = new ProudNetProxy({
	protocolVersion: Common.AuthProtocolVersion,
	destinationIp: Config.target.ip,
	destinationPort: Config.target.port
})

proxy.listen(Config.source.port, Config.source.ip)

proxy.on('clientPacketReceived', function(session, opCode, packet) {
	log.debug('Client <-- Server:')

	log.debug('Packet received: [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	log.debug(Packet.dump(packet.data.toBuffer()))

	if(opCode === AuthOPCode.SServerListAck) {
		var packet = new Packet('e')
		packet.writeBuffer(SServerListAck.serialize([
			{
				id: 1,
				type: ServerType.Game,
				name: 'uwu',
				limit: 400,
				online: 0,
				ip: '127.0.0.1',
				port: 28008,
				group: 13
			},
			{
				id: 2,
				type: ServerType.Chat,
				name: 'uwu',
				limit: 400,
				online: 0,
				ip: '127.0.0.1',
				port: 28013,
				group: 13
			}
		]))
	}

	proxy.sendToServer(session, opCode, packet)
})

proxy.on('serverPacketReceived', function(session, opCode, packet) {
	log.debug('Client --> Server:')

	if(opCode === AuthOPCode.CLoginEUReq) {
		log.debug("Sending uwu req");
		var kr = new Packet('e');
		kr.writeBuffer(CLoginKRReq.serialize("vivi", 2));
		proxy.sendToClient(session, 5001, kr)
		return;
	}

	log.debug('Packet Sent [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
	log.debug(Packet.dump(packet.data.toBuffer()))

	proxy.sendToClient(session, opCode, packet)
})

log.info('Proxy started on ' + Config.source.ip + ':' + Config.source.port)