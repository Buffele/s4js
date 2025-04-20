using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class DeleteNoteDto
    {
        [BlubMember(0)]
        public ulong Id { get; set; }

        [BlubMember(1)]
        public ulong Id2 { get; set; }

        public DeleteNoteDto()
        { }

        public DeleteNoteDto(ulong id, ulong id2)
        {
            Id = id;
            Id2 = id2;
        }
    }
}
