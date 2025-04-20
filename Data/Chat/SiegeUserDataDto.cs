using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class SiegeUserDataDto
    {
        [BlubMember(0)]
        public float WinRate { get; set; }

        [BlubMember(1)]
        public float CapturePoints { get; set; }

        [BlubMember(2)]
        public float BattlePoints { get; set; }

        [BlubMember(3)]
        public float MainCoreCapturePoints { get; set; }

        [BlubMember(4)]
        public float ItemObtainPoints { get; set; }
    }
}
