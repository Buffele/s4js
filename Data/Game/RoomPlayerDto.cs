using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class RoomPlayerDto
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2)]
        public byte Unk1 { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(4)]
        public byte Slot { get; set; }

        [BlubMember(5)]
        public byte Unk2 { get; set; }

        [BlubMember(6)]
        public byte Unk3 { get; set; }

        public RoomPlayerDto()
        {
            Name = "";
        }

        public RoomPlayerDto(uint clanId, ulong accountId, byte unk1, string name, byte slot, byte unk2, byte unk3)
        {
            ClanId = clanId;
            AccountId = accountId;
            Unk1 = unk1;
            Name = name;
            Slot = slot;
            Unk2 = unk2;
            Unk3 = unk3;
        }
    }
}
