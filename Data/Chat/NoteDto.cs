using BlubLib.Serialization;
using Netsphere.Network.Serializers;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Chat
{
    public enum NoteType : uint
    {
	    PrivateMessage = 0,
        ClanActivity = 1,
        ClanMessage = 2,
        Nothing = 3,
        SystemMessage = 4,
        UnopenedGift = 5,
        Wish = 6,
        WishRejected = 7,
        OpenedGift = 8,
        PublicMessage = 9
    }  

    [BlubContract]
    public class NoteDto
    {
        [BlubMember(0)]
        public ulong Id { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2, typeof(IntBooleanSerializer))]
        public NoteType Type { get; set; }

        [BlubMember(3)]
        public ulong SenderAccountId { get; set; }

        [BlubMember(4)]
        public ulong ReceiverAccountId { get; set; }

        [BlubMember(5, typeof(StringSerializer))]
        public string Subject { get; set; }

        [BlubMember(6)]
        public uint ReadCount { get; set; }

        [BlubMember(7)]
        public bool OpenedGift { get; set; }

        [BlubMember(8)]
        public byte DaysLeft { get; set; }

        public NoteDto()
        {
            Name = "";
            Subject = "";
        }
    }
}
