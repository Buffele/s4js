using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class ChaserUserDataDto
    {
        [BlubMember(0)]
        public float KillsAll { get; set; }

        [BlubMember(1)]
        public float Kills { get; set; }
    }
}
