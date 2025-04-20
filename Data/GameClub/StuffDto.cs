using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.GameClub
{
    [BlubContract]
    public class StuffDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public uint Level { get; set; }

        [BlubMember(3)]
        public Class Class { get; set; }

        [BlubMember(4)]
        public uint Rank { get; set; }

        [BlubMember(5)]
        public uint Visits { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string SignIn { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string LastVisit { get; set; }

        [BlubMember(8)]
        public uint Unk { get; set; }
    }
}
