using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class ClubMemberDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public uint MemberId { get; set; } // Not sure...

        [BlubMember(3)]
        public uint Class { get; set; }

        [BlubMember(4)]
        public uint Rank { get; set; }

        [BlubMember(4)]
        public uint Visits { get; set; }

        [BlubMember(5, typeof(StringSerializer))]
        public string SignIn { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string LastVisit { get; set; }

        [BlubMember(7)]
        public uint State { get; set; }
    }
}
