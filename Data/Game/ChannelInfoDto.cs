using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class ChannelInfoDto
    {
        [BlubMember(0)]
        public ushort Id { get; set; }

        [BlubMember(1)]
        public ushort PlayerOnline { get; set; }

        [BlubMember(2)]
        public ushort PlayerLimit { get; set; }

        [BlubMember(3)]
        public ChannelType Type { get; set; }

        [BlubMember(4)]
        public ushort Unk { get; set; }

        [BlubMember(5, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string Rank { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Description { get; set; }

        [BlubMember(8)]
        public byte ColorB { get; set; }

        [BlubMember(9)]
        public byte ColorG { get; set; }

        [BlubMember(10)]
        public byte ColorR { get; set; }

        [BlubMember(11)]
        public byte ColorA { get; set; }

        [BlubMember(12)]
        public uint MinLevel { get; set; }

        [BlubMember(13)]
        public uint MaxLevel { get; set; }

        [BlubMember(14)]
        public float MinRequireKDRate { get; set; }

        [BlubMember(15)]
        public float MaxRequireKDRate { get; set; }
    }
}
