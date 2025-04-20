using BlubLib.Serialization;
using ProudNet.Serialization.Serializers;

namespace Netsphere.Network.Message.Relay
{
    [BlubContract]
    public class SLoginAckMessage : RelayMessage
    {
        [BlubMember(0)]
        public int Result { get; set; }

        public SLoginAckMessage()
        { }

        public SLoginAckMessage(int result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SEnterPlayerAckMessage : RelayMessage
    {
        [BlubMember(0)]
        public uint HostId { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string Name { get; set; }

        public SEnterPlayerAckMessage()
        {
            Name = "";
        }

        public SEnterPlayerAckMessage(uint hostId, ulong accountId, string name)
        {
            HostId = hostId;
            AccountId = accountId;
            Name = name;
        }
    }
}
