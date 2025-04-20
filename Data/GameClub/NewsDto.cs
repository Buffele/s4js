using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.GameClub
{
    [BlubContract]
    public class NewsDto
    {
        [BlubMember(0)]
        public NewsType Type { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Key { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Timestamp { get; set; }
    }
}
