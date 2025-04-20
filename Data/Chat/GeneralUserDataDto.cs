using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class GeneralUserDataDto
    {
        [BlubMember(0)]
        public float KillDeathRate { get; set; }

        [BlubMember(1)]
        public float TdPoints { get; set; }

        [BlubMember(2)]
        public float DmPoints { get; set; }

        [BlubMember(3)]
        public float ChaserSurvivabilityRate { get; set; }

        [BlubMember(4)]
        public float BrPoints { get; set; }

        [BlubMember(5)]
        public float CaptainPoints { get; set; }

        [BlubMember(6)]
        public float SiegePoints { get; set; }

        [BlubMember(7)]
        public float ArenaPoints { get; set; }
    }
}
