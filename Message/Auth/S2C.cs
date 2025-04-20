using System;
using BlubLib.Serialization;
using Netsphere.Network.Data.Auth;
using Netsphere.Network.Serializers;
using ProudNet.Serialization.Serializers;

namespace Netsphere.Network.Message.Auth
{
    [BlubContract]
    public class SLoginKRAckMessage : AuthMessage
    {
        [BlubMember(0)]
        public uint AccountId { get; set; }

        [BlubMember(1)]
        public uint Nope { get; set; }

        [BlubMember(2)]
        public uint AccountId2 { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Unk1 { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string SessionId { get; set; }

        [BlubMember(5)]
        public AuthLoginResult Result { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string Unk2 { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Unk3 { get; set; }

        [BlubMember(8, typeof(StringSerializer))]
        public string Unk4 { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string AccessToken { get; set; }

        [BlubMember(10, typeof(StringSerializer))]
        public string RefreshToken { get; set; }

        [BlubMember(11, typeof(StringSerializer))]
        public string ExpireDate { get; set; }
    }

    [BlubContract]
    public class SLoginEUAckMessage : AuthMessage
    {
        [BlubMember(0)]
        public uint AccountId { get; set; }

        [BlubMember(1)]
        public uint Nope { get; set; }

        [BlubMember(2)]
        public uint AccountId2 { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Unk1 { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string SessionId { get; set; }

        [BlubMember(5)]
        public AuthLoginResult Result { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string Unk2 { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Unk3 { get; set; }

        [BlubMember(8, typeof(StringSerializer))]
        public string Unk4 { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string AccessToken { get; set; }

        [BlubMember(10, typeof(StringSerializer))]
        public string RefreshToken { get; set; }

        [BlubMember(11, typeof(StringSerializer))]
        public string ExpireDate { get; set; }

        public SLoginEUAckMessage()
        {
            Unk1 = "";
            SessionId = "";
            Unk2 = "";
            Unk3 = "";
            Unk4 = "";
            AccessToken = "";
            RefreshToken = "";
            ExpireDate = "";
        }

        public SLoginEUAckMessage(AuthLoginResult result)
            : this()
        {
            Result = result;
        }

        public SLoginEUAckMessage(AuthLoginResult result, uint accountId, uint sessionId)
            : this()
        {
            Result = result;
            AccountId = accountId;
            SessionId = sessionId.ToString();
        }
    }

    [BlubContract]
    public class SLoginJPAckMessage : AuthMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SServerListAckMessage : AuthMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ServerInfoDto[] ServerList { get; set; }

        public SServerListAckMessage()
            : this(Array.Empty<ServerInfoDto>())
        { }

        public SServerListAckMessage(ServerInfoDto[] serverList)
        {
            ServerList = serverList;
        }
    }

    [BlubContract]
    public class SOptionVersionCheckAckMessage : AuthMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SAuthInTHAckMessage : AuthMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SGameDataXBNAckMessage : AuthMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Data { get; set; }

        public SGameDataXBNAckMessage()
        {

        }

        public SGameDataXBNAckMessage(byte[] data)
        {
            Data = data;
        }
    }

    [BlubContract]
    public class SRefreshAeriaTokenInfoAckMessage : AuthMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SLoginPHAckMessage : AuthMessage
    {
        [BlubMember(0)]
        public uint AccountId { get; set; }

        [BlubMember(1)]
        public uint Nope { get; set; }

        [BlubMember(2)]
        public uint AccountId2 { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Unk1 { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string SessionId { get; set; }

        [BlubMember(5)]
        public AuthLoginResult Result { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string Unk2 { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Unk3 { get; set; }

        [BlubMember(8, typeof(StringSerializer))]
        public string Unk4 { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string AccessToken { get; set; }

        [BlubMember(10, typeof(StringSerializer))]
        public string RefreshToken { get; set; }

        [BlubMember(11, typeof(StringSerializer))]
        public string ExpireDate { get; set; }
    }

    [BlubContract]
    public class SCNSaltAckMessage : AuthMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SLoginCNAckMessage : AuthMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }
}
