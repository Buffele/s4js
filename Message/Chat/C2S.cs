using BlubLib.Serialization;
using Netsphere.Network.Data.Chat;
using Netsphere.Network.Serializers;
using ProudNet.Serialization.Serializers;

namespace Netsphere.Network.Message.Chat
{
    [BlubContract]
    public class CLoginReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string SessionId { get; set; }
    }

    [BlubContract]
    public class CDenyActionReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public uint Remove { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Name { get; set; }
    }

    [BlubContract]
    public class CFriendActionReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public uint Remove { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Name { get; set; }
    }

    [BlubContract]
    public class CCombiCheckNameReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Name { get; set; }
    }

    [BlubContract]
    public class CCombiActionReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public uint Remove { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string CombiName { get; set; }
    }

    [BlubContract]
    public class CUserDataOneReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class UserDataThreeAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong ReceiverAccountId { get; set; }

        [BlubMember(1)]
        public uint Result { get; set; }

        [BlubMember(2)]
        public UserDataDto UserData { get; set; }
    }

    [BlubContract]
    public class CMessageChatReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public ChatType ChatType { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Message { get; set; }
    }

    [BlubContract]
    public class CCMessageWhisperChatReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Receiver { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Message { get; set; }
    }

    [BlubContract]
    public class CRoomInvitationPlayerReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class CNoteListReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public byte Page { get; set; }

        [BlubMember(1)]
        public uint Filter { get; set; }
    }

    [BlubContract]
    public class CNoteSendReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Receiver { get; set; }

        [BlubMember(1)]
        public ulong ReceiverAccountId { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Subject { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Text { get; set; }

        [BlubMember(4)]
        public uint Unk1 { get; set; }

        [BlubMember(5)]
        public uint Unk2 { get; set; }

        [BlubMember(6)]
        public byte Type { get; set; }

        [BlubMember(7, typeof(ReadToEndSerializer))]
        public byte[] Unk3 { get; set; }
    }

    [BlubContract]
    public class CNoteReadReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong NoteId { get; set; }
    }

    [BlubContract]
    public class CNoteDeleteReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public ulong[] NoteIds { get; set; }
    }

    [BlubContract]
    public class CNoteCountReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class COptionSaveCommunityReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint AllowCombi { get; set; }

        [BlubMember(1)]
        public uint AllowFriendRequest { get; set; }

        [BlubMember(2)]
        public uint AllowInvitation { get; set; }

        [BlubMember(3)]
        public uint AllowOpenInfo { get; set; }
    }

    [BlubContract]
    public class COptionSaveBinaryReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CNoteRejectImportuneReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubNoteSendReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Unk1 { get; set; }

        [BlubMember(1)]
        public uint Unk2 { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Subject { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Text { get; set; }
    }

    [BlubContract]
    public class CClubMemberListReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubClubMemberInfoReq2Message : ChatMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }

        /*
	    Type:
	    2: Clan
	    3: No Clan
	    */
        [BlubMember(1)]
        public uint Type { get; set; }

        [BlubMember(2)]
        public uint Unk { get; set; }
    }

    [BlubContract]
    public class CClubMemberListReq2Message : ChatMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }
    }

    [BlubContract]
    public class CClubNoteSendReq2Message : ChatMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CChannelListReqMessage : ChatMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }
}
