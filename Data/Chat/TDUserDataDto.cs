using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class TDUserDataDto
    {
        [BlubMember(0)]
        public float WinRate { get; set; }

        [BlubMember(1)]
        public float Points { get; set; }

        [BlubMember(2)]
        public float MatchesWon { get; set; }

        [BlubMember(3)]
        public float DefensePoints { get; set; }

        [BlubMember(4)]
        public float OffensePoints { get; set; }

        [BlubMember(5)]
        public float KillRate { get; set; }

        [BlubMember(6)]
        public float HealPoints { get; set; }
    }
}
