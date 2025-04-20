using BlubLib.Serialization;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class BasketItemDto
    {
        [BlubMember(0)]
        public ulong Id { get; set; }

        [BlubMember(1)]
        public uint ItemId { get; set; }

        [BlubMember(2)]
        public uint ShopId { get; set; }

        [BlubMember(3)]
        public ItemPeriodType PeriodType { get; set; }

        [BlubMember(4)]
        public ushort Period { get; set; }

        [BlubMember(5)]
        public byte Color { get; set; }

        [BlubMember(6)]
        public uint Effect { get; set; }
    }
}
