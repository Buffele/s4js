module.exports = {
	// C2S Lobby
	CCharacterCreateReq: 2,
	CCharacterSelectReq: 3,
	CCharacterDeleteReq: 4,
	CLoginRequestReq: 5,
	CRoomQuickStartReq: 6, // TODO: Needs to be implemented
	CRoomMakeReq: 7,
	CNickCheckReq: 8,
	CItemUseItemReq: 9,
	CRoomLeaveReq: 10,
	CTimeSyncReq: 11,
	CAdminShowWindowReq: 12,
	//CClubInfoReq: 13,
	CChannelEnterReq: 14,
	CChannelLeaveReq: 15,
	CChannelInfoReq: 16,
	CRoomEnterReq: 17,
	CPlayerInfoReq: 18,
	CItemBuyItemReq: 19,
	CItemRepairItemReq: 20,
	CItemRefundItemReq: 21,
	CAdminActionReq: 22,
	CCharacterActiveEquipPresetReq: 23, // TODO: Needs to be implemented
	CLicenseGainReq: 24, // TODO: Needs to be implemented
	CClubNoticeChangeReq: 25, // TODO: Needs to be implemented
	CClubInfoByIDReq: 26, // TODO: Needs to be implemented
	CClubInfoByNameReq: 27, // TODO: Needs to be implemented
	CItemInventoryInfoReq: 28, // TODO: Needs to be implemented
	CTaskNotifyReq: 29, // TODO: Needs to be implemented
	CTaskRequestReq: 30, // TODO: Needs to be implemented
	CLicenseExerciseReq: 31, // TODO: Needs to be implemented
	CItemUseCoinReq: 32, // TODO: Needs to be implemented
	CItemUseEsperChipReq: 33, // TODO: Needs to be implemented
	CPlayerBadUserReq: 34, // TODO: Needs to be implemented
	//CClubJoinReq: 35, // TODO: Needs to be implemented
	//CClubUnJoinReq: 36, // TODO: Needs to be implemented
	CNewShopUpdateCheckReq: 37,
	CItemUseChangeNickReq: 38,
	CItemUseRecordResetReq: 39,
	CItemUseCoinFillingReq: 40, // TODO: Needs to be implemented
	CPlayerFindInfoReq: 41,
	CItemDiscardItemReq: 42,
	CItemUseCapsuleReq: 43,
	CClubAddressReq: 44, // TODO: Needs to be implemented
	CClubHistoryReq: 45, // TODO: Needs to be implemented
	CItemUseChangeNickCancelReq: 46,
	CTutorialCompletedReq: 47, // TODO: Needs to be implemented
	CCharacterFirstCreateReq: 48,
	CShoppingBasketActionReq: 49,
	CShoppingBasketDeleteReq: 50,
	CRandomShopUpdateCheckReq: 51,
	CRandomShopRollingStartReq: 52,
	CRoomInfoRequestReq: 53,
	CNoteGiftItemReq: 54,
	CNoteImportuneItemReq: 55, // TODO: Needs to be implemented
	CNoteGiftItemGainReq: 56, // TODO: Needs to be implemented
	CRoomQuickJoinReq: 57,
	CMoneyRefreshCashInfoReq: 58, // TODO: Needs to be implemented
	CCardGambleReq: 59, // TODO: Needs to be implemented
	CPromotionAttendanceGiftItemReq: 60, // TODO: Needs to be implemented
	CPromotionCoinEventUseCoinReq: 61, // TODO: Needs to be implemented
	CItemEnchantReq: 62,
	CPromotionCardShuffleReq: 63, // TODO: Needs to be implemented
	CBillingCashInfoReq: 64, // TODO: Needs to be implemented
	CXTrapDetourReq: 65, // TODO: Needs to be implemented
	CPromotionCouponEventReq: 66, // TODO: Needs to be implemented
	CCollectBookUpdateCheckReq: 67,
	CCollectBookInventoryInfoReq: 68, // TODO: Needs to be implemented
	CCollectBookItemRegistReq: 69,
	CCollectBookUseRewardReq: 70, // TODO: Needs to be implemented
	CUseInstantItemReq: 71,
	CUseInstantItemRemoveEffectReq: 72,
	CPromotionRouletteMachineStartReq: 73,
	CGameGuardCSAuthReq: 74, // TODO: Needs to be implemented
	CGameGuardHackReportReq: 75, // TODO: Needs to be implemented
	CPromotionXMasCardUseReq: 76, // TODO: Needs to be implemented
	CPromotionNewYearCardUseReq: 77, // TODO: Needs to be implemented
	CHackShieldMakeResponseReq: 78, // TODO: Needs to be implemented
	CRoomMakeReq2: 79,
	CAlchemyCombinationReq: 80, // TODO: Needs to be implemented
	CAlchemyDecompositionReq: 81,
	CPromotionItemPaymentReq: 82, // TODO: Needs to be implemented
	CItemUseFillExpReq: 83, // TODO: Needs to be implemented
	CDailyMissionRewardReq: 84, // TODO: Needs to be implemented
	CDailyMissionInitReq: 85,
	CDailyMissionNextStepReq: 86, // TODO: Needs to be implemented
	CAchieveMissionReq: 87,
	CAchieveMissionRewardReq: 88,
	CBtcClearReq: 89, // TODO: Needs to be implemented
	CNewItemEnchantReq: 90,
	CItemUseJewelItemReq: 91,
	CXignCodeAliveReq: 92,
	CEsperEnchantReq: 93, // TODO: Needs to be implemented
	CMatchStartReq: 94, // TODO: Needs to be implemented
	CMatchStopReq: 95, // TODO: Needs to be implemented
	CMatchListReq: 96, // TODO: Needs to be implemented
	CMatchInviteReq: 97, // TODO: Needs to be implemented
	CBattleInvitesReceivedResult: 98, // TODO: Needs to be implemented
	CReMatchReq: 99, // TODO: Needs to be implemented
	CMatchVoteBegin: 100, // TODO: Needs to be implemented
	CMatchClubMarkReq: 101, // TODO: Needs to be implemented
	CMatchPointReq: 102, // TODO: Needs to be implemented
	CMatchRoomQuitReq: 103, // TODO: Needs to be implemented
	CClubNoticePointRefreshReq: 104,
	CClubNoticeRecordRefreshReq: 105,
	CClubSearchRoomReq: 106,
	CClubStadiumEditMapDataReq: 107, // TODO: Needs to be implemented
	CClubStadiumEditBlastinfoEditReq: 108, // TODO: Needs to be implemented
	CClubStadiumInfoReq: 109, // TODO: Needs to be implemented
	CClubStadiumSelectReq: 110, // TODO: Needs to be implemented
	CClubOtherClubinfoReq: 111, // TODO: Needs to be implemented
	CClubFASystemFAListReq: 112,
	CClubFASystemFARegisterReq: 113, // TODO: Needs to be implemented
	CClubFASystemFARecordReq: 114, // TODO: Needs to be implemented
	CClubFASystemFAScoutReq: 115, // TODO: Needs to be implemented
	CClubFASystemFAScoutListReq: 116, // TODO: Needs to be implemented
	CClubFASystemFAScoutAcceptReq: 117, // TODO: Needs to be implemented
	CUnionMainUiReq: 118, // TODO: Needs to be implemented
	CUnionSearchRoomReq: 119, // TODO: Needs to be implemented
	CEsperEnchantPercentUpReq: 120, // TODO: Needs to be implemented
	CUseEnchantChipReq: 121,
	CMoveEnchantChipReq: 122,
	CCheckHashKeyValueReq: 123,

	// C2S GameRule
	CRoomEnterPlayerReq: 2001,
	CRoomLeaveRequestReq: 2002,
	CRoomTeamChangeReq: 2003,
	CRoomAutoAssingTeamReq: 2004, // TODO: Unused and unchecked from me
	CRoomAutoMixingTeamReq: 2005,
	CRoomChoiceTeamChangeReq: 2006, // TODO: Unused and unchecked from me
	CGameEventMessageReq: 2007,
	CRoomReadyRoundReq: 2008, // TODO: Unused and unchecked from me
	CRoomBeginRoundReq: 2009, // TODO: Unused and unchecked from me
	CGameAvatarDurabilityDecreaseReq: 2010, // TODO: Unused and unchecked from me
	CGameAvatarChangeReq: 2011, // TODO: Unused and unchecked from me
	CRoomChangeRuleNotifyReq: 2012,
	CScoreMissionScoreReq: 2013,
	CScoreKillReq: 2014,
	CScoreKillAssistReq: 2015,
	CScoreOffenseReq: 2016,
	CScoreOffenseAssistReq: 2017,
	CScoreDefenseReq: 2018,
	CScoreDefenseAssistReq: 2019,
	CScoreHealAssistReq: 2020,
	CScoreGoalReq: 2021,
	CScoreReboundReq: 2022,
	CScoreSuicideReq: 2023,
	CScoreTeamKillReq: 2024,
	CRoomItemChangeReq: 2025, // TODO: Unused and unchecked from me
	CRoomPlayModeChangeReq: 2026,
	CArcadeScoreSyncReq: 2027, // TODO: Unused and unchecked from me
	CArcadeBeginRoundReq: 2028,
	CArcadeStageClearReq: 2029,
	CArcadeStageFailedReq: 2030,
	CArcadeStageInfoReq: 2031, // TODO: Unused and unchecked from me
	CArcadeEnablePlayTimeReq: 2032, // TODO: Unused and unchecked from me
	CArcardRespawnReq: 2033, // TODO: Unused and unchecked from me
	CArcadeStageReadyReq: 2034, // TODO: Unused and unchecked from me
	CArcadeStageSelectReq: 2035,
	CSlaughterAttackPointReq: 2036, // TODO: Unused and unchecked from me
	CSlaughterHealPointReq: 2037, // TODO: Unused and unchecked from me
	CArcadeLoadingSuccessReq: 2038, // TODO: Unused and unchecked from me
	CMoneyUseCoinReq: 2039,
	CLogBeginResponseReq: 2040,
	CLogWeaponFireReq: 2041, // TODO: Unused and unchecked from me
	CGameKickOutRequestReq: 2042,
	CGameKickOutVoteResultReq: 2043,
	CRoomIntrudeRoundReq: 2044, // TODO: Unused and unchecked from me
	CGameLoadingSuccessReq: 2045,
	CSeizePositionCaptureReq: 2046, // TODO: Unused and unchecked from me
	CSeizeBuffItemGainReq: 2047, // TODO: Unused and unchecked from me
	CRoomChoiceMasterChangeReq: 2048,
	CGameEquipCheckAck: 2049, // TODO: Unused and unchecked from me
	CPromotionCointEventGetCoinReq: 2050, // TODO: Unused and unchecked from me
	CInGameItemDropReq: 2051,
	CInGameItemGetReq: 2052,
	CInGamePlayerResponseReq: 2053,
	CChallengeRankinglistReq: 2054, // TODO: Unused and unchecked from me
	CChallengeResultReq: 2055,
	CChallengeReStartReq: 2056, // TODO: Unused and unchecked from me
	CPromotionCouponEventIngameGetReq: 2057, // TODO: Unused and unchecked from me
	CRecordBurningDataReq: 2058, // TODO: Unused and unchecked from me
	CRoomReadyRoundReq2: 2059,
	CRoomBeginRoundReq2: 2060,
	CRoomIntrudeRoundReq2: 2061,
	CUseBurningBuffReq: 2062, // TODO: Unused and unchecked from me
	CRoomChangeRuleNotifyReq2: 2063,
	CRoomRandomRoomBeginActionReq: 2064, // TODO: Unused and unchecked from me
	CScoreAIKillReq: 2065, // TODO: Unused and unchecked from me
	CArenaSetGameOptionReq: 2066,
	CArenaSpecialPointReq: 2067, // TODO: Unused and unchecked from me
	CArenaDrawHealthPointAck: 2068, // TODO: Unused and unchecked from me

	// C2S Club
	CClubCreateReq: 4001,
    CClubCloseReq: 4002,
	CClubJoinReq: 4003,
	CClubUnjoinReq: 4004,
	CClubNameCheckReq: 4005,
	CClubRestoreReq: 4006,
	CClubAdminInviteReq: 4007,
	CClubAdminJoinCommandReq: 4008,
	CClubAdminGradeChangeReq: 4009,
	CClubAdminNoticeChangeReq: 4010,
	CClubAdminInfoModifyReq: 4011,
	CClubAdminSubMasterReq: 4012,
	CClubAdminSubMasterCancelReq: 4013, // TODO: Unused and unchecked from me
	CClubAdminMasterChangeReq: 4014,
	CClubAdminJoinConditionModifyReq: 4015,
	CClubAdminBoardModifyReq: 4016,
	CClubSearchReq: 4017,
	CClubInfoReq: 4018,
	CClubJoinWaiterInfoReq: 4019,
	CClubNewJoinMemberInfoReq: 4020,
	CClubJoinConditionInfoReq: 4021,
	CClubUnjoinerListReq: 4022,
	CClubUnjoinSettingMemberListReq: 4023, // TODO: Unused and unchecked from me
	CClubGradeCountReq: 4024, // TODO: Unused and unchecked from me
	CClubStuffListReq: 4025,
	CClubNewsInfoReq: 4026,
	CClubBoardWriteReq: 4027,
	CClubBoardReadReq: 4028,
	CClubBoardModifyReq: 4029,
	CClubBoardDeleteReq: 4030,
	CClubBoardDeleteAllReq: 4031,
	CClubBoardSearchNickReq: 4032,
	CClubBoardReadOtherClubReq: 4033,
	CClubBoardReadMineReq: 4034, // TODO: Unused and unchecked from me
	CClubCreateReq2: 4035,
	CClubCloseReq2: 4036, // TODO: Unused and unchecked from me
	CClubJoinReq2: 4037, // TODO: Unused and unchecked from me
	CClubUnjoinReq2: 4038,
	CClubRestoreReq2: 4039, // TODO: Unused and unchecked from me
	CClubClubInfoReq2: 4040,
	CClubSearchReq2: 4041,
	CClubEditUrlReq: 4042, // TODO: Unused and unchecked from me
	CClubEditIntroduceReq: 4043, // TODO: Unused and unchecked from me
	CClubStuffListReq2: 4044, // TODO: Unused and unchecked from me
	CClubRankListReq: 4045,

	// S2C Lobby
	SLoginRequestAck: 1001,
	SPlayerAccountInfoAck: 1002,
	SCharacterCurrentInfoAck: 1003,
	SCharacterCurrentItemInfoAck: 1004,
	SItemInventoryInfoAck: 1005,
	SCharacterDeleteAck: 1006,
	SCharacterSelectAck: 1007,
	SSuccessCreateCharacterAck: 1008,
	SServerResultAck: 1009,
	SNickCheckAck: 1010,
	SItemUseItemAck: 1011,
	SItemUpdateInventoryAck: 1012,
	SRoomCurrentCharacterSlotAck: 1013,
	SRoomEnterPlayerInfoAck: 1014,
	SRoomEnterClubInfoAck: 1015,
	SRoomPlayerInfoListForEnterPlayerAck: 1016,
	SRoomClubInfoListForEnterPlayerAck: 1017,
	SRoomEnterRoomInfoAck: 1018,
	SRoomLeavePlayerInfoAck: 1019,
	STimeSyncAck: 1020,
	SRoomChangeRoomInfoAck: 1021, // TODO: Unused and unchecked from me
	SNewShopUpdateEndAck: 1022, // TODO: Unused and unchecked from me
	SChannelListInfoAck: 1023,
	SRoomDeployAck: 1024, // TODO: Unused and unchecked from me
	SRoomDisposeAck: 1025,
	//SPlayerInfoAck: 1026,
	SItemBuyItemAck: 1027,
	SItemRepairItemAck: 1028,
	SItemDurabilityItemAck: 1029,
	SItemRefundItemAck: 1030,
	SMoneyRefreshCashInfoAck: 1031,
	SAdminActionAck: 1032,
	SAdminShowWindowAck: 1033,
	SNoticeAdminMessageAck: 1034,
	SCharacterCurrentSlotInfoAck: 1035,
	SItemRefreshInvalidEquipItemAck: 1036, // TODO: Unused and unchecked from me
	SItemClearInvalidEquipItemAck: 1037,
	SCharacterAvatarEquipPresetAck: 1038,
	SLicenseMyInfoAck: 1039, // TODO: Unused and unchecked from me
	//SClubInfoAck: 1040, // TODO: Unused and unchecked from me
	SClubHistoryAck: 1041, // TODO: Unused and unchecked from me
	SItemEquipBoostItemInfoAck: 1042,
	SClubFindInfoAck: 1043, // TODO: Unused and unchecked from me
	STaskInfoAck: 1044, // TODO: Unused and unchecked from me
	STaskUpdateAck: 1045, // TODO: Unused and unchecked from me
	STaskRequestAck: 1046, // TODO: Unused and unchecked from me
	STaskRemoveAck: 1047, // TODO: Unused and unchecked from me
	SMoneyRefreshCoinInfoAck: 1048,
	SItemUseEsperChipItemAck: 1049, // TODO: Unused and unchecked from me
	SRequitalArcadeRewardAck: 1050, // TODO: Unused and unchecked from me
	SPlayerArcadeMapInfoAck: 1051,
	SPlayerArcadeStageInfoAck: 1052,
	SMoneyRefreshPenInfoAck: 1053,
	SItemUseCapsuleAck: 1054,
	SAdminHGWKickAck: 1055, // TODO: Unused and unchecked from me
	SClubJoinAck: 1056, // TODO: Unused and unchecked from me
	SClubUnJoinAck: 1057, // TODO: Unused and unchecked from me
	SNewShopUpdateCheckAck: 1058,
	SNewShopUpdateInfoAck: 1059, // TODO: Unused and unchecked from me
	SItemUseChangeNickAck: 1060,
	SItemUseRecordResetAck: 1061,
	SItemUseCoinFillingAck: 1062, // TODO: Unused and unchecked from me
	SPlayerFindInfoAck: 1063, // TODO: Unused and unchecked from me
	SItemDiscardItemAck: 1064,
	SItemInventoryDeleteAck: 1065,
	SClubAddressAck: 1066, // TODO: Unused and unchecked from me
	SItemUseChangeNickCancelAck: 1067,
	SRequitalEventItemRewardAck: 1068, // TODO: Unused and unchecked from me
	SRoomListInfoAck: 1069, // TODO: Unused and unchecked from me
	SNickDefaultAck: 1070, // TODO: Unused and unchecked from me
	SRequitalGiveItemResultAck: 1071, // TODO: Unused and unchecked from me
	SShoppingBasketActionAck: 1072,
	SShoppingBasketListInfoAck: 1073,
	SRandomShopUpdateRequestAck: 1074, // TODO: Unused and unchecked from me
	SRandomShopUpdateCheckAck: 1075,
	SRandomShopUpdateInfoAck: 1076,
	SRandomShopRollingStartAck: 1077,
	SRoomInfoRequestAck: 1078, // TODO: Unused and unchecked from me
	SNoteGiftItemAck: 1079, // TODO: Unused and unchecked from me
	SNoteImportuneItemAck: 1080, // TODO: Unused and unchecked from me
	SNoteGiftItemGainAck: 1081, // TODO: Unused and unchecked from me
	SRoomQuickJoinAck: 1082,
	SJorbiWebSessionRedirectAck: 1083,
	SCardGambleAck: 1084, // TODO: Unused and unchecked from me
	SNoticeItemGainAck: 1085,
	SPromotionPunkinNoticeAck: 1086, // TODO: Unused and unchecked from me
	SPromotionPunkinRankersAck: 1087, // TODO: Unused and unchecked from me
	SRequitalLevelAck: 1088, // TODO: Unused and unchecked from me
	SPromotionAttendanceInfoAck: 1089, // TODO: Unused and unchecked from me
	SPromotionAttendanceGiftItemAck: 1090, // TODO: Unused and unchecked from me
	SPromotionCoinEventAck: 1091, // TODO: Unused and unchecked from me
	SPromotionCoinEventDropCoinAck: 1092, // TODO: Unused and unchecked from me
	SEnchantEnchantItemAck: 1093,
	SEnchantRefreshEnchantGaugeAck: 1094, // TODO: Unused and unchecked from me
	SNoticeEnchantAck: 1095, // TODO: Unused and unchecked from me
	SPromotionCardShuffleAck: 1096, // TODO: Unused and unchecked from me
	SItemClearEsperChipAck: 1097,
	SChallengeMyInfoAck: 1098,
	SKRShutDownAck: 1099, // TODO: Unused and unchecked from me
	SRequitalChallengeAck: 1100, // TODO: Unused and unchecked from me
	SMapOpenInfosAck: 1101,
	SPromotionCouponEventAck: 1102, // TODO: Unused and unchecked from me
	STutorialCompletedAck: 1103, // TODO: Unused and unchecked from me
	SExpRefreshInfoAck: 1104,
	SPromotionActiveAck: 1105, // TODO: Unused and unchecked from me
	SCollectBookUpdateRequestAck: 1106, // TODO: Unused and unchecked from me
	SCollectBookUpdateCheckAck: 1107,
	SCollectBookUpdateInfoAck: 1108, // TODO: Unused and unchecked from me
	SCollectBookInventoryInfoAck: 1109, // TODO: Unused and unchecked from me
	SUseInstantItemAck: 1110,
	SCollectBookInvenEffectInfoAck: 1111, // TODO: Unused and unchecked from me
	SCollectBookItemRegistAck: 1112,
	SCollectBookEffectRegistAck: 1113, // TODO: Unused and unchecked from me
	SCollectBookExpireBookRewardAck: 1114, // TODO: Unused and unchecked from me
	SCollectBookReuseBookRewardAck: 1115, // TODO: Unused and unchecked from me
	SCollectBookBookUseRewardAck: 1116, // TODO: Unused and unchecked from me
	SCollectBookBookUnRegistAck: 1117, // TODO: Unused and unchecked from me
	SRoomEnterPlayerInfoForCollectBookAck: 1118,
	SRoomPlayerInfoListForEnterPlayerForCollectBookAck: 1119,
	SPromotionUsingCashRewardItemAck: 1120, // TODO: Unused and unchecked from me
	SEnchantRefreshEnchantGaugeForInstantAck: 1121,
	SUseInstantItemRemoveEffectAck: 1122,
	SPromotionDailyGiftItemAck: 1123, // TODO: Unused and unchecked from me
	SPromotionRouletteMachineStartAck: 1124, // TODO: Unused and unchecked from me
	SGameGuardCSAuthAck: 1125, // TODO: Unused and unchecked from me
	SPremiumItemInfoListAck: 1126,
	SSecondaryRewardItemAck: 1127, // TODO: Unused and unchecked from me
	SPromotionXMasCardUseAck: 1128, // TODO: Unused and unchecked from me
	SPromotionNewYearCardUseAck: 1129, // TODO: Unused and unchecked from me
	SHackShieldMakeRequest: 1130, // TODO: Unused and unchecked from me
	SRoomChangeRoomInfoAck2: 1131,
	SRoomEnterRoomInfoAck2: 1132,
	SMakeEventItemAck: 1133, // TODO: Unused and unchecked from me
	SRoomListInfoAck2: 1134,
	SRoomDeployAck2: 1135,
	SRoomInfoRequestAck2: 1136,
	SAlchemyCombinationAck: 1137, // TODO: Unused and unchecked from me
	SAlchemyDecompositionAck: 1138, // TODO: Unused and unchecked from me
	SPromotionPlayTimeSync: 1139, // TODO: Unused and unchecked from me
	SPromotionItemPaymentAck: 1140, // TODO: Unused and unchecked from me
	SItemUseFillExpAck: 1141, // TODO: Unused and unchecked from me
	SRefreshAeriaTokenInfoAck: 1142,
	SDailyMissionNotice: 1143,
	SDailyMissionRewardAck: 1144, // TODO: Unused and unchecked from me
	SAchieveMissionAck: 1145,
	SAchieveMissionRewardAck: 1146, // TODO: Unused and unchecked from me
	SBtcClearAck: 1147, // TODO: Unused and unchecked from me
	SBtcSyncNotice: 1148,
	SNewEnchantEnchantItemAck: 1149,
	SItemUseJewelItemAck: 1150,
	SXignCodeAliveAck: 1151,
	SEsperEnchantAck: 1152,
	SMatchStartAck: 1153, // TODO: Needs to be implemented
	SMatchStopAck: 1154, // TODO: Needs to be implemented
	SGoToMatchRoom: 1155, // TODO: Needs to be implemented
	SMatchInviteAck: 1156, // TODO: Needs to be implemented
	SMatchListAck: 1157, // TODO: Needs to be implemented
	SBattleInvitesReceivedAck: 1158, // TODO: Needs to be implemented
	SReMatchAck: 1159, // TODO: Needs to be implemented
	SMatchClanInfo: 1160, // TODO: Needs to be implemented
	SMakeNewMatchRoom: 1161, // TODO: Needs to be implemented
	SMatchVoteBeginAck: 1162, // TODO: Needs to be implemented
	SMatchClubMarkAck: 1163, // TODO: Needs to be implemented
	SClubMatchPointAck: 1164, // TODO: Needs to be implemented
	SMatchPointAck: 1165, // TODO: Needs to be implemented
	SClubNoticePointRefreshAck: 1166, // TODO: Needs to be implemented
	SClubNoticeRecordRefreshAck: 1167, // TODO: Needs to be implemented
	SClubSearchRoomAck: 1168, // TODO: Needs to be implemented
	SClubStadiumEditMapDataAck: 1169, // TODO: Needs to be implemented
	SNukingUserAck: 1170, // TODO: Needs to be implemented
	SClubStadiumEditBlastinfoEditAck: 1171, // TODO: Needs to be implemented
	SClubStadiumInfoAck: 1172, // TODO: Needs to be implemented
	SClubStadiumSelectAck: 1173, // TODO: Needs to be implemented
	SClubOtherClubinfoAck: 1174, // TODO: Needs to be implemented
	SClubStadiumHomeDataAck: 1175, // TODO: Needs to be implemented
	SClubEndGameLeaderPoint: 1176, // TODO: Needs to be implemented
	SClubEndGameClubPoint: 1177, // TODO: Needs to be implemented
	SClubFASystemChangeStateAck: 1178, // TODO: Needs to be implemented
	SClubFASystemFAListAck: 1179,
	SClubFASystemFARegisterAck: 1180, // TODO: Needs to be implemented
	SClubFASystemFARegisterConfirmAck: 1181,
	SClubFASystemFARecordAck: 1182, // TODO: Needs to be implemented
	SClubUnionSystemUserInfo: 1183,
	SClubFASystemFAScoutAck: 1184, // TODO: Needs to be implemented
	SClubFASystemFAScoutListAck: 1185, // TODO: Needs to be implemented
	SClubFASystemFAScoutAcceptAck: 1186, // TODO: Needs to be implemented
	SUnionEndGamePoint: 1187, // TODO: Needs to be implemented
	SUnionMainUi: 1188, // TODO: Needs to be implemented
	SUnionSeasonEnd: 1189, // TODO: Needs to be implemented
	SUnionSearchRoomAck: 1190, // TODO: Needs to be implemented
	SEspherChipLv5: 1191,
	SMoneyRain: 1192, // TODO: Needs to be implemented
	SMoveEnchantChipAck: 1193, // TODO: Needs to be implemented

	// S2C GameRule
	SRoomEnterPlayerAck: 3001, // TODO: Unused and unchecked from me
	SRoomLeavePlayerAck: 3002,
	SRoomLeaveRequestAck: 3003, // TODO: Unused and unchecked from me
	SRoomChangeTeamAck: 3004,
	SRoomChangeTeamFailAck: 3005, // TODO: Unused and unchecked from me
	SRoomChoiceTeamChangeAck: 3006, // TODO: Unused and unchecked from me
	SRoomChoiceTeamChangeFailAck: 3007, // TODO: Unused and unchecked from me
	SGameEventMessageAck: 3008,
	SGameBriefingInfoAck: 3009,
	SGameChangeStateAck: 3010,
	SGameChangeSubStateAck: 3011,
	SGameDestroyGameRuleAck: 3012, // TODO: Unused and unchecked from me
	SRoomChangeMasterAck: 3013,
	SRoomChangeRefereeAck: 3014,
	SSlaughterChangeSlaughterAck: 3015,
	SRoomReadyRoundAck: 3016,
	SRoomBeginRoundAck: 3017,
	SGameAvatarChangeAck: 3018, // TODO: Unused and unchecked from me
	SRoomChangeRuleNotifyAck: 3019, // TODO: Unused and unchecked from me
	SRoomChangeRuleAck: 3020,
	SRoomChangeRuleFailAck: 3021, // TODO: Unused and unchecked from me
	SScoreMissionScoreAck: 3022,
	SScoreKillAck: 3023,
	SScoreKillAssistAck: 3024,
	SScoreOffenseAck: 3025,
	SScoreOffenseAssistAck: 3026,
	SScoreDefenseAck: 3027,
	SScoreDefenseAssistAck: 3028,
	SScoreLeaderKillAck: 3029, // TODO: Unused and unchecked from me
	SScoreHealAssistAck: 3030,
	SScoreGoalAck: 3031,
	SScoreGoalAssistAck: 3032, // TODO: Unused and unchecked from me
	SScoreReboundAck: 3033,
	SScoreSuicideAck: 3034,
	SScoreTeamKillAck: 3035,
	SSlaughterRoundWinAck: 3036,
	SSlaughterSLRoundWinAck: 3037, // TODO: Unused and unchecked from me
	SRoomChangeItemAck: 3038, // TODO: Unused and unchecked from me
	SRoomPlayModeChangeAck: 3039,
	SGameRefreshGameRuleInfoAck: 3040,
	SArcadeScoreSyncAck: 3041, // TODO: Unused and unchecked from me
	SArcadeBeginRoundAck: 3042, // TODO: Unused and unchecked from me
	SArcadeStageBriefingAck: 3043, // TODO: Unused and unchecked from me
	SArcadeEnablePlayTimeAck: 3044, // TODO: Unused and unchecked from me
	SArcadeStageInfoAck: 3045, // TODO: Unused and unchecked from me
	SArcadeRespawnAck: 3046, // TODO: Unused and unchecked from me
	SArcadeDeathPlayerInfoAck: 3047, // TODO: Unused and unchecked from me
	SArcadeStageReadyAck: 3048, // TODO: Unused and unchecked from me
	SArcadeRespawnFailAck: 3049, // TODO: Unused and unchecked from me
	SAdminChangeHPAck: 3050,
	SAdminChangeMPAck: 3051,
	SArcadeChangeStageAck: 3052, // TODO: Unused and unchecked from me
	SArcadeStageSelectAck: 3053, // TODO: Unused and unchecked from me
	SArcadeSavedateInfoAck: 3054, // TODO: Unused and unchecked from me
	SSlaughterAttackPointAck: 3055, // TODO: Unused and unchecked from me
	SSlaughterHealPointAck: 3056, // TODO: Unused and unchecked from me
	SSlaughterChangeBonusTargetAck: 3057,
	SArcadeSucceedLoadingAck: 3058, // TODO: Unused and unchecked from me
	SMoneyUseCoinAck: 3059,
	SGameLuckyShotAck: 3060,
	SFreeAllForChangeTheFirstAck: 3061,
	SLogDevLogStartAck: 3062,
	SGameKickOutRequestAck: 3063,
	SGameKickOutVoteResultAck: 3064, // TODO: Unused and unchecked from me
	SGameKickOutStateAck: 3065,
	SCaptainRoundCaptainLifeInfoAck: 3066, // TODO: Unused and unchecked from me
	SCaptainSubRoundWinAck: 3067, // TODO: Unused and unchecked from me
	SCaptainCurrentRoundInfoAck: 3068, // TODO: Unused and unchecked from me
	SSeizeUpdateInfoAck: 3069, // TODO: Unused and unchecked from me
	SSeizeUpdateInfoByIntrudeAck: 3070, // TODO: Unused and unchecked from me
	SSeizeFeverTimeAck: 3071, // TODO: Unused and unchecked from me
	SSeizeBuffItemGainReq: 3072,
	SSeizeDropBuffItemAck: 3073, // TODO: Unused and unchecked from me
	SSeizeUpKeepScoreUpdateAck: 3074, // TODO: Unused and unchecked from me
	SSeizeUpKeepScoreGetAck: 3075, // TODO: Unused and unchecked from me
	SRoomChangeMasterRequestAck: 3076,
	SRoomMixedTeamBriefingInfoAck: 3077,
	SGameEquipCheckReq: 3078,
	SRoomGameStartAck: 3079,
	SRoomGameLoadingAck: 3080,
	SGameTackUpdateAck: 3081, // TODO: Unused and unchecked from me
	SRoomGameEndLoadingAck: 3082,
	SRoomGamePlayCountDownAck: 3083,
	SInGameItemDropAck: 3084,
	SInGameItemGetAck: 3085,
	SInGamePlayerResponseOfDeathAck: 3086,
	SChallengeRankersAck: 3087, // TODO: Unused and unchecked from me
	SChallengeRankinglistAck: 3088, // TODO: Unused and unchecked from me
	SPromotionCouponEventIngameGetAck: 3089, // TODO: Unused and unchecked from me
	SRoomEnterPlayerForBookNameTagsAck: 3090,
	SRoomEnterPlayerInfoListForNameTagAck: 3091,
	SUseBurningBuffAck: 3092, // TODO: Unused and unchecked from me
	SRoomChangeRuleNotifyAck2: 3093, // TODO: Unused and unchecked from me
	SRoomRandomRoomBeginActionAck: 3094, // TODO: Unused and unchecked from me
	SScoreAIKillAck: 3095, // TODO: Unused and unchecked from me
	SScoreAIKillAssistAck: 3096, // TODO: Unused and unchecked from me
	SSyncArenaBattleIdxAck: 3097,
	SSyncFirstArenaBattleIdxAck: 3098,
	SScoreArenaDrawPlayAck: 3099, // TODO: Unused and unchecked from me
	SArenaSetGameOptionAck: 3100,
	SArenaSpecialPointAck: 3101,
	SScoreArenaBattlePlayerLeave: 3102,
	SArenaLeaderShowdown: 3103,
	SArenaDrawHealthPointReq: 3104,
	SArenaHalfTimeStatus: 3105,
	SArenaNotIntrudePlayer: 3106,

	// S2C Club
	SClubCreateAck: 5001,
	SClubCloseAck: 5002,
	SClubJoinAck: 5003,
	SClubUnjoinAck: 5004,
	SClubNameCheckAck: 5005,
	SClubRestoreAck: 5006,
	SClubAdminInviteAck: 5007,
	SClubAdminJoinCommandAck: 5008,
	SClubAdminGradeChangeAck: 5009,
	SClubAdminNoticeChangeAck: 5010,
	SClubAdminInfoModifyAck: 5011,
	SClubAdminSubMasterAck: 5012,
	SClubAdminSubMasterCancelAck: 5013, // TODO: Unused and unchecked from me
	SClubAdminMasterChangeAck: 5014,
	SClubAdminJoinConditionModifyAck: 5015,
	SClubAdminBoardModifyAck: 5016,
	SClubSearchAck: 5017,
	SClubInfoAck: 5018,
	SClubJoinWaiterInfoAck: 5019,
	SClubNewJoinMemberInfoAck: 5020,
	SClubJoinConditionInfoAck: 5021,
	SClubUnjoinerListAck: 5022,
	SClubUnjoinSettingMemberListAck: 5023, // TODO: Unused and unchecked from me
	SClubGradeCountAck: 5024, // TODO: Unused and unchecked from me
	SClubStuffListAck: 5025,
	SClubNewsInfoAck: 5026,
	SClubMyInfoAck: 5027,
	SClubBoardWriteAck: 5028,
	SClubBoardReadAck: 5029,
	SClubBoardModifyAck: 5030,
	SClubBoardDeleteAck: 5031,
	SClubBoardDeleteAllAck: 5032,
	SClubBoardReadFailedAck: 5033, // TODO: Unused and unchecked from me
	SClubCreateAck2: 5034,
	SClubCloseAck2: 5035, // TODO: Unused and unchecked from me
	SClubJoinAck2: 5036, // TODO: Unused and unchecked from me
	SClubUnjoinAck2: 5037, // TODO: Unused and unchecked from me
	SClubRestoreAck2: 5038, // TODO: Unused and unchecked from me
	SClubClubInfoAck2: 5039,
	SClubSearchAck2: 5040, // TODO: Unused and unchecked from me
	SClubEditUrlAck: 5041, // TODO: Unused and unchecked from me
	SClubEditIntroduceAck: 5042, // TODO: Unused and unchecked from me
	SClubStuffListAck2: 5043, // TODO: Unused and unchecked from me
	SClubRankListAck: 5044, // TODO: Unused and unchecked from me
	SClubMatchNotice: 5045 // TODO: Unused and unchecked from me
}