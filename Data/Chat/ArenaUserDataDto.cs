using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class ArenaUserDataDto
    {
        [BlubMember(0)]
        public float WinRate { get; set; }

        [BlubMember(1)]
        public float KillDeathRate { get; set; }

        [BlubMember(2)]
        public float KillDeathRatePercentage { get; set; }

        [BlubMember(3)]
        public float DoubleKillRate { get; set; }

        [BlubMember(4)]
        public float TripleKillRate { get; set; }

        [BlubMember(5)]
        public uint ShortestKillTime { get; set; }

        [BlubMember(6)]
        public uint LeaderShowdowns { get; set; }

        [BlubMember(7)]
        public uint LeaderKills { get; set; }
    }
}
