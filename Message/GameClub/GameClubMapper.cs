using BlubLib.Serialization;
using System;
using System.Collections.Generic;
using System.IO;

namespace Netsphere.Network.Message.GameClub
{
    internal static class GameClubMapper
    {
        private static readonly Dictionary<GameClubOpCode, Type> s_typeLookup = new Dictionary<GameClubOpCode, Type>();
        private static readonly Dictionary<Type, GameClubOpCode> s_opCodeLookup = new Dictionary<Type, GameClubOpCode>();

        static GameClubMapper()
        {
            // S2C
            Create<SClubCreateAckMessage>(GameClubOpCode.SClubCreateAck);
            Create<SClubCloseAckMessage>(GameClubOpCode.SClubCloseAck);
            Create<SClubJoinAckMessage>(GameClubOpCode.SClubJoinAck);
            Create<SClubUnjoinAckMessage>(GameClubOpCode.SClubUnjoinAck);
            Create<SClubNameCheckAckMessage>(GameClubOpCode.SClubNameCheckAck);
            Create<SClubRestoreAckMessage>(GameClubOpCode.SClubRestoreAck);
            Create<SClubAdminInviteAckMessage>(GameClubOpCode.SClubAdminInviteAck);
            Create<SClubAdminJoinCommandAckMessage>(GameClubOpCode.SClubAdminJoinCommandAck);
            Create<SClubAdminGradeChangeAckMessage>(GameClubOpCode.SClubAdminGradeChangeAck);
            Create<SClubAdminNoticeChangeAckMessage>(GameClubOpCode.SClubAdminNoticeChangeAck);
            Create<SClubAdminInfoModifyAckMessage>(GameClubOpCode.SClubAdminInfoModifyAck);
            Create<SClubAdminSubMasterAckMessage>(GameClubOpCode.SClubAdminSubMasterAck);
            Create<SClubAdminSubMasterCancelAckMessage>(GameClubOpCode.SClubAdminSubMasterCancelAck);
            Create<SClubAdminMasterChangeAckMessage>(GameClubOpCode.SClubAdminMasterChangeAck);
            Create<SClubAdminJoinConditionModifyAckMessage>(GameClubOpCode.SClubAdminJoinConditionModifyAck);
            Create<SClubAdminBoardModifyAckMessage>(GameClubOpCode.SClubAdminBoardModifyAck);
            Create<SClubSearchAckMessage>(GameClubOpCode.SClubSearchAck);
            Create<SClubInfoAckMessage>(GameClubOpCode.SClubInfoAck);
            Create<SClubJoinWaiterInfoAckMessage>(GameClubOpCode.SClubJoinWaiterInfoAck);
            Create<SClubNewJoinMemberInfoAckMessage>(GameClubOpCode.SClubNewJoinMemberInfoAck);
            Create<SClubJoinConditionInfoAckMessage>(GameClubOpCode.SClubJoinConditionInfoAck);
            Create<SClubUnjoinerListAckMessage>(GameClubOpCode.SClubUnjoinerListAck);
            Create<SClubUnjoinSettingMemberListAckMessage>(GameClubOpCode.SClubUnjoinSettingMemberListAck);
            Create<SClubGradeCountAckMessage>(GameClubOpCode.SClubGradeCountAck);
            Create<SClubStuffListAckMessage>(GameClubOpCode.SClubStuffListAck);
            Create<SClubNewsInfoAckMessage>(GameClubOpCode.SClubNewsInfoAck);
            Create<SClubMyInfoAckMessage>(GameClubOpCode.SClubMyInfoAck);
            Create<SClubBoardWriteAckMessage>(GameClubOpCode.SClubBoardWriteAck);
            Create<SClubBoardReadAckMessage>(GameClubOpCode.SClubBoardReadAck);
            Create<SClubBoardModifyAckMessage>(GameClubOpCode.SClubBoardModifyAck);
            Create<SClubBoardDeleteAckMessage>(GameClubOpCode.SClubBoardDeleteAck);
            Create<SClubBoardDeleteAllAckMessage>(GameClubOpCode.SClubBoardDeleteAllAck);
            Create<SClubBoardReadFailedAckMessage>(GameClubOpCode.SClubBoardReadFailedAck);
            Create<SClubCreateAck2Message>(GameClubOpCode.SClubCreateAck2);
            Create<SClubCloseAck2Message>(GameClubOpCode.SClubCloseAck2);
            Create<SClubJoinAck2Message>(GameClubOpCode.SClubJoinAck2);
            Create<SClubUnjoinAck2Message>(GameClubOpCode.SClubUnjoinAck2);
            Create<SClubRestoreAck2Message>(GameClubOpCode.SClubRestoreAck2);
            Create<SClubClubInfoAck2Message>(GameClubOpCode.SClubClubInfoAck2);
            Create<SClubSearchAck2Message>(GameClubOpCode.SClubSearchAck2);
            Create<SClubEditUrlAckMessage>(GameClubOpCode.SClubEditUrlAck);
            Create<SClubEditIntroduceAckMessage>(GameClubOpCode.SClubEditIntroduceAck);
            Create<SClubStuffListAck2Message>(GameClubOpCode.SClubStuffListAck2);
            Create<SClubRankListAckMessage>(GameClubOpCode.SClubRankListAck);
            Create<SClubMatchNoticeMessage>(GameClubOpCode.SClubMatchNotice);

            // C2S
            Create<CClubCreateReqMessage>(GameClubOpCode.CClubCreateReq);
            Create<CClubCloseReqMessage>(GameClubOpCode.CClubCloseReq);
            Create<CClubJoinReqMessage>(GameClubOpCode.CClubJoinReq);
            Create<CClubUnjoinReqMessage>(GameClubOpCode.CClubUnjoinReq);
            Create<CClubNameCheckReqMessage>(GameClubOpCode.CClubNameCheckReq);
            Create<CClubRestoreReqMessage>(GameClubOpCode.CClubRestoreReq);
            Create<CClubAdminInviteReqMessage>(GameClubOpCode.CClubAdminInviteReq);
            Create<CClubAdminJoinCommandReqMessage>(GameClubOpCode.CClubAdminJoinCommandReq);
            Create<CClubAdminGradeChangeReqMessage>(GameClubOpCode.CClubAdminGradeChangeReq);
            Create<CClubAdminNoticeChangeReqMessage>(GameClubOpCode.CClubAdminNoticeChangeReq);
            Create<CClubAdminInfoModifyReqMessage>(GameClubOpCode.CClubAdminInfoModifyReq);
            Create<CClubAdminSubMasterReqMessage>(GameClubOpCode.CClubAdminSubMasterReq);
            Create<CClubAdminSubMasterCancelReqMessage>(GameClubOpCode.CClubAdminSubMasterCancelReq);
            Create<CClubAdminMasterChangeReqMessage>(GameClubOpCode.CClubAdminMasterChangeReq);
            Create<CClubAdminJoinConditionModifyReqMessage>(GameClubOpCode.CClubAdminJoinConditionModifyReq);
            Create<CClubAdminBoardModifyReqMessage>(GameClubOpCode.CClubAdminBoardModifyReq);
            Create<CClubSearchReqMessage>(GameClubOpCode.CClubSearchReq);
            Create<CClubInfoReqMessage>(GameClubOpCode.CClubInfoReq);
            Create<CClubJoinWaiterInfoReqMessage>(GameClubOpCode.CClubJoinWaiterInfoReq);
            Create<CClubNewJoinMemberInfoReqMessage>(GameClubOpCode.CClubNewJoinMemberInfoReq);
            Create<CClubJoinConditionInfoReqMessage>(GameClubOpCode.CClubJoinConditionInfoReq);
            Create<CClubUnjoinerListReqMessage>(GameClubOpCode.CClubUnjoinerListReq);
            Create<CClubUnjoinSettingMemberListReqMessage>(GameClubOpCode.CClubUnjoinSettingMemberListReq);
            Create<CClubGradeCountReqMessage>(GameClubOpCode.CClubGradeCountReq);
            Create<CClubStuffListReqMessage>(GameClubOpCode.CClubStuffListReq);
            Create<CClubNewsInfoReqMessage>(GameClubOpCode.CClubNewsInfoReq);
            Create<CClubBoardWriteReqMessage>(GameClubOpCode.CClubBoardWriteReq);
            Create<CClubBoardReadReqMessage>(GameClubOpCode.CClubBoardReadReq);
            Create<CClubBoardModifyReqMessage>(GameClubOpCode.CClubBoardModifyReq);
            Create<CClubBoardDeleteReqMessage>(GameClubOpCode.CClubBoardDeleteReq);
            Create<CClubBoardDeleteAllReqMessage>(GameClubOpCode.CClubBoardDeleteAllReq);
            Create<CClubBoardSearchNickReqMessage>(GameClubOpCode.CClubBoardSearchNickReq);
            Create<CClubBoardReadOtherClubReqMessage>(GameClubOpCode.CClubBoardReadOtherClubReq);
            Create<CClubBoardReadMineReqMessage>(GameClubOpCode.CClubBoardReadMineReq);
            Create<CClubCreateReq2Message>(GameClubOpCode.CClubCreateReq2);
            Create<CClubCloseReq2Message>(GameClubOpCode.CClubCloseReq2);
            Create<CClubJoinReq2Message>(GameClubOpCode.CClubJoinReq2);
            Create<CClubUnjoinReq2Message>(GameClubOpCode.CClubUnjoinReq2);
            Create<CClubRestoreReq2Message>(GameClubOpCode.CClubRestoreReq2);
            Create<CClubClubInfoReq2Message>(GameClubOpCode.CClubClubInfoReq2);
            Create<CClubSearchReq2Message>(GameClubOpCode.CClubSearchReq2);
            Create<CClubEditUrlReqMessage>(GameClubOpCode.CClubEditUrlReq);
            Create<CClubEditIntroduceReqMessage>(GameClubOpCode.CClubEditIntroduceReq);
            Create<CClubStuffListReq2Message>(GameClubOpCode.CClubStuffListReq2);
            Create<CClubRankListReqMessage>(GameClubOpCode.CClubRankListReq);
        }

        public static void Create<T>(GameClubOpCode opCode)
            where T : GameClubMessage, new()
        {
            var type = typeof(T);
            s_opCodeLookup.Add(type, opCode);
            s_typeLookup.Add(opCode, type);
        }

        public static GameClubMessage GetMessage(GameClubOpCode opCode, BinaryReader r)
        {
            var type = s_typeLookup.GetValueOrDefault(opCode);
            if (type == null)
                throw new NetsphereBadOpCodeException(opCode);

            return (GameClubMessage) Serializer.Deserialize(r, type);
        }

        public static GameClubOpCode GetOpCode<T>()
            where T : GameClubMessage
        {
            return GetOpCode(typeof(T));
        }

        public static GameClubOpCode GetOpCode(Type type)
        {
            return s_opCodeLookup[type];
        }
    }
}
