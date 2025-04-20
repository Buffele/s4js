using BlubLib.Serialization;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Game
{
    [BlubContract]
    public class RoomDto
    {
        [BlubMember(0)]
        public byte Id { get; set; }

        [BlubMember(1)]
        public bool IsPlaying { get; set; }

        [BlubMember(2)]
        public uint Rule { get; set; } //GameRule

        [BlubMember(3)]
        public byte Map { get; set; }

        [BlubMember(4)]
        public byte PlayerIn { get; set; }

        [BlubMember(5)]
        public byte PlayerLimit { get; set; }

        [BlubMember(6)]
        public uint WeaponLimit { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Password { get; set; }

        [BlubMember(8, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(9)]
        public byte Observers { get; set; }

        [BlubMember(10)]
        public byte ObserverLimit { get; set; }

        [BlubMember(11)]
        public uint Random { get; set; }

        [BlubMember(12)]
        public uint Settings { get; set; }

        [BlubMember(13)]
        public uint Unk1 { get; set; }

        [BlubMember(14)]
        public uint Unk2 { get; set; }

        public RoomDto()
        {
            Password = "";
            Name = "";
        }
    }
}
