using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.GameClub
{
    [BlubContract]
    public class UnjoinerDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public UnjoinerType Type { get; set; }

        [BlubMember(3)]
        public uint Level { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string LeaveDate { get; set; }
    }
}
