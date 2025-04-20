using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class DMUserDataDto
    {
        [BlubMember(0)]
        public float WinRate { get; set; }

        [BlubMember(1)]
        public float KillDeathRatePercentage { get; set; }

        [BlubMember(2)]
        public float KillDeathRate { get; set; }

        [BlubMember(3)]
        public float KillRate { get; set; }

        [BlubMember(4)]
        public float AssistPoints { get; set; }

        [BlubMember(5)]
        public float HealPoints { get; set; }
    }
}
