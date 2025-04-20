using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class RoomPlayerClubDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string MarkId { get; set; }

        public RoomPlayerClubDto()
        {
            Name = "";
            MarkId = "";
        }

        public RoomPlayerClubDto(ulong accountId, string name, string markId)
        {
            AccountId = accountId;
            Name = name;
            MarkId = markId;
        }
    }
}
