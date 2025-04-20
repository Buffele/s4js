using BlubLib.Serialization;
using Netsphere.Network.Data.GameClub;
using ProudNet.Serialization.Serializers;

namespace Netsphere.Network.Message.GameClub
{
    [BlubContract]
    public class SClubCreateAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubCreateResult Result { get; set; }

        public SClubCreateAckMessage()
        { }

        public SClubCreateAckMessage(ClubCreateResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubCloseAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubCloseResult Result { get; set; }

        public SClubCloseAckMessage()
        { }

        public SClubCloseAckMessage(ClubCloseResult result)
        {
            Result = result;
        }
    }

    // TODO...
    [BlubContract]
    public class SClubJoinAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubUnjoinAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubUnjoinResult Result { get; set; }

        public SClubUnjoinAckMessage()
        { }

        public SClubUnjoinAckMessage(ClubUnjoinResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubNameCheckAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubNameCheckResult Result { get; set; }

        public SClubNameCheckAckMessage()
        { }

        public SClubNameCheckAckMessage(ClubNameCheckResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubRestoreAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubRestoreResult Result { get; set; }

        public SClubRestoreAckMessage()
        { }

        public SClubRestoreAckMessage(ClubRestoreResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubAdminInviteAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubAdminInviteResult Result { get; set; }

        public SClubAdminInviteAckMessage()
        { }

        public SClubAdminInviteAckMessage(ClubAdminInviteResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubAdminJoinCommandAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubAdminJoinCommandResult Result { get; set; }

        [BlubMember(1)]
        public uint Unk { get; set; }

        public SClubAdminJoinCommandAckMessage()
        { }

        public SClubAdminJoinCommandAckMessage(ClubAdminJoinCommandResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubAdminGradeChangeAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubAdminGradeChangeResult Result { get; set; }

        [BlubMember(1)]
        public uint Unk { get; set; }

        public SClubAdminGradeChangeAckMessage()
        { }

        public SClubAdminGradeChangeAckMessage(ClubAdminGradeChangeResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubAdminNoticeChangeAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubAdminNoticeChangeResult Result { get; set; }

        public SClubAdminNoticeChangeAckMessage()
        { }

        public SClubAdminNoticeChangeAckMessage(ClubAdminNoticeChangeResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubAdminInfoModifyAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubAdminInfoModifyResult Result { get; set; }

        public SClubAdminInfoModifyAckMessage()
        { }

        public SClubAdminInfoModifyAckMessage(ClubAdminInfoModifyResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubAdminSubMasterAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubAdminSubMasterResult Result { get; set; }

        public SClubAdminSubMasterAckMessage()
        { }

        public SClubAdminSubMasterAckMessage(ClubAdminSubMasterResult result)
        {
            Result = result;
        }
    }

    // TODO...
    [BlubContract]
    public class SClubAdminSubMasterCancelAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; } // TODO: Result?
    }

    [BlubContract]
    public class SClubAdminMasterChangeAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubAdminMasterChangeResult Result { get; set; }

        public SClubAdminMasterChangeAckMessage()
        { }

        public SClubAdminMasterChangeAckMessage(ClubAdminMasterChangeResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubAdminJoinConditionModifyAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubAdminJoinConditionModifyResult Result { get; set; }

        public SClubAdminJoinConditionModifyAckMessage()
        { }

        public SClubAdminJoinConditionModifyAckMessage(ClubAdminJoinConditionModifyResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubAdminBoardModifyAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubAdminBoardModifyResult Result { get; set; }

        public SClubAdminBoardModifyAckMessage()
        { }

        public SClubAdminBoardModifyAckMessage(ClubAdminBoardModifyResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubSearchAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClansFound { get; set; }

        [BlubMember(1, typeof(ArrayWithScalarSerializer))]
        public ClanDto[] Clans { get; set; }
    }

    [BlubContract]
    public class SClubInfoAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint Id { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string MarkId { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Master { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string CreationDate { get; set; }

        [BlubMember(5)]
        public ActivityArea ActivityArea { get; set; }

        [BlubMember(6)]
        public ActivityPurpose ActivityPurpose { get; set; }

        [BlubMember(7)]
        public uint Wins { get; set; }

        [BlubMember(8)]
        public uint Loses { get; set; }

        [BlubMember(9)]
        public Class Class { get; set; }

        [BlubMember(10)]
        public uint Unk1 { get; set; } // Points or Rank?

        [BlubMember(11, typeof(StringSerializer))]
        public string Introduction { get; set; }

        [BlubMember(12, typeof(StringSerializer))]
        public string Announcement { get; set; }

        [BlubMember(13)]
        public ClubState State { get; set; }

        [BlubMember(14)]
        public uint Unk2 { get; set; }

        [BlubMember(15)]
        public uint Unk3 { get; set; }

        [BlubMember(16)]
        public uint Unk4 { get; set; }
    }

    [BlubContract]
    public class SClubJoinWaiterInfoAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ArrayWithScalarSerializer))]
        public JoinWaiterInfoDto[] Infos { get; set; }
    }

    [BlubContract]
    public class SClubNewJoinMemberInfoAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ArrayWithScalarSerializer))]
        public NewJoinMemberInfoDto[] Infos { get; set; }
    }

    [BlubContract]
    public class SClubJoinConditionInfoAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public JoinType JoinType { get; set; }

        [BlubMember(1)]
        public uint MinimumJoinLevel { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Question1 { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Question2 { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string Question3 { get; set; }

        [BlubMember(5, typeof(StringSerializer))]
        public string Question4 { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string Question5 { get; set; }
    }

    [BlubContract]
    public class SClubUnjoinerListAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ArrayWithScalarSerializer))]
        public UnjoinerDto[] Unjoiners { get; set; }
    }

    // TODO...
    [BlubContract]
    public class SClubUnjoinSettingMemberListAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO...
    [BlubContract]
    public class SClubGradeCountAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubStuffListAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ArrayWithScalarSerializer))]
        public StuffDto[] Stuff { get; set; }
    }

    [BlubContract]
    public class SClubNewsInfoAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ArrayWithScalarSerializer))]
        public NewsDto[] News { get; set; }
    }

    [BlubContract]
    public class SClubMyInfoAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint Id { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string MarkId { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(3)]
        public ClubState State { get; set; }

        [BlubMember(4)]
        public uint Unk1 { get; set; }

        [BlubMember(5)]
        public Class Class { get; set; }

        [BlubMember(6)]
        public uint Unk2 { get; set; }

        [BlubMember(7)]
        public uint Unk3 { get; set; }

        [BlubMember(8)]
        public uint LeaguePointWin { get; set; }

        [BlubMember(9)]
        public uint LeaguePointLose { get; set; }

        [BlubMember(10)]
        public uint ContributionPointWin { get; set; }

        [BlubMember(11)]
        public uint ContributionPointLose { get; set; }

        [BlubMember(12)]
        public byte ReOpen { get; set; }
    }

    [BlubContract]
    public class SClubBoardWriteAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubBoardWriteResult Result { get; set; }

        public SClubBoardWriteAckMessage()
        { }

        public SClubBoardWriteAckMessage(ClubBoardWriteResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubBoardReadAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint PostsFound { get; set; }

        [BlubMember(1, typeof(ArrayWithScalarSerializer))]
        public PostDto[] Posts { get; set; }
    }

    [BlubContract]
    public class SClubBoardModifyAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubBoardModifyResult Result { get; set; }

        public SClubBoardModifyAckMessage()
        { }

        public SClubBoardModifyAckMessage(ClubBoardModifyResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubBoardDeleteAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubBoardDeleteResult Result { get; set; }

        public SClubBoardDeleteAckMessage()
        { }

        public SClubBoardDeleteAckMessage(ClubBoardDeleteResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SClubBoardDeleteAllAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ClubBoardDeleteAllResult Result { get; set; }

        public SClubBoardDeleteAllAckMessage()
        { }

        public SClubBoardDeleteAllAckMessage(ClubBoardDeleteAllResult result)
        {
            Result = result;
        }
    }

    // TODO...
    [BlubContract]
    public class SClubBoardReadFailedAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; } // TODO: Result?
    }

    [BlubContract]
    public class SClubCreateAck2Message : GameClubMessage
    {
        [BlubMember(0)]
        public ClubCreate2Result Result { get; set; }

        public SClubCreateAck2Message()
        { }

        public SClubCreateAck2Message(ClubCreate2Result result)
        {
            Result = result;
        }
    }

    // TODO...
    [BlubContract]
    public class SClubCloseAck2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; } // TODO: Result?
    }

    // TODO...
    [BlubContract]
    public class SClubJoinAck2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; } // TODO: Result?
    }

    // TODO...
    [BlubContract]
    public class SClubUnjoinAck2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; } // TODO: Result?
    }

    // TODO...
    [BlubContract]
    public class SClubRestoreAck2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubClubInfoAck2Message : GameClubMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; } // Wenn Clan gefunden wurde, ist Result die Clan ID.

        [BlubMember(1)]
        public Clan2Dto Clan { get; set; }
    }

    [BlubContract]
    public class SClubSearchAck2Message : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClansFound { get; set; }

        [BlubMember(1, typeof(ArrayWithScalarSerializer))]
        public Clan2Dto[] Clans { get; set; }
    }

    // TODO...
    [BlubContract]
    public class SClubEditUrlAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO...
    [BlubContract]
    public class SClubEditIntroduceAckMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO...
    [BlubContract]
    public class SClubStuffListAck2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubRankListAckMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClansFound { get; set; }

        [BlubMember(1, typeof(ArrayWithScalarSerializer))]
        public Clan2Dto[] Clans { get; set; }
    }

    // TODO...
    [BlubContract]
    public class SClubMatchNoticeMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }
}
