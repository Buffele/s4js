var Common = require('../Core/S4League/Constants/Common')
var GameOPCode = require('../Core/S4League/Game/Constants/OPCode')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetServer = require('../Core/ProudNet/Server')

var ConfigManager = require('./Manager/ConfigManager')

var ChannelManager = require('./Manager/ChannelManager')
var RoomManager = require('./Manager/RoomManager')

var AdminService = require('./Service/AdminService')
var ChannelService = require('./Service/ChannelService')
var CharacterService = require('./Service/CharacterService')
var ClubService = require('./Service/ClubService')
var Club2Service = require('./Service/Club2Service')
var CollectBookService = require('./Service/CollectBookService')
var DataService = require('./Service/DataService')
var DevService = require('./Service/DevService')
var GameService = require('./Service/GameService')
var ItemService = require('./Service/ItemService')
var MissionService = require('./Service/MissionService')
var NickService = require('./Service/NickService')
var NoteService = require('./Service/NoteService')
var RoomService = require('./Service/RoomService')
var ScoreService = require('./Service/ScoreService')
var SecurityService = require('./Service/SecurityService')
var ShopService = require('./Service/ShopService')

var log = new Logger('Server', true)

log.info('Starting ProudNetServer...')

var server = new ProudNetServer({
	protocolVersion: Common.GameProtocolVersion,
	encryptedMessageKeyLength: ConfigManager.proudnet.encryptionKeyLength,
	rsaBits: ConfigManager.proudnet.rsaBits
})

var dataService = new DataService(server)
var channelManager = new ChannelManager(server, dataService)
var roomManager = new RoomManager(server, dataService)
var roomService = new RoomService(server, dataService, roomManager)

var adminService = new AdminService(server, dataService, roomManager)
var channelService = new ChannelService(server, dataService, channelManager)
var characterService = new CharacterService(server)
var clubService = new ClubService(server)
var club2Service = new Club2Service(server)
var collectBookService = new CollectBookService(server)
var devService = new DevService(server)
var gameService = new GameService(server, dataService, channelService, roomService, channelManager, roomManager)
var itemService = new ItemService(server)
var missionService = new MissionService(server)
var nickService = new NickService(server)
var noteService = new NoteService(server)
var scoreService = new ScoreService(server, dataService)
var securityService = new SecurityService(server)
var shopService = new ShopService(server)

server.on('connect', function(session) {
	log.debug('Connection opened')
})

server.on('packet', function(session, opCode, packet) {
	if(opCode === GameOPCode.CCharacterCreateReq) {
		characterService.handleCCharacterCreateReq(session, packet)
	} else if(opCode === GameOPCode.CCharacterSelectReq) {
		characterService.handleCCharacterSelectReq(session, packet)
	} else if(opCode === GameOPCode.CCharacterDeleteReq) {
		characterService.handleCCharacterDeleteReq(session, packet)
	} else if(opCode === GameOPCode.CLoginRequestReq) {
		gameService.handleCLoginRequestReq(session, packet)
	} else if(opCode === GameOPCode.CRoomMakeReq) {
		roomService.handleCRoomMakeReq(session, packet)
	} else if(opCode === GameOPCode.CNickCheckReq) {
		nickService.handleCNickCheckReq(session, packet)
	} else if(opCode === GameOPCode.CItemUseItemReq) {
		itemService.handleCItemUseItemReq(session, packet)
	} else if(opCode === GameOPCode.CRoomLeaveReq) {
		roomService.handleCRoomLeaveReq(session, packet)
	} else if(opCode === GameOPCode.CTimeSyncReq) {
		gameService.handleCTimeSyncReq(session, packet)
	} else if(opCode === GameOPCode.CAdminShowWindowReq) {
		adminService.handleCAdminShowWindowReq(session, packet)
	} else if(opCode === 13/*GameOPCode.CClubInfoReq*/) {
		return // Do nothing here
		//clubService.handleCClubInfoReq(session, packet)
	} else if(opCode === GameOPCode.CChannelEnterReq) {
		channelService.handleCChannelEnterReq(session, packet)
	} else if(opCode === GameOPCode.CChannelLeaveReq) {
		channelService.handleCChannelLeaveReq(session, packet)
	} else if(opCode === GameOPCode.CChannelInfoReq) {
		gameService.handleCChannelInfoReq(session, packet)
	} else if(opCode === GameOPCode.CRoomEnterReq) {
		roomService.handleCRoomEnterReq(session, packet)
	} else if(opCode === GameOPCode.CItemBuyItemReq) {
		shopService.handleCItemBuyItemReq(session, packet)
	} else if(opCode === GameOPCode.CItemRepairItemReq) {
		itemService.handleCItemRepairItemReq(session, packet)
	} else if(opCode === GameOPCode.CItemRefundItemReq) {
		itemService.handleCItemRefundItemReq(session, packet)
	} else if(opCode === GameOPCode.CAdminActionReq) {
		adminService.handleCAdminActionReq(session, packet)
	} else if(opCode === GameOPCode.CPlayerBadUserReq) {
		gameService.handleCPlayerBadUserReq(session, packet)
	} else if(opCode === GameOPCode.CNewShopUpdateCheckReq) {
		shopService.handleCNewShopUpdateCheckReq(session, packet)
	} else if(opCode === GameOPCode.CItemUseChangeNickReq) {
		nickService.handleCItemUseChangeNickReq(session, packet)
	} else if(opCode === GameOPCode.CItemUseRecordResetReq) {
		itemService.handleCItemUseRecordResetReq(session, packet)
	} else if(opCode === GameOPCode.CItemDiscardItemReq) {
		itemService.handleCItemDiscardItemReq(session, packet)
	} else if(opCode === GameOPCode.CItemUseCapsuleReq) {
		itemService.handleCItemUseCapsuleReq(session, packet)
	} else if(opCode === GameOPCode.CItemUseChangeNickCancelReq) {
		nickService.handleCItemUseChangeNickCancelReq(session, packet)
	} else if(opCode === GameOPCode.CCharacterFirstCreateReq) {
		characterService.handleCCharacterFirstCreateReq(session, packet)
	} else if(opCode === GameOPCode.CShoppingBasketActionReq) {
		shopService.handleCShoppingBasketActionReq(session, packet)
	} else if(opCode === GameOPCode.CShoppingBasketDeleteReq) {
		shopService.handleCShoppingBasketDeleteReq(session, packet)
	} else if(opCode === GameOPCode.CRandomShopUpdateCheckReq) {
		shopService.handleCRandomShopUpdateCheckReq(session, packet)
	} else if(opCode === GameOPCode.CRandomShopRollingStartReq) {
		shopService.handleCRandomShopRollingStartReq(session, packet)
	} else if(opCode === GameOPCode.CRoomInfoRequestReq) {
		roomService.handleCRoomInfoRequestReq(session, packet)
	} else if(opCode === GameOPCode.CNoteGiftItemReq) {
		noteService.handleCNoteGiftItemReq(session, packet)
	} else if(opCode === GameOPCode.CRoomQuickJoinReq) {
		roomService.handleCRoomQuickJoinReq(session, packet)
	} else if(opCode === GameOPCode.CItemEnchantReq) {
		itemService.handleCItemEnchantReq(session, packet)
	} else if(opCode === GameOPCode.CCollectBookUpdateCheckReq) {
		collectBookService.handleCCollectBookUpdateCheckReq(session, packet)
	} else if(opCode === GameOPCode.CCollectBookItemRegistReq) {
		collectBookService.handleCCollectBookItemRegistReq(session, packet)
	} else if(opCode === GameOPCode.CUseInstantItemReq) {
		itemService.handleCUseInstantItemReq(session, packet)
	} else if(opCode === GameOPCode.CUseInstantItemRemoveEffectReq) {
		itemService.handleCUseInstantItemRemoveEffectReq(session, packet)
	} else if(opCode === GameOPCode.CPromotionRouletteMachineStartReq) {
		itemService.handleCPromotionRouletteMachineStartReq(session, packet)
	} else if(opCode === GameOPCode.CRoomMakeReq2) {
		roomService.handleCRoomMakeReq2(session, packet)
	} else if(opCode === GameOPCode.CAlchemyDecompositionReq) {
		itemService.handleCAlchemyDecompositionReq(session, packet)
	} else if(opCode === GameOPCode.CDailyMissionInitReq) {
		missionService.handleCDailyMissionInitReq(session, packet)
	} else if(opCode === GameOPCode.CAchieveMissionReq) {
		missionService.handleCAchieveMissionReq(session, packet)
	} else if(opCode === GameOPCode.CAchieveMissionRewardReq) {
		missionService.handleCAchieveMissionRewardReq(session, packet)
	} else if(opCode === GameOPCode.CClubNoticePointRefreshReq) {
		club2Service.handleCClubNoticePointRefreshReq(session, packet)
	} else if(opCode === GameOPCode.CClubNoticeRecordRefreshReq) {
		club2Service.handleCClubNoticeRecordRefreshReq(session, packet)
	} else if(opCode === GameOPCode.CClubSearchRoomReq) {
		club2Service.handleCClubSearchRoomReq(session, packet)
	} else if(opCode === GameOPCode.CClubOtherClubinfoReq) {
		club2Service.handleCClubOtherClubinfoReq(session, packet)
	} else if(opCode === GameOPCode.CCheckHashKeyValueReq) {
		securityService.handleCCheckHashKeyValueReq(session, packet)
	} else if(opCode === GameOPCode.CRoomEnterPlayerReq) {
		roomService.handleCRoomEnterPlayerReq(session, packet)
	} else if(opCode === GameOPCode.CRoomLeaveRequestReq) {
		roomService.handleCRoomLeaveRequestReq(session, packet)
	} else if(opCode === GameOPCode.CRoomTeamChangeReq) {
		roomService.handleCRoomTeamChangeReq(session, packet)
	} else if(opCode === GameOPCode.CRoomAutoMixingTeamReq) {
		roomService.handleCRoomAutoMixingTeamReq(session, packet)
	} else if(opCode === GameOPCode.CGameEventMessageReq) {
		roomService.handleCGameEventMessageReq(session, packet)
	} else if(opCode === GameOPCode.CRoomChangeRuleNotifyReq) {
		roomService.handleCRoomChangeRuleNotifyReq(session, packet)
	} else if(opCode === GameOPCode.CScoreMissionScoreReq) {
		missionService.handleCScoreMissionScoreReq(session, packet)
	} else if(opCode === GameOPCode.CScoreKillReq) {
		scoreService.handleCScoreKillReq(session, packet)
	} else if(opCode === GameOPCode.CScoreKillAssistReq) {
		scoreService.handleCScoreKillAssistReq(session, packet)
	} else if(opCode === GameOPCode.CScoreOffenseReq) {
		scoreService.handleCScoreOffenseReq(session, packet)
	} else if(opCode === GameOPCode.CScoreOffenseAssistReq) {
		scoreService.handleCScoreOffenseAssistReq(session, packet)
	} else if(opCode === GameOPCode.CScoreDefenseReq) {
		scoreService.handleCScoreDefenseReq(session, packet)
	} else if(opCode === GameOPCode.CScoreDefenseAssistReq) {
		scoreService.handleCScoreDefenseAssistReq(session, packet)
	} else if(opCode === GameOPCode.CScoreHealAssistReq) {
		scoreService.handleCScoreHealAssistReq(session, packet)
	} else if(opCode === GameOPCode.CScoreGoalReq) {
		scoreService.handleCScoreGoalReq(session, packet)
	} else if(opCode === GameOPCode.CScoreReboundReq) {
		scoreService.handleCScoreReboundReq(session, packet)
	} else if(opCode === GameOPCode.CScoreSuicideReq) {
		scoreService.handleCScoreSuicideReq(session, packet)
	} else if(opCode === GameOPCode.CScoreTeamKillReq) {
		scoreService.handleCScoreTeamKillReq(session, packet)
	} else if(opCode === GameOPCode.CRoomPlayModeChangeReq) {
		roomService.handleCRoomPlayModeChangeReq(session, packet)
	} else if(opCode === GameOPCode.CArcadeBeginRoundReq) {
		roomService.handleCArcadeBeginRoundReq(session, packet)
	} else if(opCode === GameOPCode.CArcadeStageClearReq) {
		roomService.handleCArcadeStageClearReq(session, packet)
	} else if(opCode === GameOPCode.CArcadeStageFailedReq) {
		roomService.handleCArcadeStageFailedReq(session, packet)
	} else if(opCode === GameOPCode.CArcadeStageSelectReq) {
		roomService.handleCArcadeStageSelectReq(session, packet)
	} else if(opCode === GameOPCode.CMoneyUseCoinReq) {
		roomService.handleCMoneyUseCoinReq(session, packet)
	} else if(opCode === GameOPCode.CLogBeginResponseReq) {
		devService.handleCLogBeginResponseReq(session, packet)
	} else if(opCode === GameOPCode.CGameKickOutRequestReq) {
		roomService.handleCGameKickOutRequestReq(session, packet)
	} else if(opCode === GameOPCode.CGameKickOutVoteResultReq) {
		roomService.handleCGameKickOutVoteResultReq(session, packet)
	} else if(opCode === GameOPCode.CGameLoadingSuccessReq) {
		roomService.handleCGameLoadingSuccessReq(session, packet)
	} else if(opCode === GameOPCode.CRoomChoiceMasterChangeReq) {
		roomService.handleCRoomChoiceMasterChangeReq(session, packet)
	} else if(opCode === GameOPCode.CInGameItemDropReq) {
		roomService.handleCInGameItemDropReq(session, packet)
	} else if(opCode === GameOPCode.CInGameItemGetReq) {
		roomService.handleCInGameItemGetReq(session, packet)
	} else if(opCode === GameOPCode.CInGamePlayerResponseReq) {
		roomService.handleCInGamePlayerResponseReq(session, packet)
	} else if(opCode === GameOPCode.CChallengeResultReq) {
		roomService.handleCChallengeResultReq(session, packet)
	} else if(opCode === GameOPCode.CRoomReadyRoundReq2) {
		roomService.handleCRoomReadyRoundReq2(session, packet)
	} else if(opCode === GameOPCode.CRoomBeginRoundReq2) {
		roomService.handleCRoomBeginRoundReq2(session, packet)
	} else if(opCode === GameOPCode.CGameAvatarChangeReq) {
		roomService.handleCGameAvatarChangeReq(session, packet)
	} else if(opCode === GameOPCode.CRoomIntrudeRoundReq2) {
		roomService.handleCRoomIntrudeRoundReq2(session, packet)
	} else if(opCode === GameOPCode.CRoomChangeRuleNotifyReq2) {
		roomService.handleCRoomChangeRuleNotifyReq2(session, packet)
	} else if(opCode === GameOPCode.CArenaSetGameOptionReq) {
		roomService.handleCArenaSetGameOptionReq(session, packet)
	} else if(opCode === GameOPCode.CClubCreateReq) {
		clubService.handleCClubCreateReq(session, packet)
	} else if(opCode === GameOPCode.CClubCloseReq) {
		clubService.handleCClubCloseReq(session, packet)
	} else if(opCode === GameOPCode.CClubUnjoinReq) {
		clubService.handleCClubUnjoinReq(session, packet)
	} else if(opCode === GameOPCode.CClubNameCheckReq) {
		clubService.handleCClubNameCheckReq(session, packet)
	} else if(opCode === GameOPCode.CClubRestoreReq) {
		clubService.handleCClubRestoreReq(session, packet)
	} else if(opCode === GameOPCode.CClubAdminInviteReq) {
		clubService.handleCClubAdminInviteReq(session, packet)
	} else if(opCode === GameOPCode.CClubAdminJoinCommandReq) {
		clubService.handleCClubAdminJoinCommandReq(session, packet)
	} else if(opCode === GameOPCode.CClubAdminGradeChangeReq) {
		clubService.handleCClubAdminGradeChangeReq(session, packet)
	} else if(opCode === GameOPCode.CClubAdminNoticeChangeReq) {
		clubService.handleCClubAdminNoticeChangeReq(session, packet)
	} else if(opCode === GameOPCode.CClubAdminInfoModifyReq) {
		clubService.handleCClubAdminInfoModifyReq(session, packet)
	} else if(opCode === GameOPCode.CClubAdminSubMasterReq) {
		clubService.handleCClubAdminSubMasterReq(session, packet)
	} else if(opCode === GameOPCode.CClubAdminMasterChangeReq) {
		clubService.handleCClubAdminMasterChangeReq(session, packet)
	} else if(opCode === GameOPCode.CClubAdminJoinConditionModifyReq) {
		clubService.handleCClubAdminJoinConditionModifyReq(session, packet)
	} else if(opCode === GameOPCode.CClubAdminBoardModifyReq) {
		clubService.handleCClubAdminBoardModifyReq(session, packet)
	} else if(opCode === GameOPCode.CClubSearchReq) {
		clubService.handleCClubSearchReq(session, packet)
	} else if(opCode === GameOPCode.CClubInfoReq) {
		clubService.handleCClubInfoReq(session, packet)
	} else if(opCode === GameOPCode.CClubJoinWaiterInfoReq) {
		clubService.handleCClubJoinWaiterInfoReq(session, packet)
	} else if(opCode === GameOPCode.CClubNewJoinMemberInfoReq) {
		clubService.handleCClubNewJoinMemberInfoReq(session, packet)
	} else if(opCode === GameOPCode.CClubJoinConditionInfoReq) {
		clubService.handleCClubJoinConditionInfoReq(session, packet)
	} else if(opCode === GameOPCode.CClubUnjoinerListReq) {
		clubService.handleCClubUnjoinerListReq(session, packet)
	} else if(opCode === GameOPCode.CClubStuffListReq) {
		clubService.handleCClubStuffListReq(session, packet)
	} else if(opCode === GameOPCode.CClubNewsInfoReq) {
		clubService.handleCClubNewsInfoReq(session, packet)
	} else if(opCode === GameOPCode.CClubBoardWriteReq) {
		clubService.handleCClubBoardWriteReq(session, packet)
	} else if(opCode === GameOPCode.CClubBoardReadReq) {
		clubService.handleCClubBoardReadReq(session, packet)
	} else if(opCode === GameOPCode.CClubBoardModifyReq) {
		clubService.handleCClubBoardModifyReq(session, packet)
	} else if(opCode === GameOPCode.CClubBoardDeleteReq) {
		clubService.handleCClubBoardDeleteReq(session, packet)
	} else if(opCode === GameOPCode.CClubBoardDeleteAllReq) {
		clubService.handleCClubBoardDeleteAllReq(session, packet)
	} else if(opCode === GameOPCode.CClubBoardSearchNickReq) {
		clubService.handleCClubBoardSearchNickReq(session, packet)
	} else if(opCode === GameOPCode.CClubBoardReadOtherClubReq) {
		clubService.handleCClubBoardReadOtherClubReq(session, packet)
	} else if(opCode === GameOPCode.CClubCreateReq2) {
		club2Service.handleCClubCreateReq2(session, packet)
	} else if(opCode === GameOPCode.CClubUnjoinReq2) {
		club2Service.handleCClubUnjoinReq2(session, packet)
	} else if(opCode === GameOPCode.CClubClubInfoReq2) {
		club2Service.handleCClubClubInfoReq2(session, packet)
	} else if(opCode === GameOPCode.CClubSearchReq2) {
		club2Service.handleCClubSearchReq2(session, packet)
	} else if(opCode === GameOPCode.CClubRankListReq) {
		club2Service.handleCClubRankListReq(session, packet)
	} else {
		log.warning('Unknown Packet Received [' + GameOPCode.getKeyByValue(opCode) + ']')
		log.debug(Packet.dump(packet.readRemaining()))
	}
})

server.on('error', function(session, e) {
	gameService.closed(session)
	if(e.code == 'ECONNRESET') {
		log.debug('Connection closed')
	} else {
		log.error('Unhandled session error occured:')
		log.error(e)
	}
})

server.on('end', function(session) {
	gameService.closed(session)
	log.debug('Connection closed')
})

server.listen(ConfigManager.port, ConfigManager.ip)

log.info('Server started on ' + ConfigManager.ip + ':' + ConfigManager.port)