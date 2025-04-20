using System;
using System.Collections.Generic;
using System.IO;
using BlubLib.Serialization;

namespace Netsphere.Network.Message.GameRule
{
    internal static class GameRuleMapper
    {
        private static readonly Dictionary<GameRuleOpCode, Type> s_typeLookup = new Dictionary<GameRuleOpCode, Type>();
        private static readonly Dictionary<Type, GameRuleOpCode> s_opCodeLookup = new Dictionary<Type, GameRuleOpCode>();

        static GameRuleMapper()
        {
            // S2C
            Create<SRoomEnterPlayerAckMessage>(GameRuleOpCode.SRoomEnterPlayerAck);
            Create<SRoomLeavePlayerAckMessage>(GameRuleOpCode.SRoomLeavePlayerAck);
            Create<SRoomLeaveRequestAckMessage>(GameRuleOpCode.SRoomLeaveRequestAck);
            Create<SRoomChangeTeamAckMessage>(GameRuleOpCode.SRoomChangeTeamAck);
            Create<SRoomChangeTeamFailAckMessage>(GameRuleOpCode.SRoomChangeTeamFailAck);
            Create<SRoomChoiceTeamChangeAckMessage>(GameRuleOpCode.SRoomChoiceTeamChangeAck);
            Create<SRoomChoiceTeamChangeFailAckMessage>(GameRuleOpCode.SRoomChoiceTeamChangeFailAck);
            Create<SGameEventMessageAckMessage>(GameRuleOpCode.SGameEventMessageAck);
            Create<SGameBriefingInfoAckMessage>(GameRuleOpCode.SGameBriefingInfoAck);
            Create<SGameChangeStateAckMessage>(GameRuleOpCode.SGameChangeStateAck);
            Create<SGameChangeSubStateAckMessage>(GameRuleOpCode.SGameChangeSubStateAck);
            Create<SGameDestroyGameRuleAckMessage>(GameRuleOpCode.SGameDestroyGameRuleAck);
            Create<SRoomChangeMasterAckMessage>(GameRuleOpCode.SRoomChangeMasterAck);
            Create<SRoomChangeRefereeAckMessage>(GameRuleOpCode.SRoomChangeRefereeAck);
            Create<SSlaughterChangeSlaughterAckMessage>(GameRuleOpCode.SSlaughterChangeSlaughterAck);
            Create<SRoomReadyRoundAckMessage>(GameRuleOpCode.SRoomReadyRoundAck);
            Create<SRoomBeginRoundAckMessage>(GameRuleOpCode.SRoomBeginRoundAck);
            Create<SGameAvatarChangeAckMessage>(GameRuleOpCode.SGameAvatarChangeAck);
            Create<SRoomChangeRuleNotifyAckMessage>(GameRuleOpCode.SRoomChangeRuleNotifyAck);
            Create<SRoomChangeRuleAckMessage>(GameRuleOpCode.SRoomChangeRuleAck);
            Create<SRoomChangeRuleFailAckMessage>(GameRuleOpCode.SRoomChangeRuleFailAck);
            Create<SScoreMissionScoreAckMessage>(GameRuleOpCode.SScoreMissionScoreAck);
            Create<SScoreKillAckMessage>(GameRuleOpCode.SScoreKillAck);
            Create<SScoreKillAssistAckMessage>(GameRuleOpCode.SScoreKillAssistAck);
            Create<SScoreOffenseAckMessage>(GameRuleOpCode.SScoreOffenseAck);
            Create<SScoreOffenseAssistAckMessage>(GameRuleOpCode.SScoreOffenseAssistAck);
            Create<SScoreDefenseAckMessage>(GameRuleOpCode.SScoreDefenseAck);
            Create<SScoreDefenseAssistAckMessage>(GameRuleOpCode.SScoreDefenseAssistAck);
            Create<SScoreLeaderKillAckMessage>(GameRuleOpCode.SScoreLeaderKillAck);
            Create<SScoreHealAssistAckMessage>(GameRuleOpCode.SScoreHealAssistAck);
            Create<SScoreGoalAckMessage>(GameRuleOpCode.SScoreGoalAck);
            Create<SScoreGoalAssistAckMessage>(GameRuleOpCode.SScoreGoalAssistAck);
            Create<SScoreReboundAckMessage>(GameRuleOpCode.SScoreReboundAck);
            Create<SScoreSuicideAckMessage>(GameRuleOpCode.SScoreSuicideAck);
            Create<SScoreTeamKillAckMessage>(GameRuleOpCode.SScoreTeamKillAck);
            Create<SSlaughterRoundWinAckMessage>(GameRuleOpCode.SSlaughterRoundWinAck);
            Create<SSlaughterSLRoundWinAckMessage>(GameRuleOpCode.SSlaughterSLRoundWinAck);
            Create<SRoomChangeItemAckMessage>(GameRuleOpCode.SRoomChangeItemAck);
            Create<SRoomPlayModeChangeAckMessage>(GameRuleOpCode.SRoomPlayModeChangeAck);
            Create<SGameRefreshGameRuleInfoAckMessage>(GameRuleOpCode.SGameRefreshGameRuleInfoAck);
            Create<SArcadeScoreSyncAckMessage>(GameRuleOpCode.SArcadeScoreSyncAck);
            Create<SArcadeBeginRoundAckMessage>(GameRuleOpCode.SArcadeBeginRoundAck);
            Create<SArcadeStageBriefingAckMessage>(GameRuleOpCode.SArcadeStageBriefingAck);
            Create<SArcadeEnablePlayTimeAckMessage>(GameRuleOpCode.SArcadeEnablePlayTimeAck);
            Create<SArcadeStageInfoAckMessage>(GameRuleOpCode.SArcadeStageInfoAck);
            Create<SArcadeRespawnAckMessage>(GameRuleOpCode.SArcadeRespawnAck);
            Create<SArcadeDeathPlayerInfoAckMessage>(GameRuleOpCode.SArcadeDeathPlayerInfoAck);
            Create<SArcadeStageReadyAckMessage>(GameRuleOpCode.SArcadeStageReadyAck);
            Create<SArcadeRespawnFailAckMessage>(GameRuleOpCode.SArcadeRespawnFailAck);
            Create<SAdminChangeHPAckMessage>(GameRuleOpCode.SAdminChangeHPAck);
            Create<SAdminChangeMPAckMessage>(GameRuleOpCode.SAdminChangeMPAck);
            Create<SArcadeChangeStageAckMessage>(GameRuleOpCode.SArcadeChangeStageAck);
            Create<SArcadeStageSelectAckMessage>(GameRuleOpCode.SArcadeStageSelectAck);
            Create<SArcadeSavedateInfoAckMessage>(GameRuleOpCode.SArcadeSavedateInfoAck);
            Create<SSlaughterAttackPointAckMessage>(GameRuleOpCode.SSlaughterAttackPointAck);
            Create<SSlaughterHealPointAckMessage>(GameRuleOpCode.SSlaughterHealPointAck);
            Create<SSlaughterChangeBonusTargetAckMessage>(GameRuleOpCode.SSlaughterChangeBonusTargetAck);
            Create<SArcadeSucceedLoadingAckMessage>(GameRuleOpCode.SArcadeSucceedLoadingAck);
            Create<SMoneyUseCoinAckMessage>(GameRuleOpCode.SMoneyUseCoinAck);
            Create<SGameLuckyShotAckMessage>(GameRuleOpCode.SGameLuckyShotAck);
            Create<SFreeAllForChangeTheFirstAckMessage>(GameRuleOpCode.SFreeAllForChangeTheFirstAck);
            Create<SLogDevLogStartAckMessage>(GameRuleOpCode.SLogDevLogStartAck);
            Create<SGameKickOutRequestAckMessage>(GameRuleOpCode.SGameKickOutRequestAck);
            Create<SGameKickOutVoteResultAckMessage>(GameRuleOpCode.SGameKickOutVoteResultAck);
            Create<SGameKickOutStateAckMessage>(GameRuleOpCode.SGameKickOutStateAck);
            Create<SCaptainRoundCaptainLifeInfoAckMessage>(GameRuleOpCode.SCaptainRoundCaptainLifeInfoAck);
            Create<SCaptainSubRoundWinAckMessage>(GameRuleOpCode.SCaptainSubRoundWinAck);
            Create<SCaptainCurrentRoundInfoAckMessage>(GameRuleOpCode.SCaptainCurrentRoundInfoAck);
            Create<SSeizeUpdateInfoAckMessage>(GameRuleOpCode.SSeizeUpdateInfoAck);
            Create<SSeizeUpdateInfoByIntrudeAckMessage>(GameRuleOpCode.SSeizeUpdateInfoByIntrudeAck);
            Create<SSeizeFeverTimeAckMessage>(GameRuleOpCode.SSeizeFeverTimeAck);
            Create<SSeizeBuffItemGainReqMessage>(GameRuleOpCode.SSeizeBuffItemGainReq);
            Create<SSeizeDropBuffItemAckMessage>(GameRuleOpCode.SSeizeDropBuffItemAck);
            Create<SSeizeUpKeepScoreUpdateAckMessage>(GameRuleOpCode.SSeizeUpKeepScoreUpdateAck);
            Create<SSeizeUpKeepScoreGetAckMessage>(GameRuleOpCode.SSeizeUpKeepScoreGetAck);
            Create<SRoomChangeMasterRequestAckMessage>(GameRuleOpCode.SRoomChangeMasterRequestAck);
            Create<SRoomMixedTeamBriefingInfoAckMessage>(GameRuleOpCode.SRoomMixedTeamBriefingInfoAck);
            Create<SGameEquipCheckReqMessage>(GameRuleOpCode.SGameEquipCheckReq);
            Create<SRoomGameStartAckMessage>(GameRuleOpCode.SRoomGameStartAck);
            Create<SRoomGameLoadingAckMessage>(GameRuleOpCode.SRoomGameLoadingAck);
            Create<SGameTackUpdateAckMessage>(GameRuleOpCode.SGameTackUpdateAck);
            Create<SRoomGameEndLoadingAckMessage>(GameRuleOpCode.SRoomGameEndLoadingAck);
            Create<SRoomGamePlayCountDownAckMessage>(GameRuleOpCode.SRoomGamePlayCountDownAck);
            Create<SInGameItemDropAckMessage>(GameRuleOpCode.SInGameItemDropAck);
            Create<SInGameItemGetAckMessage>(GameRuleOpCode.SInGameItemGetAck);
            Create<SInGamePlayerResponseOfDeathAckMessage>(GameRuleOpCode.SInGamePlayerResponseOfDeathAck);
            Create<SChallengeRankersAckMessage>(GameRuleOpCode.SChallengeRankersAck);
            Create<SChallengeRankinglistAckMessage>(GameRuleOpCode.SChallengeRankinglistAck);
            Create<SPromotionCouponEventIngameGetAckMessage>(GameRuleOpCode.SPromotionCouponEventIngameGetAck);
            Create<SRoomEnterPlayerForBookNameTagsAckMessage>(GameRuleOpCode.SRoomEnterPlayerForBookNameTagsAck);
            Create<SRoomEnterPlayerInfoListForNameTagAckMessage>(GameRuleOpCode.SRoomEnterPlayerInfoListForNameTagAck);
            Create<SUseBurningBuffAckMessage>(GameRuleOpCode.SUseBurningBuffAck);
            Create<SRoomChangeRuleNotifyAck2Message>(GameRuleOpCode.SRoomChangeRuleNotifyAck2);
            Create<SRoomRandomRoomBeginActionAckMessage>(GameRuleOpCode.SRoomRandomRoomBeginActionAck);
            Create<SScoreAIKillAckMessage>(GameRuleOpCode.SScoreAIKillAck);
            Create<SScoreAIKillAssistAckMessage>(GameRuleOpCode.SScoreAIKillAssistAck);
            Create<SSyncArenaBattleIdxAckMessage>(GameRuleOpCode.SSyncArenaBattleIdxAck);
            Create<SSyncFirstArenaBattleIdxAckMessage>(GameRuleOpCode.SSyncFirstArenaBattleIdxAck);
            Create<SScoreArenaDrawPlayAckMessage>(GameRuleOpCode.SScoreArenaDrawPlayAck);
            Create<SArenaSetGameOptionAckMessage>(GameRuleOpCode.SArenaSetGameOptionAck);
            Create<SArenaSpecialPointAckMessage>(GameRuleOpCode.SArenaSpecialPointAck);
            Create<SScoreArenaBattlePlayerLeaveMessage>(GameRuleOpCode.SScoreArenaBattlePlayerLeave);
            Create<SArenaLeaderShowdownMessage>(GameRuleOpCode.SArenaLeaderShowdown);
            Create<SArenaDrawHealthPointReqMessage>(GameRuleOpCode.SArenaDrawHealthPointReq);
            Create<SArenaHalfTimeStatusMessage>(GameRuleOpCode.SArenaHalfTimeStatus);
            Create<SArenaNotIntrudePlayerMessage>(GameRuleOpCode.SArenaNotIntrudePlayer);

            // C2S
            Create<CRoomEnterPlayerReqMessage>(GameRuleOpCode.CRoomEnterPlayerReq);
            Create<CRoomLeaveRequestReqMessage>(GameRuleOpCode.CRoomLeaveRequestReq);
            Create<CRoomTeamChangeReqMessage>(GameRuleOpCode.CRoomTeamChangeReq);
            Create<CRoomAutoAssingTeamReqMessage>(GameRuleOpCode.CRoomAutoAssingTeamReq);
            Create<CRoomAutoMixingTeamReqMessage>(GameRuleOpCode.CRoomAutoMixingTeamReq);
            Create<CRoomChoiceTeamChangeReqMessage>(GameRuleOpCode.CRoomChoiceTeamChangeReq);
            Create<CGameEventMessageReqMessage>(GameRuleOpCode.CGameEventMessageReq);
            Create<CRoomReadyRoundReqMessage>(GameRuleOpCode.CRoomReadyRoundReq);
            Create<CRoomBeginRoundReqMessage>(GameRuleOpCode.CRoomBeginRoundReq);
            Create<CGameAvatarDurabilityDecreaseReqMessage>(GameRuleOpCode.CGameAvatarDurabilityDecreaseReq);
            Create<CGameAvatarChangeReqMessage>(GameRuleOpCode.CGameAvatarChangeReq);
            Create<CRoomChangeRuleNotifyReqMessage>(GameRuleOpCode.CRoomChangeRuleNotifyReq);
            Create<CScoreMissionScoreReqMessage>(GameRuleOpCode.CScoreMissionScoreReq);
            Create<CScoreKillReqMessage>(GameRuleOpCode.CScoreKillReq);
            Create<CScoreKillAssistReqMessage>(GameRuleOpCode.CScoreKillAssistReq);
            Create<CScoreOffenseReqMessage>(GameRuleOpCode.CScoreOffenseReq);
            Create<CScoreOffenseAssistReqMessage>(GameRuleOpCode.CScoreOffenseAssistReq);
            Create<CScoreDefenseReqMessage>(GameRuleOpCode.CScoreDefenseReq);
            Create<CScoreDefenseAssistReqMessage>(GameRuleOpCode.CScoreDefenseAssistReq);
            Create<CScoreHealAssistReqMessage>(GameRuleOpCode.CScoreHealAssistReq);
            Create<CScoreGoalReqMessage>(GameRuleOpCode.CScoreGoalReq);
            Create<CScoreReboundReqMessage>(GameRuleOpCode.CScoreReboundReq);
            Create<CScoreSuicideReqMessage>(GameRuleOpCode.CScoreSuicideReq);
            Create<CScoreTeamKillReqMessage>(GameRuleOpCode.CScoreTeamKillReq);
            Create<CRoomItemChangeReqMessage>(GameRuleOpCode.CRoomItemChangeReq);
            Create<CRoomPlayModeChangeReqMessage>(GameRuleOpCode.CRoomPlayModeChangeReq);
            Create<CArcadeScoreSyncReqMessage>(GameRuleOpCode.CArcadeScoreSyncReq);
            Create<CArcadeBeginRoundReqMessage>(GameRuleOpCode.CArcadeBeginRoundReq);
            Create<CArcadeStageClearReqMessage>(GameRuleOpCode.CArcadeStageClearReq);
            Create<CArcadeStageFailedReqMessage>(GameRuleOpCode.CArcadeStageFailedReq);
            Create<CArcadeStageInfoReqMessage>(GameRuleOpCode.CArcadeStageInfoReq);
            Create<CArcadeEnablePlayTimeReqMessage>(GameRuleOpCode.CArcadeEnablePlayTimeReq);
            Create<CArcardRespawnReqMessage>(GameRuleOpCode.CArcardRespawnReq);
            Create<CArcadeStageReadyReqMessage>(GameRuleOpCode.CArcadeStageReadyReq);
            Create<CArcadeStageSelectReqMessage>(GameRuleOpCode.CArcadeStageSelectReq);
            Create<CSlaughterAttackPointReqMessage>(GameRuleOpCode.CSlaughterAttackPointReq);
            Create<CSlaughterHealPointReqMessage>(GameRuleOpCode.CSlaughterHealPointReq);
            Create<CArcadeLoadingSuccessReqMessage>(GameRuleOpCode.CArcadeLoadingSuccessReq);
            Create<CMoneyUseCoinReqMessage>(GameRuleOpCode.CMoneyUseCoinReq);
            Create<CLogBeginResponseReqMessage>(GameRuleOpCode.CLogBeginResponseReq);
            Create<CLogWeaponFireReqMessage>(GameRuleOpCode.CLogWeaponFireReq);
            Create<CGameKickOutRequestReqMessage>(GameRuleOpCode.CGameKickOutRequestReq);
            Create<CGameKickOutVoteResultReqMessage>(GameRuleOpCode.CGameKickOutVoteResultReq);
            Create<CRoomIntrudeRoundReqMessage>(GameRuleOpCode.CRoomIntrudeRoundReq);
            Create<CGameLoadingSuccessReqMessage>(GameRuleOpCode.CGameLoadingSuccessReq);
            Create<CSeizePositionCaptureReqMessage>(GameRuleOpCode.CSeizePositionCaptureReq);
            Create<CSeizeBuffItemGainReqMessage>(GameRuleOpCode.CSeizeBuffItemGainReq);
            Create<CRoomChoiceMasterChangeReqMessage>(GameRuleOpCode.CRoomChoiceMasterChangeReq);
            Create<CGameEquipCheckAckMessage>(GameRuleOpCode.CGameEquipCheckAck);
            Create<CPromotionCointEventGetCoinReqMessage>(GameRuleOpCode.CPromotionCointEventGetCoinReq);
            Create<CInGameItemDropReqMessage>(GameRuleOpCode.CInGameItemDropReq);
            Create<CInGameItemGetReqMessage>(GameRuleOpCode.CInGameItemGetReq);
            Create<CInGamePlayerResponseReqMessage>(GameRuleOpCode.CInGamePlayerResponseReq);
            Create<CChallengeRankinglistReqMessage>(GameRuleOpCode.CChallengeRankinglistReq);
            Create<CChallengeResultReqMessage>(GameRuleOpCode.CChallengeResultReq);
            Create<CChallengeReStartReqMessage>(GameRuleOpCode.CChallengeReStartReq);
            Create<CPromotionCouponEventIngameGetReqMessage>(GameRuleOpCode.CPromotionCouponEventIngameGetReq);
            Create<CRecordBurningDataReqMessage>(GameRuleOpCode.CRecordBurningDataReq);
            Create<CRoomReadyRoundReq2Message>(GameRuleOpCode.CRoomReadyRoundReq2);
            Create<CRoomBeginRoundReq2Message>(GameRuleOpCode.CRoomBeginRoundReq2);
            Create<CRoomIntrudeRoundReq2Message>(GameRuleOpCode.CRoomIntrudeRoundReq2);
            Create<CUseBurningBuffReqMessage>(GameRuleOpCode.CUseBurningBuffReq);
            Create<CRoomChangeRuleNotifyReq2Message>(GameRuleOpCode.CRoomChangeRuleNotifyReq2);
            Create<CRoomRandomRoomBeginActionReqMessage>(GameRuleOpCode.CRoomRandomRoomBeginActionReq);
            Create<CScoreAIKillReqMessage>(GameRuleOpCode.CScoreAIKillReq);
            Create<CArenaSetGameOptionReqMessage>(GameRuleOpCode.CArenaSetGameOptionReq);
            Create<CArenaSpecialPointReqMessage>(GameRuleOpCode.CArenaSpecialPointReq);
            Create<CArenaDrawHealthPointAckMessage>(GameRuleOpCode.CArenaDrawHealthPointAck);
            //Create<CHackingClientKickoutReqMessage>(GameRuleOpCode.CHackingClientKickoutReq);
        }

        public static void Create<T>(GameRuleOpCode opCode)
            where T : GameRuleMessage, new()
        {
            var type = typeof(T);
            s_opCodeLookup.Add(type, opCode);
            s_typeLookup.Add(opCode, type);
        }

        public static GameRuleMessage GetMessage(GameRuleOpCode opCode, BinaryReader r)
        {
            var type = s_typeLookup.GetValueOrDefault(opCode);
            if (type == null)
                throw new NetsphereBadOpCodeException(opCode);

            return (GameRuleMessage)Serializer.Deserialize(r, type);
        }

        public static GameRuleOpCode GetOpCode<T>()
            where T : GameRuleMessage
        {
            return GetOpCode(typeof(T));
        }

        public static GameRuleOpCode GetOpCode(Type type)
        {
            return s_opCodeLookup[type];
        }
    }
}
