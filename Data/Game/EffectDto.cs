using BlubLib.Serialization;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class EffectDto
    {
        [BlubMember(0)]
        public uint Id { get; set; }

        [BlubMember(1)]
        public int Unk1 { get; set; } // -1

        [BlubMember(2)]
        public uint Unk2 { get; set; } // 0

        [BlubMember(3)]
        public uint Unk3 { get; set; } // 0

        [BlubMember(4)]
        public uint Unk4 { get; set; } // 0

        public EffectDto()
        {

        }

        public EffectDto(uint id)
        {
            Id = id;
            Unk1 = -1;
            Unk2 = 0;
            Unk3 = 0;
            Unk4 = 0;
        }
    }
}
