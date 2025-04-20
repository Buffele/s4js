using BlubLib.Serialization;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class ItemPositionDto
    {
        [BlubMember(0)]
        public byte Position { get; set; }

        [BlubMember(1)]
        public ulong ItemId { get; set; }

        public ItemPositionDto()
        {

        }

        public ItemPositionDto(byte position, ulong itemId)
        {
            Position = position;
            ItemId = itemId;
        }
    }
}
