var Logger = require('../../../Utils/Logger')
var log = new Logger('Client', true)

//var Logger = require('../../../Utils/Logger')
//var log = new Logger('OPCode', true)

function generateOpCodes(start, opCodes) {
	if(typeof start !== 'number') {
		throw Error('Start Value is not a number!')
	}

	for (var i = 0; i < opCodes.length; i++) {
		// Check if this OpCode exists already
		if(opCode[opCodes[i]] !== undefined) {
			throw Error('OPCode "' + opCodes[i] + '" already exists.')
		}
		//log.debug(opCodes[i] + ' = ' + start + ',')
		// TODO: Check if this number is in use already
		opCode[opCodes[i]] = start
		start++
	}
}

var opCode = { }

// C2S Lobby | 125
// C2S GameRule | 69
// C2S Club | 48
// S2C Lobby | 205
// S2C GameRule | 106
// S2C Club | 47

// Until 12.09.2016 | 1227
/*
var Start = {
	C2SLobby: 3001,
	C2SGameRule: 2,
	C2SClub: 5001,

	S2CLobby: 2001,
	S2CGameRule: 1001,
	S2CClub: 4001
}
*/

// Until 15.11.2016 | 1233 ?
/*
var Start = {
	C2SLobby: 2001,
	C2SGameRule: 1001,
	C2SClub: 5001,

	S2CLobby: 3001,
	S2CGameRule: 2,
	S2CClub: 4001
}
*/

// Until 22.11.2016 | 1235 ?
/*
var Start = {
	C2SLobby: 1001,
	C2SGameRule: 3001,
	C2SClub: 5001,

	S2CLobby: 2,
	S2CGameRule: 2001,
	S2CClub: 4001
}
*/

// Until 21.01.2019
/*
var Start = {
	C2SLobby: 2,
	C2SGameRule: 2001,
	C2SClub: 4001,

	S2CLobby: 1001,
	S2CGameRule: 3001,
	S2CClub: 5001
}
*/

var Start = {
	C2SLobby: 5001,
	C2SGameRule: 4001,
	C2SClub: 6001,

	S2CLobby: 8001,
	S2CGameRule: 7001,
	S2CClub: 5001
}

// C2S Lobby | 129
generateOpCodes(Start.C2SLobby, [
	'CLoginRequestReq',
	'CCharacterCreateReq',
	'CCharacterSelectReq',
	'CCharacterDeleteReq',
	'CRoomQuickStartReq', // TODO: Needs to be implemented
	'CRoomMakeReq',
	'CNickCheckReq',
	'CItemUseItemReq',
	'CRoomLeaveReq',
	'CTimeSyncReq',
	'CAdminShowWindowReq',
	'C3012Req', // CClubInfoReq
	'CChannelEnterReq',
	'CChannelLeaveReq',
	'CChannelInfoReq',
	'CRoomEnterReq',
	'CPlayerInfoReq',
	'CItemBuyItemReq',
	'CItemRepairItemReq',
	'CItemRefundItemReq',
	'CAdminActionReq',
	'CCharacterActiveEquipPresetReq', // TODO: Needs to be implemented
	'CLicenseGainReq', // TODO: Needs to be implemented
	'CClubNoticeChangeReq', // TODO: Needs to be implemented
	'CClubInfoByIDReq',
	'CClubInfoByNameReq',
	'CItemInventoryInfoReq', // TODO: Needs to be implemented
	'CTaskNotifyReq', // TODO: Needs to be implemented
	'CTaskRequestReq', // TODO: Needs to be implemented
	'CLicenseExerciseReq', // TODO: Needs to be implemented
	'CItemUseCoinReq', // TODO: Needs to be implemented
	'CItemUseEsperChipReq', // TODO: Needs to be implemented
	'CPlayerBadUserReq', // TODO: Needs to be implemented
	'C3034Req', // CClubJoinReq // TODO: Needs to be implemented
	'C3035Req', // CClubUnJoinReq // TODO: Needs to be implemented
	'CNewShopUpdateCheckReq',
	'CItemUseChangeNickReq',
	'CItemUseRecordResetReq',
	'CItemUseCoinFillingReq', // TODO: Needs to be implemented
	'CPlayerFindInfoReq',
	'CItemDiscardItemReq',
	'CItemUseCapsuleReq',
	'CClubAddressReq', // TODO: Needs to be implemented
	'CClubHistoryReq', // TODO: Needs to be implemented
	'CItemUseChangeNickCancelReq',
	'CTutorialCompletedReq', // TODO: Needs to be implemented
	'CCharacterFirstCreateReq',
	'CShoppingBasketActionReq',
	'CShoppingBasketDeleteReq',
	'CRandomShopUpdateCheckReq',
	'CRandomShopRollingStartReq',
	'CRoomInfoRequestReq',
	'CNoteGiftItemReq',
	'CNoteImportuneItemReq', // TODO: Needs to be implemented
	'CNoteGiftItemGainReq', // TODO: Needs to be implemented
	'CRoomQuickJoinReq',
	'CMoneyRefreshCashInfoReq', // TODO: Needs to be implemented
	'CCardGambleReq', // TODO: Needs to be implemented
	'CPromotionAttendanceGiftItemReq', // TODO: Needs to be implemented
	'CPromotionCoinEventUseCoinReq', // TODO: Needs to be implemented
	'CItemEnchantReq',
	'CPromotionCardShuffleReq', // TODO: Needs to be implemented
	'CBillingCashInfoReq', // TODO: Needs to be implemented
	'CXTrapDetourReq', // TODO: Needs to be implemented
	'CPromotionCouponEventReq', // TODO: Needs to be implemented
	'CCollectBookUpdateCheckReq',
	'CCollectBookInventoryInfoReq', // TODO: Needs to be implemented
	'CCollectBookItemRegistReq',
	'CCollectBookUseRewardReq', // TODO: Needs to be implemented
	'CUseInstantItemReq',
	'CUseInstantItemRemoveEffectReq',
	'CPromotionRouletteMachineStartReq',
	'CGameGuardCSAuthReq', // TODO: Needs to be implemented
	'CGameGuardHackReportReq', // TODO: Needs to be implemented
	'CPromotionXMasCardUseReq', // TODO: Needs to be implemented
	'CPromotionNewYearCardUseReq', // TODO: Needs to be implemented
	'CHackShieldMakeResponseReq', // TODO: Needs to be implemented
	'CRoomMakeReq2',
	'CAlchemyCombinationReq', // TODO: Needs to be implemented
	'CAlchemyDecompositionReq',
	'CPromotionItemPaymentReq', // TODO: Needs to be implemented
	'CItemUseFillExpReq', // TODO: Needs to be implemented
	'CDailyMissionRewardReq',
	'CDailyMissionInitReq',
	'CDailyMissionNextStepReq', // TODO: Needs to be implemented
	'CAchieveMissionReq',
	'CAchieveMissionRewardReq',
	'CBtcClearReq', // TODO: Needs to be implemented
	'CNewItemEnchantReq',
	'CItemUseJewelItemReq',
	'CXignCodeAliveReq',
	'CEsperEnchantReq', // TODO: Needs to be implemented
	'CMatchStartReq', // TODO: Needs to be implemented
	'CMatchStopReq', // TODO: Needs to be implemented
	'CMatchListReq', // TODO: Needs to be implemented
	'CMatchInviteReq', // TODO: Needs to be implemented
	'CBattleInvitesReceivedResult', // TODO: Needs to be implemented
	'CReMatchReq', // TODO: Needs to be implemented
	'CMatchVoteBegin', // TODO: Needs to be implemented
	'CMatchClubMarkReq', // TODO: Needs to be implemented
	'CMatchPointReq', // TODO: Needs to be implemented
	'CMatchRoomQuitReq', // TODO: Needs to be implemented
	'CClubNoticePointRefreshReq',
	'CClubNoticeRecordRefreshReq',
	'CClubSearchRoomReq',
	'CClubStadiumEditMapDataReq', // TODO: Needs to be implemented
	'CClubStadiumEditBlastinfoEditReq', // TODO: Needs to be implemented
	'CClubStadiumInfoReq', // TODO: Needs to be implemented
	'CClubStadiumSelectReq', // TODO: Needs to be implemented
	'CClubOtherClubinfoReq', // TODO: Needs to be implemented
	'CClubFASystemFAListReq',
	'CClubFASystemFARegisterReq', // TODO: Needs to be implemented
	'CClubFASystemFARecordReq', // TODO: Needs to be implemented
	'CClubFASystemFAScoutReq', // TODO: Needs to be implemented
	'CClubFASystemFAScoutListReq', // TODO: Needs to be implemented
	'CClubFASystemFAScoutAcceptReq', // TODO: Needs to be implemented
	'CUnionMainUiReq', // TODO: Needs to be implemented
	'CUnionSearchRoomReq', // TODO: Needs to be implemented
	'CEsperEnchantPercentUpReq', // TODO: Needs to be implemented
	'CUseEnchantChipReq',
	'CMoveEnchantChipReq',
	'CCheckHashKeyValueReq',
	'CNewCheckDailyAttendanceReq',
	'CXMas2016DailyCheckReq',
	'CDummyReq', // S4 League Devs retarded?
	'CEACC2SDataReq', // 127
	'CCheckProvideEventItemReq', // 128
	'CProvideEventItemReq' // 129 // How to find: Search for S2C Lobby (1001) and scroll up
])

// C2S GameRule | 68
generateOpCodes(Start.C2SGameRule, [
	'CRoomEnterPlayerReq',
	'CRoomLeaveRequestReq',
	'CRoomTeamChangeReq',
	'CRoomAutoAssingTeamReq', // TODO: Unused and unchecked from me
	'CRoomAutoMixingTeamReq',
	'CRoomChoiceTeamChangeReq', // TODO: Unused and unchecked from me
	'CGameEventMessageReq',
	'CRoomReadyRoundReq', // TODO: Unused and unchecked from me
	'CRoomBeginRoundReq', // TODO: Unused and unchecked from me
	'CGameAvatarDurabilityDecreaseReq', // TODO: Unused and unchecked from me
	'CGameAvatarChangeReq', // TODO: Unused and unchecked from me
	'CRoomChangeRuleNotifyReq',
	'CScoreMissionScoreReq',
	'CScoreKillReq',
	'CScoreKillAssistReq',
	'CScoreOffenseReq',
	'CScoreOffenseAssistReq',
	'CScoreDefenseReq',
	'CScoreDefenseAssistReq',
	'CScoreHealAssistReq',
	'CScoreGoalReq',
	'CScoreReboundReq',
	'CScoreSuicideReq',
	'CScoreTeamKillReq',
	'CRoomItemChangeReq', // TODO: Unused and unchecked from me
	'CRoomPlayModeChangeReq',
	'CArcadeScoreSyncReq', // TODO: Unused and unchecked from me
	'CArcadeBeginRoundReq',
	'CArcadeStageClearReq',
	'CArcadeStageFailedReq',
	'CArcadeStageInfoReq', // TODO: Unused and unchecked from me
	'CArcadeEnablePlayTimeReq', // TODO: Unused and unchecked from me
	'CArcardRespawnReq', // TODO: Unused and unchecked from me
	'CArcadeStageReadyReq', // TODO: Unused and unchecked from me
	'CArcadeStageSelectReq',
	'CSlaughterAttackPointReq', // TODO: Unused and unchecked from me
	'CSlaughterHealPointReq', // TODO: Unused and unchecked from me
	'CArcadeLoadingSuccessReq', // TODO: Unused and unchecked from me
	'CMoneyUseCoinReq',
	'CLogBeginResponseReq',
	'CLogWeaponFireReq', // TODO: Unused and unchecked from me
	'CGameKickOutRequestReq',
	'CGameKickOutVoteResultReq',
	'CRoomIntrudeRoundReq', // TODO: Unused and unchecked from me
	'CGameLoadingSuccessReq',
	'CSeizePositionCaptureReq', // TODO: Unused and unchecked from me
	'CSeizeBuffItemGainReq', // TODO: Unused and unchecked from me
	'CRoomChoiceMasterChangeReq',
	'CGameEquipCheckAck', // TODO: Unused and unchecked from me
	'CPromotionCointEventGetCoinReq', // TODO: Unused and unchecked from me
	'CInGameItemDropReq',
	'CInGameItemGetReq',
	'CInGamePlayerResponseReq',
	'CChallengeRankinglistReq', // TODO: Unused and unchecked from me
	'CChallengeResultReq',
	'CChallengeReStartReq', // TODO: Unused and unchecked from me
	'CPromotionCouponEventIngameGetReq', // TODO: Unused and unchecked from me
	'CRecordBurningDataReq', // TODO: Unused and unchecked from me
	'CRoomReadyRoundReq2',
	'CRoomBeginRoundReq2',
	'CRoomIntrudeRoundReq2',
	'CUseBurningBuffReq', // TODO: Unused and unchecked from me
	'CRoomChangeRuleNotifyReq2',
	'CRoomRandomRoomBeginActionReq', // TODO: Unused and unchecked from me
	'CScoreAIKillReq', // TODO: Unused and unchecked from me
	'CArenaSetGameOptionReq',
	'CArenaSpecialPointReq', // TODO: Unused and unchecked from me
	'CArenaDrawHealthPointAck' // 2068 // TODO: Unused and unchecked from me
])

// C2S Club | 48
generateOpCodes(Start.C2SClub, [
	'CClubCreateReq',
    'CClubCloseReq',
	'CClubJoinReq',
	'CClubUnjoinReq',
	'CClubNameCheckReq',
	'CClubRestoreReq',
	'CClubAdminInviteReq',
	'CClubAdminJoinCommandReq',
	'CClubAdminGradeChangeReq',
	'CClubAdminNoticeChangeReq',
	'CClubAdminInfoModifyReq',
	'CClubAdminSubMasterReq',
	'CClubAdminSubMasterCancelReq', // TODO: Unused and unchecked from me
	'CClubAdminMasterChangeReq',
	'CClubAdminJoinConditionModifyReq',
	'CClubAdminBoardModifyReq',
	'CClubSearchReq',
	'CClubInfoReq',
	'CClubJoinWaiterInfoReq',
	'CClubNewJoinMemberInfoReq',
	'CClubJoinConditionInfoReq',
	'CClubUnjoinerListReq',
	'CClubUnjoinSettingMemberListReq', // TODO: Unused and unchecked from me
	'CClubGradeCountReq', // TODO: Unused and unchecked from me
	'CClubStuffListReq',
	'CClubNewsInfoReq',
	'CClubBoardWriteReq',
	'CClubBoardReadReq',
	'CClubBoardModifyReq',
	'CClubBoardDeleteReq',
	'CClubBoardDeleteAllReq',
	'CClubBoardSearchNickReq',
	'CClubBoardReadOtherClubReq',
	'CClubBoardReadMineReq', // TODO: Unused and unchecked from me
	'CClubCreateReq2',
	'CClubCloseReq2', // TODO: Unused and unchecked from me
	'CClubJoinReq2', // TODO: Unused and unchecked from me
	'CClubUnjoinReq2',
	'CClubRestoreReq2', // TODO: Unused and unchecked from me
	'CClubClubInfoReq2',
	'CClubSearchReq2',
	'CClubEditUrlReq', // TODO: Unused and unchecked from me
	'CClubEditIntroduceReq', // TODO: Unused and unchecked from me
	'CClubStuffListReq2', // TODO: Unused and unchecked from me
	'CClubRankListReq', // TODO: Unused and unchecked from me
	'CClubAdminMasterChangeRequestReq', // TODO: Unused and unchecked from me
	'CClubAdminMasterChangeResponseReq', // TODO: Unused and unchecked from me
	'CClubMyInfoReq' // 4048 // TODO: Unused and unchecked from me
])

// S2C Lobby | 205
generateOpCodes(Start.S2CLobby, [
	'SLoginRequestAck',
	'SPlayerAccountInfoAck',
	'SCharacterCurrentInfoAck',
	'SCharacterCurrentItemInfoAck',
	'SItemInventoryInfoAck',
	'SCharacterDeleteAck',
	'SCharacterSelectAck',
	'SSuccessCreateCharacterAck',
	'SServerResultAck',
	'SNickCheckAck',
	'SItemUseItemAck',
	'SItemUpdateInventoryAck',
	'SRoomCurrentCharacterSlotAck',
	'SRoomEnterPlayerInfoAck',
	'SRoomEnterClubInfoAck',
	'SRoomPlayerInfoListForEnterPlayerAck',
	'SRoomClubInfoListForEnterPlayerAck',
	'SRoomEnterRoomInfoAck',
	'SRoomLeavePlayerInfoAck',
	'STimeSyncAck',
	'SRoomChangeRoomInfoAck', // TODO: Unused and unchecked from me
	'SNewShopUpdateEndAck', // TODO: Unused and unchecked from me
	'SChannelListInfoAck',
	'SRoomDeployAck', // TODO: Unused and unchecked from me
	'SRoomDisposeAck',
	'SPlayerInfoAck',
	'SItemBuyItemAck',
	'SItemRepairItemAck',
	'SItemDurabilityItemAck',
	'SItemRefundItemAck',
	'SMoneyRefreshCashInfoAck',
	'SAdminActionAck',
	'SAdminShowWindowAck',
	'SNoticeAdminMessageAck',
	'SCharacterCurrentSlotInfoAck',
	'SItemRefreshInvalidEquipItemAck', // TODO: Unused and unchecked from me
	'SItemClearInvalidEquipItemAck',
	'SCharacterAvatarEquipPresetAck',
	'SLicenseMyInfoAck', // TODO: Unused and unchecked from me
	'S2040Ack', // SClubInfoAck // TODO: Unused and unchecked from me
	'SClubHistoryAck', // TODO: Unused and unchecked from me
	'SItemEquipBoostItemInfoAck',
	'SClubFindInfoAck', // TODO: Unused and unchecked from me
	'STaskInfoAck', // TODO: Unused and unchecked from me
	'STaskUpdateAck', // TODO: Unused and unchecked from me
	'STaskRequestAck', // TODO: Unused and unchecked from me
	'STaskRemoveAck', // TODO: Unused and unchecked from me
	'SMoneyRefreshCoinInfoAck',
	'SItemUseEsperChipItemAck', // TODO: Unused and unchecked from me
	'SRequitalArcadeRewardAck', // TODO: Unused and unchecked from me
	'SPlayerArcadeMapInfoAck',
	'SPlayerArcadeStageInfoAck',
	'SMoneyRefreshPenInfoAck',
	'SItemUseCapsuleAck',
	'SAdminHGWKickAck', // TODO: Unused and unchecked from me
	'S2056Ack', // SClubJoinAck // TODO: Unused and unchecked from me
	'S2057Ack', // SClubUnJoinAck // TODO: Unused and unchecked from me
	'SNewShopUpdateCheckAck',
	'SNewShopUpdateInfoAck', // TODO: Unused and unchecked from me
	'SItemUseChangeNickAck',
	'SItemUseRecordResetAck',
	'SItemUseCoinFillingAck', // TODO: Unused and unchecked from me
	'SPlayerFindInfoAck', // TODO: Unused and unchecked from me
	'SItemDiscardItemAck',
	'SItemInventoryDeleteAck',
	'SClubAddressAck', // TODO: Unused and unchecked from me
	'SItemUseChangeNickCancelAck',
	'SRequitalEventItemRewardAck', // TODO: Unused and unchecked from me
	'SRoomListInfoAck', // TODO: Unused and unchecked from me
	'SNickDefaultAck', // TODO: Unused and unchecked from me
	'SRequitalGiveItemResultAck', // TODO: Unused and unchecked from me
	'SShoppingBasketActionAck',
	'SShoppingBasketListInfoAck',
	'SRandomShopUpdateRequestAck', // TODO: Unused and unchecked from me
	'SRandomShopUpdateCheckAck',
	'SRandomShopUpdateInfoAck',
	'SRandomShopRollingStartAck',
	'SRoomInfoRequestAck', // TODO: Unused and unchecked from me
	'SNoteGiftItemAck', // TODO: Unused and unchecked from me
	'SNoteImportuneItemAck', // TODO: Unused and unchecked from me
	'SNoteGiftItemGainAck', // TODO: Unused and unchecked from me
	'SRoomQuickJoinAck',
	'SJorbiWebSessionRedirectAck',
	'SCardGambleAck', // TODO: Unused and unchecked from me
	'SNoticeItemGainAck',
	'SPromotionPunkinNoticeAck', // TODO: Unused and unchecked from me
	'SPromotionPunkinRankersAck', // TODO: Unused and unchecked from me
	'SRequitalLevelAck', // TODO: Unused and unchecked from me
	'SPromotionAttendanceInfoAck', // TODO: Unused and unchecked from me
	'SPromotionAttendanceGiftItemAck', // TODO: Unused and unchecked from me
	'SPromotionCoinEventAck', // TODO: Unused and unchecked from me
	'SPromotionCoinEventDropCoinAck', // TODO: Unused and unchecked from me
	'SEnchantEnchantItemAck',
	'SEnchantRefreshEnchantGaugeAck', // TODO: Unused and unchecked from me
	'SNoticeEnchantAck', // TODO: Unused and unchecked from me
	'SPromotionCardShuffleAck', // TODO: Unused and unchecked from me
	'SItemClearEsperChipAck',
	'SChallengeMyInfoAck',
	'SKRShutDownAck', // TODO: Unused and unchecked from me
	'SRequitalChallengeAck', // TODO: Unused and unchecked from me
	'SMapOpenInfosAck',
	'SPromotionCouponEventAck', // TODO: Unused and unchecked from me
	'STutorialCompletedAck', // TODO: Unused and unchecked from me
	'SExpRefreshInfoAck',
	'SPromotionActiveAck', // TODO: Unused and unchecked from me
	'SCollectBookUpdateRequestAck', // TODO: Unused and unchecked from me
	'SCollectBookUpdateCheckAck',
	'SCollectBookUpdateInfoAck', // TODO: Unused and unchecked from me
	'SCollectBookInventoryInfoAck', // TODO: Unused and unchecked from me
	'SUseInstantItemAck',
	'SCollectBookInvenEffectInfoAck', // TODO: Unused and unchecked from me
	'SCollectBookItemRegistAck',
	'SCollectBookEffectRegistAck', // TODO: Unused and unchecked from me
	'SCollectBookExpireBookRewardAck', // TODO: Unused and unchecked from me
	'SCollectBookReuseBookRewardAck', // TODO: Unused and unchecked from me
	'SCollectBookBookUseRewardAck', // TODO: Unused and unchecked from me
	'SCollectBookBookUnRegistAck', // TODO: Unused and unchecked from me
	'SRoomEnterPlayerInfoForCollectBookAck',
	'SRoomPlayerInfoListForEnterPlayerForCollectBookAck',
	'SPromotionUsingCashRewardItemAck', // TODO: Unused and unchecked from me
	'SEnchantRefreshEnchantGaugeForInstantAck',
	'SUseInstantItemRemoveEffectAck',
	'SPromotionDailyGiftItemAck', // TODO: Unused and unchecked from me
	'SPromotionRouletteMachineStartAck', // TODO: Unused and unchecked from me
	'SGameGuardCSAuthAck', // TODO: Unused and unchecked from me
	'SPremiumItemInfoListAck',
	'SSecondaryRewardItemAck', // TODO: Unused and unchecked from me
	'SPromotionXMasCardUseAck', // TODO: Unused and unchecked from me
	'SPromotionNewYearCardUseAck', // TODO: Unused and unchecked from me
	'SHackShieldMakeRequest', // TODO: Unused and unchecked from me
	'SRoomChangeRoomInfoAck2',
	'SRoomEnterRoomInfoAck2',
	'SMakeEventItemAck', // TODO: Unused and unchecked from me
	'SRoomListInfoAck2',
	'SRoomDeployAck2',
	'SRoomInfoRequestAck2',
	'SAlchemyCombinationAck', // TODO: Unused and unchecked from me
	'SAlchemyDecompositionAck', // TODO: Unused and unchecked from me
	'SPromotionPlayTimeSync', // TODO: Unused and unchecked from me
	'SPromotionItemPaymentAck', // TODO: Unused and unchecked from me
	'SItemUseFillExpAck', // TODO: Unused and unchecked from me
	'SRefreshAeriaTokenInfoAck',
	'SDailyMissionNotice',
	'SDailyMissionRewardAck', // TODO: Unused and unchecked from me
	'SAchieveMissionAck',
	'SAchieveMissionRewardAck', // TODO: Unused and unchecked from me
	'SBtcClearAck', // TODO: Unused and unchecked from me
	'SBtcSyncNotice',
	'SNewEnchantEnchantItemAck',
	'SItemUseJewelItemAck',
	'SXignCodeAliveAck',
	'SEsperEnchantAck',
	'SMatchStartAck', // TODO: Needs to be implemented
	'SMatchStopAck', // TODO: Needs to be implemented
	'SGoToMatchRoom', // TODO: Needs to be implemented
	'SMatchInviteAck', // TODO: Needs to be implemented
	'SMatchListAck', // TODO: Needs to be implemented
	'SBattleInvitesReceivedAck', // TODO: Needs to be implemented
	'SReMatchAck', // TODO: Needs to be implemented
	'SMatchClanInfo', // TODO: Needs to be implemented
	'SMakeNewMatchRoom', // TODO: Needs to be implemented
	'SMatchVoteBeginAck', // TODO: Needs to be implemented
	'SMatchClubMarkAck', // TODO: Needs to be implemented
	'SClubMatchPointAck', // TODO: Needs to be implemented
	'SMatchPointAck', // TODO: Needs to be implemented
	'SClubNoticePointRefreshAck', // TODO: Needs to be implemented
	'SClubNoticeRecordRefreshAck', // TODO: Needs to be implemented
	'SClubSearchRoomAck', // TODO: Needs to be implemented
	'SClubStadiumEditMapDataAck', // TODO: Needs to be implemented
	'SNukingUserAck', // TODO: Needs to be implemented
	'SClubStadiumEditBlastinfoEditAck', // TODO: Needs to be implemented
	'SClubStadiumInfoAck', // TODO: Needs to be implemented
	'SClubStadiumSelectAck', // TODO: Needs to be implemented
	'SClubOtherClubinfoAck', // TODO: Needs to be implemented
	'SClubStadiumHomeDataAck', // TODO: Needs to be implemented
	'SClubEndGameLeaderPoint', // TODO: Needs to be implemented
	'SClubEndGameClubPoint', // TODO: Needs to be implemented
	'SClubFASystemChangeStateAck', // TODO: Needs to be implemented
	'SClubFASystemFAListAck',
	'SClubFASystemFARegisterAck', // TODO: Needs to be implemented
	'SClubFASystemFARegisterConfirmAck',
	'SClubFASystemFARecordAck', // TODO: Needs to be implemented
	'SClubUnionSystemUserInfo',
	'SClubFASystemFAScoutAck', // TODO: Needs to be implemented
	'SClubFASystemFAScoutListAck', // TODO: Needs to be implemented
	'SClubFASystemFAScoutAcceptAck', // TODO: Needs to be implemented
	'SUnionEndGamePoint', // TODO: Needs to be implemented
	'SUnionMainUi', // TODO: Needs to be implemented
	'SUnionSeasonEnd', // TODO: Needs to be implemented
	'SUnionSearchRoomAck', // TODO: Needs to be implemented
	'SEspherChipLv5',
	'SMoneyRain', // TODO: Needs to be implemented
	'SMoveEnchantChipAck', // TODO: Needs to be implemented
	'SEnchantChipErrorAck', // TODO: Needs to be implemented
	'SServerkeyAck', // TODO: Needs to be implemented
	'SNewDailyAttendanceAck', // TODO: Needs to be implemented
	'SXMas2016DailyCheckAck', // TODO: Needs to be implemented
	'SDummyAck', // S4 League Devs retarded?
	'SCNPlayTimeInfoAck', // TODO: Needs to be implemented
	'SCNMoneyRefreshCashInfoAck', // TODO: Needs to be implemented
	'SEACS2CDataAck', // TODO: Needs to be implemented
	'SCheckProvideEventItemAck', // TODO: Needs to be implemented
	'SProvideEventItemAck', // TODO: Needs to be implemented
	'SPlayerKickMessageAck',
	'SRoomModeChangeItemAck' // 1205 // TODO: Needs to be implemented
])

// S2C GameRule | 106
generateOpCodes(Start.S2CGameRule, [
	'SRoomEnterPlayerAck', // TODO: Unused and unchecked from me
	'SRoomLeavePlayerAck',
	'SRoomLeaveRequestAck', // TODO: Unused and unchecked from me
	'SRoomChangeTeamAck',
	'SRoomChangeTeamFailAck', // TODO: Unused and unchecked from me
	'SRoomChoiceTeamChangeAck', // TODO: Unused and unchecked from me
	'SRoomChoiceTeamChangeFailAck', // TODO: Unused and unchecked from me
	'SGameEventMessageAck',
	'SGameBriefingInfoAck',
	'SGameChangeStateAck',
	'SGameChangeSubStateAck',
	'SGameDestroyGameRuleAck', // TODO: Unused and unchecked from me
	'SRoomChangeMasterAck',
	'SRoomChangeRefereeAck',
	'SSlaughterChangeSlaughterAck',
	'SRoomReadyRoundAck',
	'SRoomBeginRoundAck',
	'SGameAvatarChangeAck', // TODO: Unused and unchecked from me
	'SRoomChangeRuleNotifyAck', // TODO: Unused and unchecked from me
	'SRoomChangeRuleAck',
	'SRoomChangeRuleFailAck', // TODO: Unused and unchecked from me
	'SScoreMissionScoreAck',
	'SScoreKillAck',
	'SScoreKillAssistAck',
	'SScoreOffenseAck',
	'SScoreOffenseAssistAck',
	'SScoreDefenseAck',
	'SScoreDefenseAssistAck',
	'SScoreLeaderKillAck', // TODO: Unused and unchecked from me
	'SScoreHealAssistAck',
	'SScoreGoalAck',
	'SScoreGoalAssistAck', // TODO: Unused and unchecked from me
	'SScoreReboundAck',
	'SScoreSuicideAck',
	'SScoreTeamKillAck',
	'SSlaughterRoundWinAck',
	'SSlaughterSLRoundWinAck', // TODO: Unused and unchecked from me
	'SRoomChangeItemAck', // TODO: Unused and unchecked from me
	'SRoomPlayModeChangeAck',
	'SGameRefreshGameRuleInfoAck',
	'SArcadeScoreSyncAck', // TODO: Unused and unchecked from me
	'SArcadeBeginRoundAck', // TODO: Unused and unchecked from me
	'SArcadeStageBriefingAck', // TODO: Unused and unchecked from me
	'SArcadeEnablePlayTimeAck', // TODO: Unused and unchecked from me
	'SArcadeStageInfoAck', // TODO: Unused and unchecked from me
	'SArcadeRespawnAck', // TODO: Unused and unchecked from me
	'SArcadeDeathPlayerInfoAck', // TODO: Unused and unchecked from me
	'SArcadeStageReadyAck', // TODO: Unused and unchecked from me
	'SArcadeRespawnFailAck', // TODO: Unused and unchecked from me
	'SAdminChangeHPAck',
	'SAdminChangeMPAck',
	'SArcadeChangeStageAck', // TODO: Unused and unchecked from me
	'SArcadeStageSelectAck', // TODO: Unused and unchecked from me
	'SArcadeSavedateInfoAck', // TODO: Unused and unchecked from me
	'SSlaughterAttackPointAck', // TODO: Unused and unchecked from me
	'SSlaughterHealPointAck', // TODO: Unused and unchecked from me
	'SSlaughterChangeBonusTargetAck',
	'SArcadeSucceedLoadingAck', // TODO: Unused and unchecked from me
	'SMoneyUseCoinAck',
	'SGameLuckyShotAck',
	'SFreeAllForChangeTheFirstAck',
	'SLogDevLogStartAck',
	'SGameKickOutRequestAck',
	'SGameKickOutVoteResultAck', // TODO: Unused and unchecked from me
	'SGameKickOutStateAck',
	'SCaptainRoundCaptainLifeInfoAck', // TODO: Unused and unchecked from me
	'SCaptainSubRoundWinAck', // TODO: Unused and unchecked from me
	'SCaptainCurrentRoundInfoAck', // TODO: Unused and unchecked from me
	'SSeizeUpdateInfoAck', // TODO: Unused and unchecked from me
	'SSeizeUpdateInfoByIntrudeAck', // TODO: Unused and unchecked from me
	'SSeizeFeverTimeAck', // TODO: Unused and unchecked from me
	'SSeizeBuffItemGainReq',
	'SSeizeDropBuffItemAck', // TODO: Unused and unchecked from me
	'SSeizeUpKeepScoreUpdateAck', // TODO: Unused and unchecked from me
	'SSeizeUpKeepScoreGetAck', // TODO: Unused and unchecked from me
	'SRoomChangeMasterRequestAck',
	'SRoomMixedTeamBriefingInfoAck',
	'SGameEquipCheckReq',
	'SRoomGameStartAck',
	'SRoomGameLoadingAck',
	'SGameTackUpdateAck', // TODO: Unused and unchecked from me
	'SRoomGameEndLoadingAck',
	'SRoomGamePlayCountDownAck',
	'SInGameItemDropAck',
	'SInGameItemGetAck',
	'SInGamePlayerResponseOfDeathAck',
	'SChallengeRankersAck', // TODO: Unused and unchecked from me
	'SChallengeRankinglistAck', // TODO: Unused and unchecked from me
	'SPromotionCouponEventIngameGetAck', // TODO: Unused and unchecked from me
	'SRoomEnterPlayerForBookNameTagsAck',
	'SRoomEnterPlayerInfoListForNameTagAck',
	'SUseBurningBuffAck', // TODO: Unused and unchecked from me
	'SRoomChangeRuleNotifyAck2', // TODO: Unused and unchecked from me
	'SRoomRandomRoomBeginActionAck', // TODO: Unused and unchecked from me
	'SScoreAIKillAck', // TODO: Unused and unchecked from me
	'SScoreAIKillAssistAck', // TODO: Unused and unchecked from me
	'SSyncArenaBattleIdxAck',
	'SSyncFirstArenaBattleIdxAck',
	'SScoreArenaDrawPlayAck', // TODO: Unused and unchecked from me
	'SArenaSetGameOptionAck',
	'SArenaSpecialPointAck',
	'SScoreArenaBattlePlayerLeave',
	'SArenaLeaderShowdown',
	'SArenaDrawHealthPointReq',
	'SArenaHalfTimeStatus',
	'SArenaNotIntrudePlayer' // 3106
])

// S2C Club | 47
generateOpCodes(Start.S2CClub, [
	'SClubCreateAck',
	'SClubCloseAck',
	'SClubJoinAck',
	'SClubUnjoinAck',
	'SClubNameCheckAck',
	'SClubRestoreAck',
	'SClubAdminInviteAck',
	'SClubAdminJoinCommandAck',
	'SClubAdminGradeChangeAck',
	'SClubAdminNoticeChangeAck',
	'SClubAdminInfoModifyAck',
	'SClubAdminSubMasterAck',
	'SClubAdminSubMasterCancelAck', // TODO: Unused and unchecked from me
	'SClubAdminMasterChangeAck',
	'SClubAdminJoinConditionModifyAck',
	'SClubAdminBoardModifyAck',
	'SClubSearchAck',
	'SClubInfoAck',
	'SClubJoinWaiterInfoAck',
	'SClubNewJoinMemberInfoAck',
	'SClubJoinConditionInfoAck',
	'SClubUnjoinerListAck',
	'SClubUnjoinSettingMemberListAck', // TODO: Unused and unchecked from me
	'SClubGradeCountAck', // TODO: Unused and unchecked from me
	'SClubStuffListAck',
	'SClubNewsInfoAck',
	'SClubMyInfoAck',
	'SClubBoardWriteAck',
	'SClubBoardReadAck',
	'SClubBoardModifyAck',
	'SClubBoardDeleteAck',
	'SClubBoardDeleteAllAck',
	'SClubBoardReadFailedAck', // TODO: Unused and unchecked from me
	'SClubCreateAck2',
	'SClubCloseAck2', // TODO: Unused and unchecked from me
	'SClubJoinAck2', // TODO: Unused and unchecked from me
	'SClubUnjoinAck2', // TODO: Unused and unchecked from me
	'SClubRestoreAck2', // TODO: Unused and unchecked from me
	'SClubClubInfoAck2',
	'SClubSearchAck2', // TODO: Unused and unchecked from me
	'SClubEditUrlAck', // TODO: Unused and unchecked from me
	'SClubEditIntroduceAck', // TODO: Unused and unchecked from me
	'SClubStuffListAck2', // TODO: Unused and unchecked from me
	'SClubRankListAck', // TODO: Unused and unchecked from me
	'SClubMatchNotice', // TODO: Unused and unchecked from me
	'SClubAdminMasterChangeRequestAck', // TODO: Unused and unchecked from me
	'SClubAdminMasterChangeResponseAck' // 5047 // TODO: Unused and unchecked from me
])

module.exports = opCode
