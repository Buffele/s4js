using BlubLib.Serialization;
using Netsphere.Network.Serializers;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class ItemDto
    {
        [BlubMember(0)]
        public ulong Id { get; set; }

        [BlubMember(1)]
        public uint ItemId { get; set; }

        [BlubMember(2)]
        public uint ShopId { get; set; }

        [BlubMember(3)]
        public uint PeriodType { get; set; }

        [BlubMember(4)]
        public ushort Period { get; set; }

        [BlubMember(5)]
        public uint Color { get; set; }

        [BlubMember(6)]
        public ulong ExpireTime { get; set; }

        [BlubMember(7)]
        public uint Durability { get; set; }

        [BlubMember(8, typeof(ArrayWithIntPrefixSerializer))]
        public EffectDto[] Effects { get; set; }

        [BlubMember(9)]
        public uint EnchantMP { get; set; }

        [BlubMember(10)]
        public uint EnchantLevel { get; set; }
    }
}
