using System.Net;
using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class EnterRoomInfoDto
    {
        [BlubMember(0)]
        public uint RoomId { get; set; }

        [BlubMember(1)]
        public GameState State { get; set; }

        [BlubMember(2)]
        public GameTimeState TimeState { get; set; }

        [BlubMember(3)]
        public uint TimeLimit { get; set; }

        [BlubMember(4)]
        public uint Unk1 { get; set; }

        [BlubMember(5)]
        public uint TimeSync { get; set; }

        [BlubMember(6)]
        public uint ScoreLimit { get; set; }

        [BlubMember(7)]
        public bool IsFriendly { get; set; }

        [BlubMember(8)]
        public bool IsBalanced { get; set; }

        [BlubMember(9)]
        public byte MinLevel { get; set; }

        [BlubMember(10)]
        public byte MaxLevel { get; set; }

        [BlubMember(11)]
        public byte ItemLimit { get; set; }

        [BlubMember(12)]
        public bool IsNoIntrusion { get; set; }

        [BlubMember(13)]
        public byte Unk2 { get; set; }

        [BlubMember(14, typeof(IPEndPointAddressStringSerializer))]
        public IPEndPoint RelayEndPoint { get; set; }

        [BlubMember(15)]
        public bool CreatedRoom { get; set; }

        public EnterRoomInfoDto()
        {
            RelayEndPoint = new IPEndPoint(0, 0);
            CreatedRoom = false;
        }
    }
}
