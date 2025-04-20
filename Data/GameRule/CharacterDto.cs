using BlubLib.Serialization;
using BlubLib.Serialization.Serializers;

namespace Netsphere.Network.Data.GameRule
{
    [BlubContract]
    public class CharacterDto
    {
        [BlubMember(0, typeof(FixedArraySerializer), 3)]
        public ItemDto[] Weapons { get; set; }

        [BlubMember(1)]
        public ItemDto Skill { get; set; }

        [BlubMember(2, typeof(FixedArraySerializer), 8)]
        public ItemDto[] Clothes { get; set; }

        [BlubMember(3)]
        public uint Avatar { get; set; }

        [BlubMember(4)]
        public uint Unk { get; set; }

        [BlubMember(5)]
        public uint HP { get; set; }

        [BlubMember(6)]
        public uint SP { get; set; }
    }
}
