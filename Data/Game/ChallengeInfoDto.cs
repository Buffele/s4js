using BlubLib.Serialization;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class ChallengeInfoDto
    {
        [BlubMember(0)]
        public uint MissionId { get; set; }

        [BlubMember(1)]
        public uint Unk1 { get; set; }

        [BlubMember(2)]
        public uint Rank { get; set; }

        [BlubMember(3)]
        public uint Unk2 { get; set; }

        [BlubMember(4)]
        public uint Unk3 { get; set; }

        [BlubMember(5)]
        public uint Time { get; set; }
    }
}
