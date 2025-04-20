using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class BRUserDataDto
    {
        [BlubMember(0)]
        public uint FirstPlaceKills { get; set; }

        [BlubMember(1)]
        public uint FirstPlace { get; set; }
    }
}
