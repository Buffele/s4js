using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.GameRule
{
    [BlubContract]
    public class ChallengeRankDto
    {
        [BlubMember(0)]
        public uint Place { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public uint Unk1 { get; set; }

        [BlubMember(3)]
        public uint Unk2 { get; set; }

        [BlubMember(4)]
        public uint Time { get; set; }
    }
}
