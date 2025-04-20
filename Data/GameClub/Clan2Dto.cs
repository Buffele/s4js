using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.GameClub
{
    [BlubContract]
    public class Clan2Dto
    {
        [BlubMember(0)]
        public uint Id { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string MarkId { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Class { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string MasterAccountId { get; set; }

        [BlubMember(5)]
        public uint MasterLevel { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string MasterName { get; set; }

        [BlubMember(7)]
        public uint Unk1 { get; set; }

        [BlubMember(8)]
        public uint MemberCount { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string Description { get; set; }

        [BlubMember(10, typeof(StringSerializer))]
        public string CreationDate { get; set; }

        [BlubMember(11, typeof(StringSerializer))]
        public string Unk2 { get; set; }

        [BlubMember(12, typeof(StringSerializer))]
        public string Unk3 { get; set; }

        [BlubMember(13)]
        public uint RankingPlace { get; set; }

        [BlubMember(14)]
        public uint Unk4 { get; set; }

        [BlubMember(15)]
        public uint Unk5 { get; set; }

        [BlubMember(16)]
        public uint Unk6 { get; set; }

        [BlubMember(17)]
        public ulong ClubPoints { get; set; } // Not sure if ulong...

        [BlubMember(18)]
        public uint Wins { get; set; }

        [BlubMember(19)]
        public uint Loses { get; set; }

        [BlubMember(20)]
        public uint LadderPoints { get; set; }

        [BlubMember(21)]
        public uint Unk8 { get; set; }

        [BlubMember(22)]
        public ushort Unk9 { get; set; }
    }
}
