using System;
using System.Collections.Generic;
using System.IO;
using BlubLib.Serialization;

namespace Netsphere.Network.Message.Chat
{
    internal static class ChatMapper
    {
        private static readonly Dictionary<ChatOpCode, Type> s_typeLookup = new Dictionary<ChatOpCode, Type>();
        private static readonly Dictionary<Type, ChatOpCode> s_opCodeLookup = new Dictionary<Type, ChatOpCode>();

        static ChatMapper()
        {
            // S2C
            Create<SLoginAckMessage>(ChatOpCode.SLoginAck);
            Create<SFriendActionAckMessage>(ChatOpCode.SFriendActionAck);
            Create<SFriendListAckMessage>(ChatOpCode.SFriendListAck);
            Create<SCombiActionAckMessage>(ChatOpCode.SCombiActionAck);
            Create<SCombiListAckMessage>(ChatOpCode.SCombiListAck);
            Create<SCombiCheckNameAckMessage>(ChatOpCode.SCombiCheckNameAck);
            Create<SDenyActionAckMessage>(ChatOpCode.SDenyActionAck);
            Create<SDenyListAckMessage>(ChatOpCode.SDenyListAck);
            Create<SChannelPlayerListAckMessage>(ChatOpCode.SChannelPlayerListAck);
            Create<SChannelEnterPlayerAckMessage>(ChatOpCode.SChannelEnterPlayerAck);
            Create<SChannelLeavePlayerAckMessage>(ChatOpCode.SChannelLeavePlayerAck);
            Create<SMessageChatAckMessage>(ChatOpCode.SMessageChatAck);
            Create<SMessageWhisperChatAckMessage>(ChatOpCode.SMessageWhisperChatAck);
            Create<SRoomInvitationPlayerAckMessage>(ChatOpCode.SRoomInvitationPlayerAck);
            Create<SClanMemberListAckMessage>(ChatOpCode.SClanMemberListAck);
            Create<SNoteListAckMessage>(ChatOpCode.SNoteListAck);
            Create<SNoteSendAckMessage>(ChatOpCode.SNoteSendAck);
            Create<SNoteReadAckMessage>(ChatOpCode.SNoteReadAck);
            Create<SNoteDeleteAckMessage>(ChatOpCode.SNoteDeleteAck);
            Create<SNoteErrorAckMessage>(ChatOpCode.SNoteErrorAck);
            Create<SNoteCountAckMessage>(ChatOpCode.SNoteCountAck);
            Create<SPlayerInfoAckMessage>(ChatOpCode.SPlayerInfoAck);
            Create<SPlayerPositionAckMessage>(ChatOpCode.SPlayerPositionAck);
            Create<SPlayerPlayerInfoListAckMessage>(ChatOpCode.SPlayerPlayerInfoListAck);
            Create<UserDataTwoReqMessage>(ChatOpCode.UserDataTwoReq);
            Create<SUserDataFourAckMessage>(ChatOpCode.SUserDataFourAck);
            Create<SClanChangeNoticeAckMessage>(ChatOpCode.SClanChangeNoticeAck);
            Create<SNoteRejectImportuneAckMessage>(ChatOpCode.SNoteRejectImportuneAck);
            Create<SClubSystemMessageMessage>(ChatOpCode.SClubSystemMessage);
            Create<SClubNewsRemindMessage>(ChatOpCode.SClubNewsRemind);
            Create<SClubNoteSendAckMessage>(ChatOpCode.SClubNoteSendAck);
            Create<SClubMemberListAckMessage>(ChatOpCode.SClubMemberListAck);
            Create<SClubMemberLoginStateAckMessage>(ChatOpCode.SClubMemberLoginStateAck);
            Create<SChannelPlayerNameTagListAckMessage>(ChatOpCode.SChannelPlayerNameTagListAck);
            Create<SClubClubMemberInfoAck2Message>(ChatOpCode.SClubClubMemberInfoAck2);
            Create<SClubMemberListAck2Message>(ChatOpCode.SClubMemberListAck2);
            Create<SBroadCastClubCloseMessage>(ChatOpCode.SBroadCastClubClose);

            // C2S
            Create<CLoginReqMessage>(ChatOpCode.CLoginReq);
            Create<CDenyActionReqMessage>(ChatOpCode.CDenyActionReq);
            Create<CFriendActionReqMessage>(ChatOpCode.CFriendActionReq);
            Create<CCombiCheckNameReqMessage>(ChatOpCode.CCombiCheckNameReq);
            Create<CCombiActionReqMessage>(ChatOpCode.CCombiActionReq);
            Create<CUserDataOneReqMessage>(ChatOpCode.CUserDataOneReq);
            Create<UserDataThreeAckMessage>(ChatOpCode.UserDataThreeAck);
	        Create<CMessageChatReqMessage>(ChatOpCode.CMessageChatReq);
            Create<CCMessageWhisperChatReqMessage>(ChatOpCode.CMessageWhisperChatReq);
            Create<CRoomInvitationPlayerReqMessage>(ChatOpCode.CRoomInvitationPlayerReq);
            Create<CNoteListReqMessage>(ChatOpCode.CNoteListReq);
            Create<CNoteSendReqMessage>(ChatOpCode.CNoteSendReq);
            Create<CNoteReadReqMessage>(ChatOpCode.CNoteReadReq);
            Create<CNoteDeleteReqMessage>(ChatOpCode.CNoteDeleteReq);
            Create<CNoteCountReqMessage>(ChatOpCode.CNoteCountReq);
            Create<COptionSaveCommunityReqMessage>(ChatOpCode.COptionSaveCommunityReq);
            Create<COptionSaveBinaryReqMessage>(ChatOpCode.COptionSaveBinaryReq);
            Create<CNoteRejectImportuneReqMessage>(ChatOpCode.CNoteRejectImportuneReq);
            Create<CClubNoteSendReqMessage>(ChatOpCode.CClubNoteSendReq);
            Create<CClubMemberListReqMessage>(ChatOpCode.CClubMemberListReq);
            Create<CClubClubMemberInfoReq2Message>(ChatOpCode.CClubClubMemberInfoReq2);
            Create<CClubMemberListReq2Message>(ChatOpCode.CClubMemberListReq2);
            Create<CClubNoteSendReq2Message>(ChatOpCode.CClubNoteSendReq2);
            Create<CChannelListReqMessage>(ChatOpCode.CChannelListReq);
        }

        public static void Create<T>(ChatOpCode opCode)
            where T : ChatMessage, new()
        {
            var type = typeof(T);
            s_opCodeLookup.Add(type, opCode);
            s_typeLookup.Add(opCode, type);
        }

        public static ChatMessage GetMessage(ChatOpCode opCode, BinaryReader r)
        {
            var type = s_typeLookup.GetValueOrDefault(opCode);
            if (type == null)
                throw new NetsphereBadOpCodeException(opCode);

            return (ChatMessage)Serializer.Deserialize(r, type);
        }

        public static ChatOpCode GetOpCode<T>()
            where T : ChatMessage
        {
            return GetOpCode(typeof(T));
        }

        public static ChatOpCode GetOpCode(Type type)
        {
            return s_opCodeLookup[type];
        }
    }
}
