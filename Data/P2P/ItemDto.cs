using BlubLib.Serialization;

namespace Netsphere.Network.Data.P2P
{
    [BlubContract]
    public class ItemDto
    {
        [BlubMember(0)]
        public ItemNumber ItemNumber { get; set; }

        [BlubMember(1)]
        public int Unk1 { get; set; }

        [BlubMember(2)]
        public int Unk2 { get; set; }

        [BlubMember(3)]
        public int Unk3 { get; set; }

        public ItemDto()
        {
            ItemNumber = 0;
        }

        public ItemDto(ItemNumber itemNumber, int unk1, int unk2, int unk3)
        {
            ItemNumber = itemNumber;
            Unk1 = unk1;
            Unk2 = unk2;
            Unk3 = Unk3;
        }

        public override string ToString()
        {
            return ItemNumber.ToString();
        }
    }
}
