using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class CombiDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public uint Unk1 { get; set; }

        [BlubMember(2)]
        public uint Type { get; set; } // 3 -> Pending, 2 -> Mutual Combi, 1 -> Requesting Combi, 0 -> Nothing

        [BlubMember(3)]
        public uint Unk2 { get; set; }

        [BlubMember(4)]
        public ulong Unk3 { get; set; }

        [BlubMember(5)]
        public ulong Unk4 { get; set; }

        [BlubMember(6)]
        public ulong Matches { get; set; }

        [BlubMember(7)]
        public ulong Wins { get; set; }

        [BlubMember(8)]
        public ulong Loses { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string Unk5 { get; set; }

        [BlubMember(10, typeof(StringSerializer))]
        public string PlayerName { get; set; }

        [BlubMember(11, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(12, typeof(StringSerializer))]
        public string CreationDate { get; set; }

        public CombiDto()
        {
            Unk5 = "";
            PlayerName = "";
            Name = "";
            CreationDate = "";
        }
    }
}
