using System;
using System.Collections.Generic;
using System.IO;
using BlubLib.Serialization;

namespace Netsphere.Network.Message.Auth
{
    internal static class AuthMapper
    {
        private static readonly Dictionary<AuthOpCode, Type> s_typeLookup = new Dictionary<AuthOpCode, Type>();
        private static readonly Dictionary<Type, AuthOpCode> s_opCodeLookup = new Dictionary<Type, AuthOpCode>();

        static AuthMapper()
        {
            // S2C
            //Create<SLoginKRAckMessage>(AuthOpCode.SLoginKRAck);
            Create<SLoginEUAckMessage>(AuthOpCode.SLoginEUAck);
            //Create<SLoginJPAckMessage>(AuthOpCode.SLoginJPAck);
            Create<SServerListAckMessage>(AuthOpCode.SServerListAck);
            //Create<SOptionVersionCheckAckMessage>(AuthOpCode.SOptionVersionCheckAck);
            Create<SGameDataXBNAckMessage>(AuthOpCode.SGameDataXBNAck);
            //Create<SRefreshAeriaTokenInfoAckMessage>(AuthOpCode.SRefreshAeriaTokenInfoAck);
            //Create<SLoginPHAckMessage>(AuthOpCode.SLoginPHAck);

            // C2S
            //Create<CLoginKRReqMessage>(AuthOpCode.CLoginKRReq);
            Create<CLoginEUReqMessage>(AuthOpCode.CLoginEUReq);
            //Create<CLoginJPReqMessage>(AuthOpCode.CLoginJPReq);
            Create<CServerListReqMessage>(AuthOpCode.CServerListReq);
            Create<COptionVersionCheckReqMessage>(AuthOpCode.COptionVersionCheckReq);
            //Create<CAuthInTHReqMessage>(AuthOpCode.CAuthInTHReq);
            Create<CGameDataXBNReqMessage>(AuthOpCode.CGameDataXBNReq);
            //Create<CLoginPHReqMessage>(AuthOpCode.CLoginPHReq);
        }

        public static void Create<T>(AuthOpCode opCode)
            where T : AuthMessage, new()
        {
            var type = typeof(T);
            s_opCodeLookup.Add(type, opCode);
            s_typeLookup.Add(opCode, type);
        }

        public static AuthMessage GetMessage(AuthOpCode opCode, BinaryReader r)
        {
            var type = s_typeLookup.GetValueOrDefault(opCode);
            if (type == null)
                throw new NetsphereBadOpCodeException(opCode);

            return (AuthMessage)Serializer.Deserialize(r, type);
        }

        public static AuthOpCode GetOpCode<T>()
            where T : AuthMessage
        {
            return GetOpCode(typeof(T));
        }

        public static AuthOpCode GetOpCode(Type type)
        {
            return s_opCodeLookup[type];
        }
    }
}