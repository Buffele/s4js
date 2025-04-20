using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.GameClub
{
    [BlubContract]
    public class ClanDto
    {
        [BlubMember(0)]
        public uint Id { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string MarkId { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Master { get; set; }

        [BlubMember(4)]
        public Class Class { get; set; }

        [BlubMember(5)]
        public uint Points { get; set; }

        [BlubMember(6)]
        public uint Rank { get; set; }
        
        [BlubMember(7, typeof(StringSerializer))]
        public string CreationDate { get; set; }

        [BlubMember(8)]
        public uint MemberCount { get; set; }

        [BlubMember(9)]
        public ActivityArea ActivityArea { get; set; }

        [BlubMember(10)]
        public ActivityPurpose ActivityPurpose { get; set; }

        [BlubMember(11, typeof(StringSerializer))]
        public string Introduction { get; set; }
    }
}
