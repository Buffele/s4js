using BlubLib.Serialization;

namespace Netsphere.Network.Data.GameClub
{
    [BlubContract]
    public class AdminGradeChangeDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public Class Class { get; set; }
    }
}
