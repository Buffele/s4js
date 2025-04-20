using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class NoteContentDto
    {
        [BlubMember(0)]
        public ulong Id { get; set; }

        [BlubMember(1)]
        public ulong Id2 { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Text { get; set; }

        [BlubMember(3)]
        public NoteGiftDto Gift { get; set; }

        public NoteContentDto()
        {
            Text = "";
            Gift = new NoteGiftDto();
        }
    }
}
