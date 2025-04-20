using BlubLib.Serialization;

namespace Netsphere.Network.Data.GameRule
{
    [BlubContract]
    public class PlayerNameTag
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public uint NametagId { get; set; }

        public PlayerNameTag()
        {

        }

        public PlayerNameTag(ulong accountId, uint nametagId)
        {
            AccountId = accountId;
            NametagId = nametagId;
        }
    }
}
