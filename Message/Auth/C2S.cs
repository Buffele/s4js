using BlubLib.Serialization;
using ProudNet.Serialization.Serializers;

namespace Netsphere.Network.Message.Auth
{
    [BlubContract]
    public class CLoginKRReqMessage : AuthMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Unk1 { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Unk2 { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Unk3 { get; set; }

        [BlubMember(3)]
        public byte Unk4 { get; set; }

        [BlubMember(4)]
        public ulong AccountId { get; set; }
    }

    [BlubContract]
    public class CLoginEUReqMessage : AuthMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Username { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Password { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Unk1 { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Unk2 { get; set; }

        [BlubMember(4)]
        public uint Unk3 { get; set; }

        [BlubMember(5)]
        public uint Unk4 { get; set; }

        [BlubMember(6)]
        public uint Unk5 { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Unk6 { get; set; }

        [BlubMember(8)]
        public uint Unk7 { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string Unk8 { get; set; }

        [BlubMember(10, typeof(StringSerializer))]
        public string Unk9 { get; set; }

        [BlubMember(11, typeof(StringSerializer))]
        public string AeriaAccCode { get; set; }

        [BlubMember(12, typeof(StringSerializer))]
        public string AccessToken { get; set; }

        [BlubMember(13, typeof(StringSerializer))]
        public string RefreshToken { get; set; }

        [BlubMember(14, typeof(StringSerializer))]
        public string ExpireDate { get; set; }

        [BlubMember(15, typeof(StringSerializer))]
        public string Unk10 { get; set; }

        [BlubMember(16, typeof(StringSerializer))]
        public string Unk11 { get; set; }
    }

    [BlubContract]
    public class CLoginJPReqMessage : AuthMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CServerListReqMessage : AuthMessage
    {

    }

    [BlubContract]
    public class COptionVersionCheckReqMessage : AuthMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public uint Checksum { get; set; }
    }

    [BlubContract]
    public class CAuthInTHReqMessage : AuthMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CGameDataXBNReqMessage : AuthMessage
    {
        [BlubMember(0)]
        public uint Unk { get; set; }
    }

    [BlubContract]
    public class CLoginPHReqMessage : AuthMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string UserId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Unk1 { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Unk2 { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Unk3 { get; set; }

        [BlubMember(4)]
        public uint Unk4 { get; set; }

        [BlubMember(5)]
        public uint Unk5 { get; set; }

        [BlubMember(6)]
        public uint Unk6 { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Unk7 { get; set; }

        [BlubMember(8)]
        public uint Unk8 { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string Unk9 { get; set; }

        [BlubMember(10, typeof(StringSerializer))]
        public string Unk10 { get; set; }

        [BlubMember(11, typeof(StringSerializer))]
        public string Unk11 { get; set; }

        [BlubMember(12, typeof(StringSerializer))]
        public string Unk12 { get; set; }

        [BlubMember(13, typeof(StringSerializer))]
        public string Unk13 { get; set; }

        [BlubMember(14, typeof(StringSerializer))]
        public string Unk14 { get; set; }

        [BlubMember(15, typeof(StringSerializer))]
        public string Token { get; set; }
    }

    [BlubContract]
    public class CCNSaltReqMessage : AuthMessage
    {
        [BlubMember(0)]
        public uint Unk { get; set; }
    }

    [BlubContract]
    public class CLoginCNReqMessage : AuthMessage
    {
        [BlubMember(0)]
        public uint Unk { get; set; }
    }
}