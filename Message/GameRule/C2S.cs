using System;
using BlubLib.Serialization;
using Netsphere.Network.Data.GameRule;
using Netsphere.Network.Serializers;
using ProudNet.Serializers;

namespace Netsphere.Network.Message.GameRule
{
    [BlubContract]
    public class CRoomEnterPlayerReqMessage : GameRuleMessage
    { }

    [BlubContract]
    public class CRoomLeaveRequestReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public RoomLeaveReason Reason { get; set; }
    }

    [BlubContract]
    public class CRoomTeamChangeReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public Team Team { get; set; }

        [BlubMember(1)]
        public PlayerGameMode Mode { get; set; } // Not sure...
    }

    [BlubContract]
    public class CRoomAutoAssingTeamReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; }
    }

    [BlubContract]
    public class CRoomAutoMixingTeamReqMessage : GameRuleMessage
    { }

    [BlubContract]
    public class CRoomChoiceTeamChangeReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CGameEventMessageReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public GameEventMessage Event { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2)]
        public uint Unk1 { get; set; } // server/game time or something like that

        [BlubMember(3)]
        public ushort Value { get; set; }

        [BlubMember(4)]
        public uint Unk2 { get; set; }
    }

    [BlubContract]
    public class CRoomReadyRoundReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRoomBeginRoundReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CGameAvatarDurabilityDecreaseReqMessage : GameRuleMessage
    { }

    [BlubContract]
    public class CGameAvatarChangeReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ChangeAvatarUnk1Dto Unk1 { get; set; }

        [BlubMember(1, typeof(ArrayWithIntPrefixSerializer))]
        public ChangeAvatarUnk2Dto[] Unk2 { get; set; }

        public CGameAvatarChangeReqMessage()
        {
            Unk1 = new ChangeAvatarUnk1Dto();
            Unk2 = Array.Empty<ChangeAvatarUnk2Dto>();
        }
    }

    [BlubContract]
    public class CRoomChangeRuleNotifyReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public RoomDto Options { get; set; }

        public CRoomChangeRuleNotifyReqMessage()
        {
            Options = new RoomDto();
        }
    }

    [BlubContract]
    public class CScoreMissionScoreReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public int Unk { get; set; }
    }

    [BlubContract]
    public class CScoreKillReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreDto Score { get; set; }
    }

    [BlubContract]
    public class CScoreKillAssistReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreAssist2Dto Score { get; set; }
    }

    [BlubContract]
    public class CScoreOffenseReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public Score2Dto Score { get; set; }
    }

    [BlubContract]
    public class CScoreOffenseAssistReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreAssist2Dto Score { get; set; }
    }

    [BlubContract]
    public class CScoreDefenseReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public Score2Dto Score { get; set; }
    }

    [BlubContract]
    public class CScoreDefenseAssistReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreAssist2Dto Score { get; set; }
    }

    [BlubContract]
    public class CScoreHealAssistReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public LongPeerId Id { get; set; }
    }

    [BlubContract]
    public class CScoreGoalReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public LongPeerId PeerId { get; set; }
    }

    [BlubContract]
    public class CScoreReboundReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public LongPeerId NewId { get; set; }

        [BlubMember(1)]
        public LongPeerId OldId { get; set; }
    }

    [BlubContract]
    public class CScoreSuicideReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public LongPeerId Id { get; set; }

        [BlubMember(1)]
        public uint Icon { get; set; } // WeaponId ?
    }

    [BlubContract]
    public class CScoreTeamKillReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public Score2Dto Score { get; set; }
    }

    [BlubContract]
    public class CRoomItemChangeReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ChangeItemsUnkDto Unk1 { get; set; }

        [BlubMember(1, typeof(ArrayWithIntPrefixSerializer))]
        public ChangeAvatarUnk2Dto[] Unk2 { get; set; }
    }

    [BlubContract]
    public class CRoomPlayModeChangeReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public PlayerGameMode Mode { get; set; }
    }

    [BlubContract]
    public class CArcadeScoreSyncReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ArcadeScoreSyncReqDto[] Scores { get; set; }
    }

    [BlubContract]
    public class CArcadeBeginRoundReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk1 { get; set; }

        [BlubMember(1)]
        public byte Unk2 { get; set; }
    }

    [BlubContract]
    public class CArcadeStageClearReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ArcadeScoreSyncReqDto[] Scores { get; set; }
    }

    [BlubContract]
    public class CArcadeStageFailedReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ArcadeScoreSyncReqDto[] Scores { get; set; }
    }

    [BlubContract]
    public class CArcadeStageInfoReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk1 { get; set; }

        [BlubMember(1)]
        public int Unk2 { get; set; }
    }

    [BlubContract]
    public class CArcadeEnablePlayTimeReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; }
    }

    [BlubContract]
    public class CArcardRespawnReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk1 { get; set; }

        [BlubMember(1)]
        public int Unk2 { get; set; }
    }

    [BlubContract]
    public class CArcadeStageReadyReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk1 { get; set; }

        [BlubMember(1)]
        public int Unk2 { get; set; }
    }

    [BlubContract]
    public class CArcadeStageSelectReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk1 { get; set; }

        [BlubMember(1)]
        public byte Unk2 { get; set; }
    }

    [BlubContract]
    public class CSlaughterAttackPointReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public float Unk1 { get; set; }

        [BlubMember(2)]
        public float Unk2 { get; set; }
    }

    [BlubContract]
    public class CSlaughterHealPointReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public float Unk { get; set; }
    }

    [BlubContract]
    public class CArcadeLoadingSuccessReqMessage : GameRuleMessage
    { }

    [BlubContract]
    public class CMoneyUseCoinReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint CoinId { get; set; }
    }

    [BlubContract]
    public class CLogBeginResponseReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class CLogWeaponFireReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong Unk1 { get; set; }

        [BlubMember(1)]
        public float Unk2 { get; set; }

        [BlubMember(2)]
        public int Unk3 { get; set; }

        [BlubMember(3)]
        public ulong Unk4 { get; set; }
    }

    [BlubContract]
    public class CGameKickOutRequestReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong StartPlayerId { get; set; }

        [BlubMember(1)]
        public ulong KickPlayerId { get; set; }

        [BlubMember(2)]
        public byte Reason { get; set; }
    }

    [BlubContract]
    public class CGameKickOutVoteResultReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRoomIntrudeRoundReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CGameLoadingSuccessReqMessage : GameRuleMessage
    { }

    [BlubContract]
    public class CSeizePositionCaptureReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint CoreId { get; set; }

        [BlubMember(1)]
        public byte Capturing { get; set; }

        [BlubMember(2)]
        public uint Unk { get; set; } // Team?
    }

    [BlubContract]
    public class CSeizeBuffItemGainReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRoomChoiceMasterChangeReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class CGameEquipCheckAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public CharacterDto Character { get; set; }
    }

    [BlubContract]
    public class CPromotionCointEventGetCoinReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CInGameItemDropReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CInGameItemGetReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CInGamePlayerResponseReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CChallengeRankinglistReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CChallengeResultReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CChallengeReStartReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CPromotionCouponEventIngameGetReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRecordBurningDataReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRoomReadyRoundReq2Message : GameRuleMessage
    {
        [BlubMember(0)]
        public bool IsReady { get; set; }

        [BlubMember(1)]
        public CharacterDto Character { get; set; }
    }

    [BlubContract]
    public class CRoomBeginRoundReq2Message : GameRuleMessage
    {
        [BlubMember(0)]
        public bool IsReady { get; set; }

        [BlubMember(1)]
        public CharacterDto Character { get; set; }
    }

    [BlubContract]
    public class CRoomIntrudeRoundReq2Message : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }

        // TODO: Not sure...
        //[BlubMember(1)]
        //public CharacterDto Character { get; set; }
    }

    [BlubContract]
    public class CUseBurningBuffReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRoomChangeRuleNotifyReq2Message : GameRuleMessage
    {
        [BlubMember(0)]
        public Room2Dto Options { get; set; }
    }

    [BlubContract]
    public class CRoomRandomRoomBeginActionReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CScoreAIKillReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CArenaSetGameOptionReqMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Options { get; set; }
    }

    [BlubContract]
    public class CArenaSpecialPointReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CArenaDrawHealthPointAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CHackingClientKickoutReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }
}
