using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.GameClub
{
    [BlubContract]
    public class PostDto
    {
        [BlubMember(0)]
        public uint Id { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string MarkId { get; set; }

        [BlubMember(2)]
        public uint Unk1 { get; set; }

        [BlubMember(3)]
        public uint AccountId { get; set; }

        [BlubMember(4)]
        public uint Level { get; set; }

        [BlubMember(5, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(6)]
        public Class Class { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Text { get; set; }

        [BlubMember(8, typeof(StringSerializer))]
        public string Timestamp { get; set; }

        [BlubMember(9)]
        public uint Unk2 { get; set; }

        [BlubMember(10)]
        public uint ParentPostId { get; set; }

        [BlubMember(11)]
        public byte Internal { get; set; }

        [BlubMember(12)]
        public uint ClanId { get; set; }
    }
}
