using BlubLib.Serialization;
using Netsphere.Network.Data.Relay;
using Netsphere.Network.Serializers;
using ProudNet.Serialization.Serializers;

namespace Netsphere.Network.Message.Relay
{
    [BlubContract]
    public class CLoginReqMessage : RelayMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2, typeof(RoomLocationSerializer))]
        public RoomLocation RoomLocation { get; set; }

        [BlubMember(3)]
        public bool CreatedRoom { get; set; }
    }

    [BlubContract]
    public class CNotifyInfoReqMessage : RelayMessage
    {
        [BlubMember(0)]
        public uint HostId { get; set; }

        [BlubMember(1, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }
}