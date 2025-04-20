var AuthOPCode = require('../Core/S4League/Auth/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetServer = require('../Core/ProudNet/Server')

var ConfigManager = require('./Manager/ConfigManager')

var AuthService = require('./Service/AuthService')
var DataService = require('./Service/DataService')
var ServerService = require('./Service/ServerService')
var VersionService = require('./Service/VersionService')
var XBNService = require('./Service/XBNService')

var log = new Logger('Server', true)

log.info('Starting ProudNetServer...')

var server = new ProudNetServer({
	protocolVersion: Common.AuthProtocolVersion,
	encryptedMessageKeyLength: ConfigManager.proudnet.encryptionKeyLength,
	rsaBits: ConfigManager.proudnet.rsaBits
})

var dataService = new DataService(server)

var authService = new AuthService(server, dataService)
var serverService = new ServerService(server)
var versionService = new VersionService(server)
var xbnService = new XBNService(server)

server.on('connect', function(session) {
	log.debug('Connection opened')
})

server.on('packet', function(session, opCode, packet) {
	if(opCode === AuthOPCode.CLoginKRReq) {
		authService.handleCLoginKRReq(session, packet)
	} else if(opCode === AuthOPCode.CLoginEUReq) {
		authService.handleCLoginEUReq(session, packet)
	} else if(opCode === AuthOPCode.CLoginJPReq) {
		authService.handleCLoginJPReq(session, packet)
	} else if(opCode === AuthOPCode.CServerListReq) {
		serverService.handleCServerListReq(session, packet)
	} else if(opCode === AuthOPCode.COptionVersionCheckReq) {
		versionService.handleCOptionVersionCheckReq(session, packet)
	} else if(opCode === AuthOPCode.CAuthInTHReq) {
		authService.handleCAuthInTHReq(session, packet)
	} else if(opCode === AuthOPCode.CGameDataXBNReq) {
		xbnService.handleCGameDataXBNReq(session, packet)
	} else if(opCode === AuthOPCode.CLoginPHReq) {
		authService.handleCLoginPHReq(session, packet)
	} else {
		log.warning('Unknown Packet Received [' + AuthOPCode.getKeyByValue(opCode) + ']')
		log.debug(Packet.dump(packet.readRemaining()))
	}
})

server.on('error', function(session, e) {
	authService.closed(session)
	if(e.code == 'ECONNRESET') {
		log.debug('Connection closed')
	} else {
		log.error('Unhandled session error occured:')
		log.error(e)
	}
})

server.on('end', function(session) {
	authService.closed(session)
	log.debug('Connection closed')
})

server.listen(ConfigManager.port, ConfigManager.ip)

log.info('Server started on ' + ConfigManager.ip + ':' + ConfigManager.port)