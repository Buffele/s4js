var ChatOPCode = require('../Core/S4League/Chat/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetServer = require('../Core/ProudNet/Server')

var ConfigManager = require('./Manager/ConfigManager')

var ChannelService = require('./Service/ChannelService')
var ChatService = require('./Service/ChatService')
var ClubService = require('./Service/ClubService')
var Club2Service = require('./Service/Club2Service')
var CombiService = require('./Service/CombiService')
var DataService = require('./Service/DataService')
var DenyService = require('./Service/DenyService')
var FriendService = require('./Service/FriendService')
var MessageService = require('./Service/MessageService')
var NoteService = require('./Service/NoteService')
var OptionService = require('./Service/OptionService')
var RoomService = require('./Service/RoomService')
var UserService = require('./Service/UserService')

var log = new Logger('Server', true)

log.info('Starting ProudNetServer...')

var server = new ProudNetServer({
	protocolVersion: Common.ChatProtocolVersion,
	encryptedMessageKeyLength: ConfigManager.proudnet.encryptionKeyLength,
	rsaBits: ConfigManager.proudnet.rsaBits
})

var dataService = new DataService(server)

var channelService = new ChannelService(server, dataService)
var chatService = new ChatService(server, dataService)
var clubService = new ClubService(server)
var club2Service = new Club2Service(server)
var combiService = new CombiService(server)
var denyService = new DenyService(server)
var friendService = new FriendService(server)
var messageService = new MessageService(server, dataService)
var noteService = new NoteService(server)
var optionService = new OptionService(server)
var roomService = new RoomService(server, dataService)
var userService = new UserService(server, dataService)

server.on('connect', function(session) {
	log.debug('Connection opened')
})

server.on('packet', function(session, opCode, packet) {
	if(opCode === ChatOPCode.CLoginReq) {
		chatService.handleCLoginReq(session, packet)
	} else if(opCode === ChatOPCode.CDenyActionReq) {
		denyService.handleCDenyActionReq(session, packet)
	} else if(opCode === ChatOPCode.CFriendActionReq) {
		friendService.handleCFriendActionReq(session, packet)
	} else if(opCode === ChatOPCode.CCombiCheckNameReq) {
		combiService.handleCCombiCheckNameReq(session, packet)
	} else if(opCode === ChatOPCode.CCombiActionReq) {
		combiService.handleCCombiActionReq(session, packet)
	} else if(opCode === ChatOPCode.CUserDataOneReq) {
		userService.handleCUserDataOneReq(session, packet)
	} else if(opCode === ChatOPCode.UserDataThreeAck) {
		userService.handleUserDataThreeAck(session, packet)
	} else if(opCode === ChatOPCode.CMessageChatReq) {
		messageService.handleCMessageChatReq(session, packet)
	} else if(opCode === ChatOPCode.CMessageWhisperChatReq) {
		messageService.handleCMessageWhisperChatReq(session, packet)
	} else if(opCode === ChatOPCode.CRoomInvitationPlayerReq) {
		roomService.handleCRoomInvitationPlayerReq(session, packet)
	} else if(opCode === ChatOPCode.CNoteListReq) {
		noteService.handleCNoteListReq(session, packet)
	} else if(opCode === ChatOPCode.CNoteSendReq) {
		noteService.handleCNoteSendReq(session, packet)
	} else if(opCode === ChatOPCode.CNoteReadReq) {
		noteService.handleCNoteReadReq(session, packet)
	} else if(opCode === ChatOPCode.CNoteDeleteReq) {
		noteService.handleCNoteDeleteReq(session, packet)
	} else if(opCode === ChatOPCode.CNoteCountReq) {
		noteService.handleCNoteCountReq(session, packet)
	} else if(opCode === ChatOPCode.COptionSaveCommunityReq) {
		optionService.handleCOptionSaveCommunityReq(session, packet)
	} else if(opCode === ChatOPCode.COptionSaveBinaryReq) {
		optionService.handleCOptionSaveBinaryReq(session, packet)
	} else if(opCode === ChatOPCode.CNoteRejectImportuneReq) {
		noteService.handleCNoteRejectImportuneReq(session, packet)
	} else if(opCode === ChatOPCode.CClubNoteSendReq) {
		clubService.handleCClubNoteSendReq(session, packet)
	} else if(opCode === ChatOPCode.CClubMemberListReq) {
		clubService.handleCClubMemberListReq(session, packet)
	} else if(opCode === ChatOPCode.CClubClubMemberInfoReq2) {
		club2Service.handleCClubClubMemberInfoReq2(session, packet)
	} else if(opCode === ChatOPCode.CClubMemberListReq2) {
		club2Service.handleCClubMemberListReq2(session, packet)
	} else if(opCode === ChatOPCode.CClubNoteSendReq2) {
		club2Service.handleCClubNoteSendReq2(session, packet)
	} else if(opCode === ChatOPCode.CChannelListReq) {
		channelService.handleCChannelListReq(session, packet)
	} else {
		log.warning('Unknown Packet Received [' + ChatOPCode.getKeyByValue(opCode) + ']')
		log.debug(Packet.dump(packet.readRemaining()))
	}
})

server.on('error', function(session, e) {
	chatService.closed(session)
	if(e.code == 'ECONNRESET') {
		log.debug('Connection closed')
	} else {
		log.error('Unhandled session error occured:')
		log.error(e)
	}
})

server.on('end', function(session) {
	chatService.closed(session)
	log.debug('Connection closed')
})

server.listen(ConfigManager.port, ConfigManager.ip)

log.info('Server started on ' + ConfigManager.ip + ':' + ConfigManager.port)