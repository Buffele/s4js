using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.GameClub
{
    [BlubContract]
    public class JoinWaiterInfoDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public Class Class { get; set; }

        [BlubMember(3)]
        public uint Rank { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string JoinDate { get; set; }

        [BlubMember(5, typeof(StringSerializer))]
        public string Question1 { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string Question2 { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Question3 { get; set; }

        [BlubMember(8, typeof(StringSerializer))]
        public string Question4 { get; set; }

        [BlubMember(9, typeof(StringSerializer))]
        public string Question5 { get; set; }

        [BlubMember(10, typeof(StringSerializer))]
        public string Answer1 { get; set; }

        [BlubMember(11, typeof(StringSerializer))]
        public string Answer2 { get; set; }

        [BlubMember(12, typeof(StringSerializer))]
        public string Answer3 { get; set; }

        [BlubMember(13, typeof(StringSerializer))]
        public string Answer4 { get; set; }

        [BlubMember(14, typeof(StringSerializer))]
        public string Answer5 { get; set; }
    }
}
