using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class ClubMember2Dto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public uint MemberId { get; set; } // Not sure...

        [BlubMember(3)]
        public uint Unk1 { get; set; }

        [BlubMember(4)]
        public uint Class { get; set; }

        [BlubMember(5)]
        public uint Points { get; set; }

        [BlubMember(6)]
        public uint Unk2 { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string SignIn { get; set; }

        [BlubMember(8)]
        public uint Unk3 { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string LastVisit { get; set; }

        [BlubMember(10)]
        public uint Unk4 { get; set; }

        [BlubMember(11)]
        public uint Unk5 { get; set; }

        [BlubMember(12)]
        public uint Unk6 { get; set; }

        [BlubMember(13)]
        public uint Unk7 { get; set; }

        [BlubMember(14)]
        public uint Unk8 { get; set; }
    }
}
