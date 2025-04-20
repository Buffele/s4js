using System;
using BlubLib.Serialization;
using BlubLib.Serialization.Serializers;
using Netsphere.Network.Data.GameRule;
using Netsphere.Network.Serializers;
using ProudNet.Serializers;

namespace Netsphere.Network.Message.GameRule
{
    [BlubContract]
    public class SRoomEnterPlayerAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public byte Unk1 { get; set; } // 0 = char does not spawn

        [BlubMember(2)]
        public PlayerGameMode PlayerGameMode { get; set; }

        [BlubMember(3)]
        public int Unk3 { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string Nickname { get; set; }

        public SRoomEnterPlayerAckMessage()
        {
            Nickname = "";
        }

        public SRoomEnterPlayerAckMessage(ulong accountId, string nickname, byte unk1, PlayerGameMode mode, int unk3)
        {
            AccountId = accountId;
            Unk1 = unk1;
            PlayerGameMode = mode;
            Unk3 = unk3;
            Nickname = nickname;
        }
    }

    [BlubContract]
    public class SRoomLeavePlayerAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public RoomLeaveReason Reason { get; set; }

        public SRoomLeavePlayerAckMessage()
        {
            Name = "";
        }

        public SRoomLeavePlayerAckMessage(ulong accountId, string name, RoomLeaveReason reason)
        {
            AccountId = accountId;
            Name = name;
            Reason = reason;
        }
    }

    [BlubContract]
    public class SRoomLeaveRequestAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; } // Result?
    }

    [BlubContract]
    public class SRoomChangeTeamAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public Team Team { get; set; }

        [BlubMember(2)]
        public PlayerGameMode Mode { get; set; }

        public SRoomChangeTeamAckMessage()
        { }

        public SRoomChangeTeamAckMessage(ulong accountId, Team team, PlayerGameMode mode)
        {
            AccountId = accountId;
            Team = team;
            Mode = mode;
        }
    }

    [BlubContract]
    public class SRoomChangeTeamFailAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ChangeTeamResult Result { get; set; }

        public SRoomChangeTeamFailAckMessage()
        { }

        public SRoomChangeTeamFailAckMessage(ChangeTeamResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SRoomChoiceTeamChangeAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong Unk1 { get; set; }

        [BlubMember(1)]
        public ulong Unk2 { get; set; }

        [BlubMember(2)]
        public byte Unk3 { get; set; }

        [BlubMember(3)]
        public byte Unk4 { get; set; }

    }

    [BlubContract]
    public class SRoomChoiceTeamChangeFailAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Result { get; set; }
    }

    [BlubContract]
    public class SGameEventMessageAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public GameEventMessage Event { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2)]
        public uint Unk { get; set; } // server/game time or something like that

        [BlubMember(3)]
        public ushort Value { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string String { get; set; }

        public SGameEventMessageAckMessage()
        {
            String = "";
        }

        public SGameEventMessageAckMessage(GameEventMessage @event, ulong accountId, uint unk, ushort value, string @string)
        {
            Event = @event;
            AccountId = accountId;
            Unk = unk;
            Value = value;
            String = @string;
        }
    }

    [BlubContract]
    public class SGameBriefingInfoAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public bool IsResult { get; set; }

        [BlubMember(1)]
        public bool IsEvent { get; set; }

        [BlubMember(2, typeof(ArrayWithScalarSerializer))]
        public byte[] Data { get; set; }

        public SGameBriefingInfoAckMessage()
        {
            Data = Array.Empty<byte>();
        }

        public SGameBriefingInfoAckMessage(bool isResult, bool isEvent, byte[] data)
        {
            IsResult = isResult;
            IsEvent = isEvent;
            Data = data;
        }
    }

    [BlubContract]
    public class SGameChangeStateAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public GameState State { get; set; }

        public SGameChangeStateAckMessage()
        { }

        public SGameChangeStateAckMessage(GameState state)
        {
            State = state;
        }
    }

    [BlubContract]
    public class SGameChangeSubStateAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public GameTimeState State { get; set; }

        public SGameChangeSubStateAckMessage()
        { }

        public SGameChangeSubStateAckMessage(GameTimeState state)
        {
            State = state;
        }
    }

    [BlubContract]
    public class SGameDestroyGameRuleAckMessage : GameRuleMessage
    { }

    [BlubContract]
    public class SRoomChangeMasterAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        public SRoomChangeMasterAckMessage()
        { }

        public SRoomChangeMasterAckMessage(ulong accountId)
        {
            AccountId = accountId;
        }
    }

    [BlubContract]
    public class SRoomChangeRefereeAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        public SRoomChangeRefereeAckMessage()
        { }

        public SRoomChangeRefereeAckMessage(ulong accountId)
        {
            AccountId = accountId;
        }
    }

    [BlubContract]
    public class SSlaughterChangeSlaughterAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(ArrayWithIntPrefixSerializer))]
        public ulong[] Unk { get; set; }

        public SSlaughterChangeSlaughterAckMessage()
        {
            Unk = Array.Empty<ulong>();
        }

        public SSlaughterChangeSlaughterAckMessage(ulong accountId)
        {
            AccountId = accountId;
            Unk = Array.Empty<ulong>();
        }

        public SSlaughterChangeSlaughterAckMessage(ulong accountId, ulong[] unk)
        {
            AccountId = accountId;
            Unk = unk;
        }
    }

    [BlubContract]
    public class SRoomReadyRoundAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public bool IsReady { get; set; }

        [BlubMember(2)]
        public byte Result { get; set; }

        public SRoomReadyRoundAckMessage()
        { }

        public SRoomReadyRoundAckMessage(ulong accountId, bool isReady)
        {
            AccountId = accountId;
            IsReady = isReady;
            Result = 0;
        }
    }

    [BlubContract]
    public class SRoomBeginRoundAckMessage : GameRuleMessage
    { }

    [BlubContract]
    public class SGameAvatarChangeAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ChangeAvatarUnk1Dto Unk1 { get; set; }

        [BlubMember(1, typeof(ArrayWithIntPrefixSerializer))]
        public ChangeAvatarUnk2Dto[] Unk2 { get; set; }

        public SGameAvatarChangeAckMessage()
        {
            Unk1 = new ChangeAvatarUnk1Dto();
            Unk2 = Array.Empty<ChangeAvatarUnk2Dto>();
        }

        public SGameAvatarChangeAckMessage(ChangeAvatarUnk1Dto unk1, ChangeAvatarUnk2Dto[] unk2)
        {
            Unk1 = unk1;
            Unk2 = unk2;
        }
    }

    [BlubContract]
    public class SRoomChangeRuleNotifyAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public RoomDto Room { get; set; }

        public SRoomChangeRuleNotifyAckMessage()
        {
            Room = new RoomDto();
        }

        public SRoomChangeRuleNotifyAckMessage(RoomDto room)
        {
            Room = room;
        }
    }

    [BlubContract]
    public class SRoomChangeRuleAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public RoomDto Room { get; set; }

        public SRoomChangeRuleAckMessage()
        {
            Room = new RoomDto();
        }

        public SRoomChangeRuleAckMessage(RoomDto room)
        {
            Room = room;
        }
    }

    [BlubContract]
    public class SRoomChangeRuleFailAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Result { get; set; }
    }

    [BlubContract]
    public class SScoreMissionScoreAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public int Unk { get; set; }

        public SScoreMissionScoreAckMessage()
        { }

        public SScoreMissionScoreAckMessage(ulong accountId, int unk)
        {
            AccountId = accountId;
            Unk = unk;
        }
    }

    [BlubContract]
    public class SScoreKillAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreDto Score { get; set; }

        public SScoreKillAckMessage()
        {
            Score = new ScoreDto();
        }

        public SScoreKillAckMessage(ScoreDto score)
        {
            Score = score;
        }
    }

    [BlubContract]
    public class SScoreKillAssistAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreAssistDto Score { get; set; }

        public SScoreKillAssistAckMessage()
        {
            Score = new ScoreAssistDto();
        }

        public SScoreKillAssistAckMessage(ScoreAssistDto score)
        {
            Score = score;
        }
    }

    [BlubContract]
    public class SScoreOffenseAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreDto Score { get; set; }

        public SScoreOffenseAckMessage()
        {
            Score = new ScoreDto();
        }

        public SScoreOffenseAckMessage(ScoreDto score)
        {
            Score = score;
        }
    }

    [BlubContract]
    public class SScoreOffenseAssistAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreAssistDto Score { get; set; }

        public SScoreOffenseAssistAckMessage()
        {
            Score = new ScoreAssistDto();
        }

        public SScoreOffenseAssistAckMessage(ScoreAssistDto score)
        {
            Score = score;
        }
    }

    [BlubContract]
    public class SScoreDefenseAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreDto Score { get; set; }

        public SScoreDefenseAckMessage()
        {
            Score = new ScoreDto();
        }

        public SScoreDefenseAckMessage(ScoreDto score)
        {
            Score = score;
        }
    }

    [BlubContract]
    public class SScoreDefenseAssistAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ScoreAssistDto Score { get; set; }

        public SScoreDefenseAssistAckMessage()
        {
            Score = new ScoreAssistDto();
        }

        public SScoreDefenseAssistAckMessage(ScoreAssistDto score)
        {
            Score = score;
        }
    }

    [BlubContract]
    public class SScoreLeaderKillAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SScoreHealAssistAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public LongPeerId Id { get; set; }

        public SScoreHealAssistAckMessage()
        {
            Id = 0;
        }

        public SScoreHealAssistAckMessage(LongPeerId id)
        {
            Id = id;
        }
    }

    [BlubContract]
    public class SScoreGoalAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public LongPeerId Id { get; set; }

        public SScoreGoalAckMessage()
        {
            Id = 0;
        }

        public SScoreGoalAckMessage(LongPeerId id)
        {
            Id = id;
        }
    }

    [BlubContract]
    public class SScoreGoalAssistAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public LongPeerId Id { get; set; }

        [BlubMember(1)]
        public LongPeerId Assist { get; set; }

        public SScoreGoalAssistAckMessage()
        {
            Id = 0;
            Assist = 0;
        }

        public SScoreGoalAssistAckMessage(LongPeerId id, LongPeerId assist)
        {
            Id = id;
            Assist = assist;
        }
    }

    [BlubContract]
    public class SScoreReboundAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public LongPeerId NewId { get; set; }

        [BlubMember(1)]
        public LongPeerId OldId { get; set; }

        public SScoreReboundAckMessage()
        {
            NewId = 0;
            OldId = 0;
        }

        public SScoreReboundAckMessage(LongPeerId newId, LongPeerId oldId)
        {
            NewId = newId;
            OldId = oldId;
        }
    }

    [BlubContract]
    public class SScoreSuicideAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public LongPeerId Id { get; set; }

        [BlubMember(1, typeof(EnumSerializer), typeof(uint))]
        public AttackAttribute Icon { get; set; }

        public SScoreSuicideAckMessage()
        {
            Id = 0;
        }

        public SScoreSuicideAckMessage(LongPeerId id, AttackAttribute icon)
        {
            Id = id;
            Icon = icon;
        }
    }

    [BlubContract]
    public class SScoreTeamKillAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public Score2Dto Score { get; set; }

        public SScoreTeamKillAckMessage()
        {
            Score = new Score2Dto();
        }

        public SScoreTeamKillAckMessage(Score2Dto score)
        {
            Score = score;
        }
    }

    [BlubContract]
    public class SSlaughterRoundWinAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; } // type or team | 1, 2

        public SSlaughterRoundWinAckMessage()
        { }

        public SSlaughterRoundWinAckMessage(byte unk)
        {
            Unk = unk;
        }
    }

    [BlubContract]
    public class SSlaughterSLRoundWinAckMessage : GameRuleMessage
    { }

    [BlubContract]
    public class SRoomChangeItemAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ChangeItemsUnkDto Unk1 { get; set; }

        [BlubMember(1, typeof(ArrayWithIntPrefixSerializer))]
        public ChangeAvatarUnk2Dto[] Unk2 { get; set; }

        public SRoomChangeItemAckMessage()
        {
            Unk1 = new ChangeItemsUnkDto();
            Unk2 = Array.Empty<ChangeAvatarUnk2Dto>();
        }

        public SRoomChangeItemAckMessage(ChangeItemsUnkDto unk1, ChangeAvatarUnk2Dto[] unk2)
        {
            Unk1 = unk1;
            Unk2 = unk2;
        }
    }

    [BlubContract]
    public class SRoomPlayModeChangeAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public PlayerGameMode Mode { get; set; }

        public SRoomPlayModeChangeAckMessage()
        { }

        public SRoomPlayModeChangeAckMessage(ulong accountId, PlayerGameMode mode)
        {
            AccountId = accountId;
            Mode = mode;
        }
    }

    [BlubContract]
    public class SGameRefreshGameRuleInfoAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public GameState State { get; set; }

        [BlubMember(1)]
        public GameTimeState SubState { get; set; }

        [BlubMember(2)]
        public uint TimePassed { get; set; }

        public SGameRefreshGameRuleInfoAckMessage()
        {

        }

        public SGameRefreshGameRuleInfoAckMessage(GameState state, GameTimeState subState, uint timePassed)
        {
            State = state;
            SubState = subState;
            TimePassed = timePassed;
        }
    }

    [BlubContract]
    public class SArcadeScoreSyncAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ArcadeScoreSyncDto[] Scores { get; set; }

        public SArcadeScoreSyncAckMessage()
        {
            Scores = Array.Empty<ArcadeScoreSyncDto>();
        }
    }

    [BlubContract]
    public class SArcadeBeginRoundAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk1 { get; set; }

        [BlubMember(1)]
        public byte Unk2 { get; set; }
    }

    [BlubContract]
    public class SArcadeStageBriefingAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk1 { get; set; }

        [BlubMember(1)]
        public byte Unk2 { get; set; }

        [BlubMember(2, typeof(ArrayWithScalarSerializer))]
        public byte[] Data { get; set; } // ToDo

        public SArcadeStageBriefingAckMessage()
        {
            Data = Array.Empty<byte>();
        }
    }

    [BlubContract]
    public class SArcadeEnablePlayTimeAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; }
    }

    [BlubContract]
    public class SArcadeStageInfoAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk1 { get; set; }

        [BlubMember(1)]
        public int Unk2 { get; set; }
    }

    [BlubContract]
    public class SArcadeRespawnAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public int Unk { get; set; }
    }

    [BlubContract]
    public class SArcadeDeathPlayerInfoAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; }

        [BlubMember(1, typeof(ArrayWithIntPrefixSerializer))]
        public ulong[] Players { get; set; }

        public SArcadeDeathPlayerInfoAckMessage()
        {
            Players = Array.Empty<ulong>();
        }
    }

    [BlubContract]
    public class SArcadeStageReadyAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class SArcadeRespawnFailAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }
    }

    [BlubContract]
    public class SAdminChangeHPAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public float Value { get; set; }
    }

    [BlubContract]
    public class SAdminChangeMPAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public float Value { get; set; }
    }

    [BlubContract]
    public class SArcadeChangeStageAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Stage { get; set; }
    }

    [BlubContract]
    public class SArcadeStageSelectAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk1 { get; set; }

        [BlubMember(1)]
        public byte Unk2 { get; set; }
    }

    [BlubContract]
    public class SArcadeSavedateInfoAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; }
    }

    [BlubContract]
    public class SSlaughterAttackPointAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public float Unk1 { get; set; }

        [BlubMember(2)]
        public float Unk2 { get; set; }
    }

    [BlubContract]
    public class SSlaughterHealPointAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public float Unk { get; set; }
    }

    [BlubContract]
    public class SSlaughterChangeBonusTargetAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        public SSlaughterChangeBonusTargetAckMessage()
        { }

        public SSlaughterChangeBonusTargetAckMessage(ulong accountId)
        {
            AccountId = accountId;
        }
    }

    [BlubContract]
    public class SArcadeSucceedLoadingAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class SMoneyUseCoinAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public uint CoinId { get; set; }

        [BlubMember(2)]
        public uint Unk1 { get; set; }

        [BlubMember(3)]
        public uint Unk2 { get; set; }

        [BlubMember(4)]
        public byte Unk3 { get; set; }
    }

    [BlubContract]
    public class SGameLuckyShotAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Type { get; set; }

        [BlubMember(1)]
        public uint Value1 { get; set; }

        [BlubMember(2)]
        public uint Value2 { get; set; }
    }

    [BlubContract]
    public class SFreeAllForChangeTheFirstAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        public SFreeAllForChangeTheFirstAckMessage()
        { }

        public SFreeAllForChangeTheFirstAckMessage(ulong accountId)
        {
            AccountId = accountId;
        }
    }

    [BlubContract]
    public class SLogDevLogStartAckMessage : GameRuleMessage
    { }

    [BlubContract]
    public class SGameKickOutRequestAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }
    }

    [BlubContract]
    public class SGameKickOutVoteResultAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SGameKickOutStateAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint YVotes { get; set; }

        [BlubMember(1)]
        public uint NVotes { get; set; }

        [BlubMember(2)]
        public uint TotalVoters { get; set; }

        [BlubMember(3)]
        public byte Reason { get; set; }

        [BlubMember(4)]
        public ulong StartPlayerId { get; set; }

        [BlubMember(5)]
        public ulong KickPlayerId { get; set; }
    }

    [BlubContract]
    public class SCaptainRoundCaptainLifeInfoAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public CaptainLifeDto[] Players { get; set; }

        public SCaptainRoundCaptainLifeInfoAckMessage()
        {
            Players = Array.Empty<CaptainLifeDto>();
        }
    }

    [BlubContract]
    public class SCaptainSubRoundWinAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public int Unk1 { get; set; }

        [BlubMember(1)]
        public byte Unk2 { get; set; }
    }

    [BlubContract]
    public class SCaptainCurrentRoundInfoAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public int Unk1 { get; set; }

        [BlubMember(1)]
        public int Unk2 { get; set; }
    }

    [BlubContract]
    public class SSeizeUpdateInfoAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SSeizeUpdateInfoByIntrudeAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SSeizeFeverTimeAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SSeizeBuffItemGainReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SSeizeDropBuffItemAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SSeizeUpKeepScoreUpdateAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SSeizeUpKeepScoreGetAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomChangeMasterRequestAckMessage : GameRuleMessage
    { }

    [BlubContract]
    public class SRoomMixedTeamBriefingInfoAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public byte Result { get; set; }

        [BlubMember(1, typeof(ArrayWithIntPrefixSerializer))]
        public MixedTeamDto[] Players { get; set; }

        public SRoomMixedTeamBriefingInfoAckMessage()
        {
            Players = Array.Empty<MixedTeamDto>();
        }

        public SRoomMixedTeamBriefingInfoAckMessage(byte result)
        {
            Result = result;
        }

        public SRoomMixedTeamBriefingInfoAckMessage(byte result, MixedTeamDto[] players)
        {
            Result = result;
            Players = players;
        }
    }

    [BlubContract]
    public class SGameEquipCheckReqMessage : GameRuleMessage
    { }

    [BlubContract]
    public class SRoomGameStartAckMessage : GameRuleMessage
    { }

    [BlubContract]
    public class SRoomGameLoadingAckMessage : GameRuleMessage
    { }

    [BlubContract]
    public class SGameTackUpdateAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomGameEndLoadingAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class SRoomGamePlayCountDownAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Unk { get; set; } // 3500
    }

    [BlubContract]
    public class SInGameItemDropAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SInGameItemGetAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public ulong Unk { get; set; }
    }

    [BlubContract]
    public class SInGamePlayerResponseOfDeathAckMessage : GameRuleMessage
    { }

    [BlubContract]
    public class SChallengeRankersAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint MissionId { get; set; }

        [BlubMember(1, typeof(ArrayWithIntPrefixSerializer))]
        public ChallengeRankDto[] Ranks { get; set; }

        public SChallengeRankersAckMessage()
        {
            Ranks = Array.Empty<ChallengeRankDto>();
        }

        public SChallengeRankersAckMessage(uint missionId, ChallengeRankDto[] ranks)
        {
            MissionId = missionId;
            Ranks = ranks;
        }
    }

    [BlubContract]
    public class SChallengeRankinglistAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionCouponEventIngameGetAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomEnterPlayerForBookNameTagsAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public Team Team { get; set; }

        [BlubMember(2)]
        public byte Unk1 { get; set; } // gameMode?

        [BlubMember(3)]
        public uint EXP { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(5)]
        public byte Unk2 { get; set; }

        [BlubMember(6)]
        public uint Unk3 { get; set; }

        public SRoomEnterPlayerForBookNameTagsAckMessage()
        {
            Name = "";
        }

        public SRoomEnterPlayerForBookNameTagsAckMessage(ulong accountId, Team team, byte unk1, uint exp, string name, byte unk2, uint unk3)
        {
            AccountId = accountId;
            Team = team;
            Unk1 = Unk1;
            EXP = exp;
            Name = name;
            Unk2 = unk2;
            Unk3 = unk3;
        }
    }

    [BlubContract]
    public class SRoomEnterPlayerInfoListForNameTagAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public PlayerNameTag[] Players { get; set; }

        public SRoomEnterPlayerInfoListForNameTagAckMessage()
        {
            Players = Array.Empty<PlayerNameTag>();
        }

        public SRoomEnterPlayerInfoListForNameTagAckMessage(PlayerNameTag[] players)
        {
            Players = players;
        }
    }

    [BlubContract]
    public class SUseBurningBuffAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomChangeRuleNotifyAck2Message : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomRandomRoomBeginActionAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SScoreAIKillAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SScoreAIKillAssistAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SSyncArenaBattleIdxAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Round { get; set; }

        [BlubMember(1)]
        public ulong Unk1 { get; set; }

        [BlubMember(2)]
        public ulong AlphaAccountId { get; set; }

        [BlubMember(3)]
        public ulong Unk2 { get; set; }

        [BlubMember(4)]
        public ulong BetaAccountId { get; set; }
    }

    [BlubContract]
    public class SSyncFirstArenaBattleIdxAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Unk1 { get; set; }

        [BlubMember(1)]
        public ulong AlphaAccountId { get; set; }

        [BlubMember(2)]
        public uint Unk2 { get; set; }

        [BlubMember(3)]
        public ulong BetaAccountId { get; set; }
    }

    [BlubContract]
    public class SScoreArenaDrawPlayAckMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SArenaSetGameOptionAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Options { get; set; } // Settings
    }

    [BlubContract]
    public class SArenaSpecialPointAckMessage : GameRuleMessage
    {
        [BlubMember(0)]
        public uint Round { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2)]
        public uint Event { get; set; }
    }

    [BlubContract]
    public class SScoreArenaBattlePlayerLeaveMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SArenaLeaderShowdownMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SArenaDrawHealthPointReqMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SArenaHalfTimeStatusMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SArenaNotIntrudePlayerMessage : GameRuleMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }
}
