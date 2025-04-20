using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class CaptainUserDataDto
    {
        [BlubMember(0)]
        public uint Kills { get; set; }

        [BlubMember(1)]
        public uint Dominations { get; set; }
    }
}
