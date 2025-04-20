using BlubLib.Serialization;

namespace Netsphere.Network.Data.GameRule
{
    [BlubContract]
    public class MixedTeamDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public Team Team { get; set; }

        public MixedTeamDto()
        { }

        public MixedTeamDto(ulong accountId, Team team)
        {
            AccountId = accountId;
            Team = team;
        }
    }
}
