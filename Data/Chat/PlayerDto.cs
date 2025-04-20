using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class PlayerDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public uint Unk { get; set; }

        [BlubMember(3)]
        public uint EXP { get; set; }

        [BlubMember(4)]
        public bool IsGM { get; set; }

        public PlayerDto()
        {
            Name = "";
        }

        public PlayerDto(ulong accountId, string name, uint exp, bool isGM)
        {
            AccountId = accountId;
            Name = name;
            Unk = 0;
            EXP = exp;
            IsGM = isGM;
        }
    }
}
