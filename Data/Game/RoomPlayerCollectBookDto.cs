using BlubLib.Serialization;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class RoomPlayerCollectBookDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public uint CollectBookId { get; set; }

        public RoomPlayerCollectBookDto()
        {  }

        public RoomPlayerCollectBookDto(ulong accountId, uint collectBookId)
        {
            AccountId = accountId;
            CollectBookId = collectBookId;
        }
    }
}
