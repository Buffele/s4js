using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class ItemUserDataDto
    {
        [BlubMember(0)]
        public uint ItemId { get; set; }

        [BlubMember(1)]
        public uint ShopId { get; set; }

        [BlubMember(2)]
        public uint PeriodType { get; set; }

        [BlubMember(3)]
        public ushort Period { get; set; }

        [BlubMember(4)]
        public byte Color { get; set; }

        [BlubMember(5, typeof(ArrayWithScalarSerializer))]
        public uint[] Effects { get; set; }

        [BlubMember(6)]
        public uint EnchantLevel { get; set; }

        [BlubMember(7)]
        public uint Unk { get; set; }
    }
}
