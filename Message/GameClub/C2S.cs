using BlubLib.Serialization;
using Netsphere.Network.Data.GameClub;
using ProudNet.Serialization.Serializers;

namespace Netsphere.Network.Message.GameClub
{
    [BlubContract]
    public class CClubCreateReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string MarkId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Description { get; set; }

        [BlubMember(3)]
        public ActivityArea ActivityArea { get; set; }

        [BlubMember(4)]
        public ActivityPurpose ActivityPurpose { get; set; }

        [BlubMember(5, typeof(StringSerializer))]
        public string Question1 { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string Question2 { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Question3 { get; set; }

        [BlubMember(8, typeof(StringSerializer))]
        public string Question4 { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string Question5 { get; set; }
    }

    [BlubContract]
    public class CClubCloseReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubJoinReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubUnjoinReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubNameCheckReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Name { get; set; }
    }

    [BlubContract]
    public class CClubRestoreReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubAdminInviteReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class CClubAdminJoinCommandReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint Type { get; set; }

        [BlubMember(1, typeof(ArrayWithScalarSerializer))]
        public ulong[] AccountIds { get; set; }
    }

    [BlubContract]
    public class CClubAdminGradeChangeReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ArrayWithScalarSerializer))]
        public AdminGradeChangeDto[] GradeChanges { get; set; }
    }

    [BlubContract]
    public class CClubAdminNoticeChangeReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Text { get; set; }
    }

    [BlubContract]
    public class CClubAdminInfoModifyReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ActivityArea ActivityArea { get; set; }

        [BlubMember(1)]
        public ActivityPurpose ActivityPurpose { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Introduction { get; set; }
    }

    [BlubContract]
    public class CClubAdminSubMasterReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public uint Duration { get; set; } // in days: 4 weeks -> 28 days, 5 weeks -> 35 days... Per week 7 days ;)
    }

    // TODO...
    [BlubContract]
    public class CClubAdminSubMasterCancelReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubAdminMasterChangeReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class CClubAdminJoinConditionModifyReqMessage : GameClubMessage
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
    public class CClubAdminBoardModifyReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public Access Access { get; set; }

        [BlubMember(1)]
        public PostRight PostRight { get; set; }

        [BlubMember(2)]
        public BadMannerRejectedAccess BadMannerRejectedAccess { get; set; }

        [BlubMember(3)]
        public BadMannerRejectedPost BadMannerRejectedPost { get; set; }
    }

    [BlubContract]
    public class CClubSearchReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public SearchBy SearchBy { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Search { get; set; }

        [BlubMember(2)]
        public uint Page { get; set; }

        [BlubMember(3)]
        public SortBy SortBy { get; set; }

        [BlubMember(4)]
        public Sort Sort { get; set; }
    }

    [BlubContract]
    public class CClubInfoReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubJoinWaiterInfoReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubNewJoinMemberInfoReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubJoinConditionInfoReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubUnjoinerListReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubUnjoinSettingMemberListReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubGradeCountReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubStuffListReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubNewsInfoReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubBoardWriteReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }

        [BlubMember(1)]
        public uint ParentPostId { get; set; }

        [BlubMember(2)]
        public uint Internal { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Text { get; set; }
    }

    [BlubContract]
    public class CClubBoardReadReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }

        [BlubMember(1)]
        public byte Page { get; set; } // Or Page is uint?

        [BlubMember(2)]
        public byte Unk1 { get; set; }

        [BlubMember(3)]
        public byte Unk2 { get; set; }

        [BlubMember(4)]
        public byte Unk3 { get; set; }
    }

    [BlubContract]
    public class CClubBoardModifyReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }

        [BlubMember(1)]
        public uint PostId { get; set; }

        [BlubMember(2)]
        public uint Internal { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Text { get; set; }
    }

    [BlubContract]
    public class CClubBoardDeleteReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint PostId { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubBoardDeleteAllReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubBoardSearchNickReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public uint Unk { get; set; } // Page?
    }

    [BlubContract]
    public class CClubBoardReadOtherClubReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }

        [BlubMember(1)]
        public uint Unk { get; set; } // Page?
    }

    // TODO...
    [BlubContract]
    public class CClubBoardReadMineReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubCreateReq2Message : GameClubMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Unk1 { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Unk2 { get; set; }
    }

    // TODO...
    public class CClubCloseReq2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubJoinReq2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubUnjoinReq2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubRestoreReq2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubClubInfoReq2Message : GameClubMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubSearchReq2Message : GameClubMessage
    {
        [BlubMember(0)]
        public uint Unk1 { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public uint Unk2 { get; set; }

        [BlubMember(3)]
        public uint Unk3 { get; set; }

        [BlubMember(4)]
        public byte Unk4 { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubEditUrlReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubEditIntroduceReqMessage : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO...
    [BlubContract]
    public class CClubStuffListReq2Message : GameClubMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubRankListReqMessage : GameClubMessage
    {
        [BlubMember(0)]
        public uint From { get; set; }

        [BlubMember(1)]
        public uint To { get; set; }
    }
}
