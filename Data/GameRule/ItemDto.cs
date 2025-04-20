using BlubLib.Serialization;
using Netsphere.Network.Serializers;

namespace Netsphere.Network.Data.GameRule
{
    [BlubContract]
    public class ItemDto
    {
        [BlubMember(0)]
        public ulong Id { get; set; }

        [BlubMember(1)]
        public uint ItemId { get; set; }

        [BlubMember(2)]
        public uint Color { get; set; }

        [BlubMember(3, typeof(ArrayWithIntPrefixSerializer))]
        public uint[] Effects { get; set; }

        [BlubMember(4)]
        public uint Unk1 { get; set; }

        [BlubMember(5)]
        public uint Unk2 { get; set; }
    }
}
