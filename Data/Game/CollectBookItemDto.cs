using BlubLib.Serialization;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class CollectBookItemDto
    {
        [BlubMember(0)]
        public uint CollectionId { get; set; }

        [BlubMember(1)]
        public uint ItemId { get; set; }

        [BlubMember(2)]
        public byte Unk { get; set; }
    }
}
