using BlubLib.Serialization;
using Netsphere.Network.Data.Chat;
using Netsphere.Network.Serializers;
using ProudNet.Serialization.Serializers;

namespace Netsphere.Network.Message.Chat
{
    [BlubContract]
    public class SLoginAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        public SLoginAckMessage()
        { }

        public SLoginAckMessage(uint result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SFriendActionAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Unk1 { get; set; }

        [BlubMember(1)]
        public uint Result { get; set; }

        [BlubMember(2)]
        public FriendDto Friend { get; set; }
    }

    [BlubContract]
    public class SFriendListAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public FriendDto[] Friends { get; set; }
    }

    [BlubContract]
    public class SCombiActionAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public uint Action { get; set; }

        [BlubMember(2)]
        public CombiDto Combi { get; set; }
    }

    [BlubContract]
    public class SCombiListAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public CombiDto[] Combis { get; set; }
    }

    [BlubContract]
    public class SCombiCheckNameAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }
    }

    [BlubContract]
    public class SDenyActionAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public uint Action { get; set; }

        [BlubMember(2)]
        public DenyDto Deny { get; set; }
    }

    [BlubContract]
    public class SDenyListAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public DenyDto[] Denies { get; set; }
    }

    [BlubContract]
    public class SChannelPlayerListAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public PlayerDto[] Players { get; set; }

        public SChannelPlayerListAckMessage() { }

        public SChannelPlayerListAckMessage(PlayerDto[] players)
        {
            Players = players;
        }
    }

    [BlubContract]
    public class SChannelEnterPlayerAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public PlayerDto Player { get; set; }

        public SChannelEnterPlayerAckMessage() { }

        public SChannelEnterPlayerAckMessage(PlayerDto player)
        {
            Player = player;
        }
    }

    [BlubContract]
    public class SChannelLeavePlayerAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        public SChannelLeavePlayerAckMessage() { }

        public SChannelLeavePlayerAckMessage(ulong accountId)
        {
            AccountId = accountId;
        }
    }

    [BlubContract]
    public class SMessageChatAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public ChatType ChatType { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Message { get; set; }

        public SMessageChatAckMessage() { }

        public SMessageChatAckMessage(ChatType chatType, ulong accountId, string name, string message)
        {
            ChatType = chatType;
            AccountId = accountId;
            Name = name;
            Message = message;
        }
    }

    [BlubContract]
    public class SMessageWhisperChatAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string ReceiverName { get; set; }

        [BlubMember(2)]
        public ulong SenderAccountId { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string SenderName { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string Message { get; set; }

        public SMessageWhisperChatAckMessage()
        { }

        public SMessageWhisperChatAckMessage(uint result, string receiverName, ulong senderAccountId, string senderName, string message)
        {
            Result = result;
            ReceiverName = receiverName;
            SenderAccountId = senderAccountId;
            SenderName = senderName;
            Message = message;
        }
    }

    [BlubContract]
    public class SRoomInvitationPlayerAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public int Server { get; set; }

        [BlubMember(3)]
        public int Channel { get; set; }

        [BlubMember(4)]
        public int Room { get; set; }

        [BlubMember(5)]
        public int Unk1 { get; set; }

        [BlubMember(6)]
        public int Unk2 { get; set; }

        [BlubMember(7)]
        public int Unk3 { get; set; }

        [BlubMember(8)]
        public int Unk4 { get; set; }
    }

    [BlubContract]
    public class SClanMemberListAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public ClubPlayerDto[] Players { get; set; }
    }

    [BlubContract]
    public class SNoteListAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public NoteDto[] Notes { get; set; }
    }

    [BlubContract]
    public class SNoteSendAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; } // Success = 0, Failed = -1
    }

    [BlubContract]
    public class SNoteReadAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public NoteContentDto NoteContent { get; set; }
    }

    [BlubContract]
    public class SNoteDeleteAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public DeleteNoteDto[] DeleteNote { get; set; }
    }

    [BlubContract]
    public class SNoteErrorAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNoteCountAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public byte UnreadMessageCount { get; set; }

        [BlubMember(1)]
        public byte Unk1 { get; set; }

        [BlubMember(2)]
        public byte Unk2 { get; set; }
    }

    [BlubContract]
    public class SPlayerInfoAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public ClubPlayerDto Player { get; set; }
    }

    [BlubContract]
    public class SPlayerPositionAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public int Server { get; set; }

        [BlubMember(2)]
        public int Channel { get; set; }

        [BlubMember(3)]
        public int Room { get; set; }

        [BlubMember(4)]
        public int Unk1 { get; set; } // Clan ID? Wäre aber unlogisch.

        [BlubMember(5)]
        public int Unk2 { get; set; }

        [BlubMember(6)]
        public int Unk3 { get; set; }
    }

    [BlubContract]
    public class SPlayerPlayerInfoListAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public ClubPlayerDto[] Players { get; set; }
    }

    [BlubContract]
    public class UserDataTwoReqMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public uint Result { get; set; }
    }

    [BlubContract]
    public class SUserDataFourAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public UserDataDto UserData { get; set; }
    }

    [BlubContract]
    public class SClanChangeNoticeAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Text { get; set; }
    }

    [BlubContract]
    public class SNoteRejectImportuneAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubSystemMessageMessage : ChatMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Text { get; set; }
    }

    [BlubContract]
    public class SClubNewsRemindMessage : ChatMessage
    {
        [BlubMember(0)]
        public int Unk1 { get; set; }

        [BlubMember(1)]
        public int Unk2 { get; set; }
    }

    [BlubContract]
    public class SClubNoteSendAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }
    }

    [BlubContract]
    public class SClubMemberListAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public ClubMemberDto[] Members { get; set; }
    }

    [BlubContract]
    public class SClubMemberLoginStateAckMessage : ChatMessage
    {
        [BlubMember(0)]
        public uint State { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class SChannelPlayerNameTagListAckMessage : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public PlayerNameTagDto[] Players { get; set; }
    }

    [BlubContract]
    public class SClubClubMemberInfoAck2Message : ChatMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubMemberListAck2Message : ChatMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixAndIndexSerializer))]
        public ClubMember2Dto[] Members { get; set; }
    }

    [BlubContract]
    public class SBroadCastClubCloseMessage : ChatMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }
}
