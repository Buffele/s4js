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
			// throw Error('OPCode "' + opCodes[i] + '" already exists.')
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

var Start = {
	C2SLobby: 50001,
	C2SGameRule: 20001,
	C2SClub: 22001,

	S2CLobby: 60001,
	S2CGameRule: 21001,
	S2CClub: 23001
}

// C2S Lobby | 129
generateOpCodes(Start.C2SLobby, [
'CCharacterCreateReq',
'CCharacterSelectReq',
'CCharacterDeleteReq',
'CLoginRequestReq',
'CRoomQuickStartReq',
'CRoomMakeReq',
'CNickCheckReq',
'CItemUseItemReq',
'CRoomLeaveReq',
'CTimeSyncReq',
'CAdminShowWindowReq',
'CClubInfoReq',
'CChannelEnterReq',
'CChannelLeaveReq',
'CChannelInfoReq',
'CRoomEnterReq',
'CPlayerInfoReq',
'CItemBuyItemReq',
'CItemRepairItemReq',
'CItemRefundItemReq',
'CAdminActionReq',
'CCharacterActiveEquipPresetReq',
'CLicenseGainReq',
'CClubNoticeChangeReq',
'CClubInfoByIDReq',
'CClubInfoByNameReq',
'CItemInventoryInfoReq',
'CTaskNotifyReq',
'CTaskRequestReq',
'CLicenseExerciseReq',
'CItemUseCoinReq',
'CItemUseEsperChipReq',
'CPlayerBadUserReq',
'CClubJoinReqOld',
'CClubUnJoinReq',
'CNewShopUpdateCheckReq',
'CItemUseChangeNickReq',
'CItemUseRecordResetReq',
'CItemUseCoinFillingReq',
'CPlayerFindInfoReq',
'CItemDiscardItemReq',
'CItemUseCapsuleReq',
'CClubAddressReq',
'CClubHistoryReq',
'CItemUseChangeNickCancelReq',
'CTutorialCompletedReq',
'CCharacterFirstCreateReq',
'CShoppingBasketActionReq',
'CShoppingBasketDeleteReq',
'CRandomShopUpdateCheckReq',
'CRandomShopRollingStartReq',
'CGachaShopUpdateCheckReq',
'CGachaShopRollingStartReq',
'CRoomInfoRequestReq',
'CNoteGiftItemReq',
'CNoteImportuneItemReq',
'CNoteGiftItemGainReq',
'CRoomQuickJoinReq',
'CMoneyRefreshCashInfoReq',
'CCardGambleReq',
'CPromotionAttendanceGiftItemReq',
'CPromotionCoinEventUseCoinReq',
'CItemEnchantReq',
'CPromotionCardShuffleReq',
'CBillingCashInfoReq',
'CXTrapDetourReq',
'CPromotionCouponEventReq',
'CCollectBookUpdateCheckReq',
'CCollectBookInventoryInfoReq',
'CCollectBookItemRegistReq',
'CCollectBookUseRewardReq',
'CUseInstantItemReq',
'CUseInstantItemRemoveEffectReq',
'CPromotionRouletteMachineStartReq',
'CGameGuardCSAuthReq',
'CGameGuardHackReportReq',
'CPromotionXMasCardUseReq',
'CPromotionNewYearCardUseReq',
'CHackShieldMakeResponseReq',
'CRoomMakeReq2',
'CAlchemyCombinationReq',
'CAlchemyDecompositionReq',
'CPromotionItemPaymentReq',
'CItemUseFillExpReq',
'CDailyMissionRewardReq',
'CDailyMissionInitReq',
'CDailyMissionNextStepReq',
'CAchieveMissionReq',
'CAchieveMissionRewardReq',
'CBtcClearReq',
'CNewItemEnchantReq',
'CItemUseJewelItemReq',
'CXignCodeAliveReq',
'CEsperEnchantReq',
'CMatchStartReq',
'CMatchStopReq',
'CMatchListReq',
'CMatchInviteReq',
'CBattleInvitesReceivedResult',
'CReMatchReq',
'CMatchVoteBegin',
'CMatchClubMarkReq',
'CMatchPointReq',
'CMatchRoomQuitReq',
'CClubNoticePointRefreshReq',
'CClubNoticeRecordRefreshReq',
'CClubSearchRoomReq',
'CClubStadiumEditMapDataReq',
'CClubStadiumEditBlastinfoEditReq',
'CClubStadiumInfoReq',
'CClubStadiumSelectReq',
'CClubOtherClubinfoReq',
'CClubFASystemFAListReq',
'CClubFASystemFARegisterReq',
'CClubFASystemFARecordReq',
'CClubFASystemFAScoutReq',
'CClubFASystemFAScoutListReq',
'CClubFASystemFAScoutAcceptReq',
'CUnionMainUiReq',
'CUnionSearchRoomReq',
'CEsperEnchantPercentUpReq',
'CUseEnchantChipReq',
'CMoveEnchantChipReq',
'CCheckHashKeyValueReq'
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
	'CClubJoinReq2',
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
	'SRoomChangeRoomInfoAck',
	'SNewShopUpdateEndAck',
	'SChannelListInfoAck',
	'SRoomDeployAck',
	'SRoomDisposeAck',
	'//SPlayerInfoAck',
	'SItemBuyItemAck',
	'SItemRepairItemAck',
	'SItemDurabilityItemAck',
	'SItemRefundItemAck',
	'SMoneyRefreshCashInfoAck',
	'SAdminActionAck',
	'SAdminShowWindowAck',
	'SNoticeAdminMessageAck',
	'SCharacterCurrentSlotInfoAck',
	'SItemRefreshInvalidEquipItemAck',
	'SItemClearInvalidEquipItemAck',
	'SCharacterAvatarEquipPresetAck',
	'SLicenseMyInfoAck',
	'//SClubInfoAck',
	'SClubHistoryAck',
	'SItemEquipBoostItemInfoAck',
	'SClubFindInfoAck',
	'STaskInfoAck',
	'STaskUpdateAck',
	'STaskRequestAck',
	'STaskRemoveAck',
	'SMoneyRefreshCoinInfoAck',
	'SItemUseEsperChipItemAck',
	'SRequitalArcadeRewardAck',
	'SPlayerArcadeMapInfoAck',
	'SPlayerArcadeStageInfoAck',
	'SMoneyRefreshPenInfoAck',
	'SItemUseCapsuleAck',
	'SAdminHGWKickAck',
	'SClubJoinAck',
	'SClubUnJoinAck',
	'SNewShopUpdateCheckAck',
	'SNewShopUpdateInfoAck',
	'SItemUseChangeNickAck',
	'SItemUseRecordResetAck',
	'SItemUseCoinFillingAck',
	'SPlayerFindInfoAck',
	'SItemDiscardItemAck',
	'SItemInventoryDeleteAck',
	'SClubAddressAck',
	'SItemUseChangeNickCancelAck',
	'SRequitalEventItemRewardAck',
	'SRoomListInfoAck',
	'SNickDefaultAck',
	'SRequitalGiveItemResultAck',
	'SShoppingBasketActionAck',
	'SShoppingBasketListInfoAck',
	'SRandomShopUpdateRequestAck',
	'SRandomShopUpdateCheckAck',
	'SRandomShopUpdateInfoAck',
	'SRandomShopRollingStartAck',
	'SGachaShopUpdateInfoAck',
	'SGachaShopRollingStartAck',
	'SRoomInfoRequestAck',
	'SNoteGiftItemAck',
	'SNoteImportuneItemAck',
	'SNoteGiftItemGainAck',
	'SRoomQuickJoinAck',
	'SJorbiWebSessionRedirectAck',
	'SCardGambleAck',
	'SNoticeItemGainAck',
	'SPromotionPunkinNoticeAck',
	'SPromotionPunkinRankersAck',
	'SRequitalLevelAck',
	'SPromotionAttendanceInfoAck',
	'SPromotionAttendanceGiftItemAck',
	'SPromotionCoinEventAck',
	'SPromotionCoinEventDropCoinAck',
	'SEnchantEnchantItemAck',
	'SEnchantRefreshEnchantGaugeAck',
	'SNoticeEnchantAck',
	'SPromotionCardShuffleAck',
	'SItemClearEsperChipAck',
	'SChallengeMyInfoAck',
	'SKRShutDownAck',
	'SRequitalChallengeAck',
	'SMapOpenInfosAck',
	'SPromotionCouponEventAck',
	'STutorialCompletedAck',
	'SExpRefreshInfoAck',
	'SPromotionActiveAck',
	'SCollectBookUpdateRequestAck',
	'SCollectBookUpdateCheckAck',
	'SCollectBookUpdateInfoAck',
	'SCollectBookInventoryInfoAck',
	'SUseInstantItemAck',
	'SCollectBookInvenEffectInfoAck',
	'SCollectBookItemRegistAck',
	'SCollectBookEffectRegistAck',
	'SCollectBookExpireBookRewardAck',
	'SCollectBookReuseBookRewardAck',
	'SCollectBookBookUseRewardAck',
	'SCollectBookBookUnRegistAck',
	'SRoomEnterPlayerInfoForCollectBookAck',
	'SRoomPlayerInfoListForEnterPlayerForCollectBookAck',
	'SPromotionUsingCashRewardItemAck',
	'SEnchantRefreshEnchantGaugeForInstantAck',
	'SUseInstantItemRemoveEffectAck',
	'SPromotionDailyGiftItemAck',
	'SPromotionRouletteMachineStartAck',
	'SGameGuardCSAuthAck',
	'SPremiumItemInfoListAck',
	'SSecondaryRewardItemAck',
	'SPromotionXMasCardUseAck',
	'SPromotionNewYearCardUseAck',
	'SHackShieldMakeRequest',
	'SRoomChangeRoomInfoAck2',
	'SRoomEnterRoomInfoAck2',
	'SMakeEventItemAck',
	'SRoomListInfoAck2',
	'SRoomDeployAck2',
	'SRoomInfoRequestAck2',
	'SAlchemyCombinationAck',
	'SAlchemyDecompositionAck',
	'SPromotionPlayTimeSync',
	'SPromotionItemPaymentAck',
	'SItemUseFillExpAck',
	'SRefreshAeriaTokenInfoAck',
	'SDailyMissionNotice',
	'SDailyMissionRewardAck',
	'SAchieveMissionAck',
	'SAchieveMissionRewardAck',
	'SBtcClearAck',
	'SBtcSyncNotice',
	'SNewEnchantEnchantItemAck',
	'SItemUseJewelItemAck',
	'SXignCodeAliveAck',
	'SEsperEnchantAck',
	'SMatchStartAck',
	'SMatchStopAck',
	'SGoToMatchRoom',
	'SMatchInviteAck',
	'SMatchListAck',
	'SBattleInvitesReceivedAck',
	'SReMatchAck',
	'SMatchClanInfo',
	'SMakeNewMatchRoom',
	'SMatchVoteBeginAck',
	'SMatchClubMarkAck',
	'SClubMatchPointAck',
	'SMatchPointAck',
	'SClubNoticePointRefreshAck',
	'SClubNoticeRecordRefreshAck',
	'SClubSearchRoomAck',
	'SClubStadiumEditMapDataAck',
	'SNukingUserAck',
	'SClubStadiumEditBlastinfoEditAck',
	'SClubStadiumInfoAck',
	'SClubStadiumSelectAck',
	'SClubOtherClubinfoAck',
	'SClubStadiumHomeDataAck',
	'SClubEndGameLeaderPoint',
	'SClubEndGameClubPoint',
	'SClubFASystemChangeStateAck',
	'SClubFASystemFAListAck',
	'SClubFASystemFARegisterAck',
	'SClubFASystemFARegisterConfirmAck',
	'SClubFASystemFARecordAck',
	'SClubUnionSystemUserInfo',
	'SClubFASystemFAScoutAck',
	'SClubFASystemFAScoutListAck',
	'SClubFASystemFAScoutAcceptAck',
	'SUnionEndGamePoint',
	'SUnionMainUi',
	'SUnionSeasonEnd',
	'SUnionSearchRoomAck',
	'SEspherChipLv5',
	'SMoneyRain',
	'SMoveEnchantChipAck'
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
