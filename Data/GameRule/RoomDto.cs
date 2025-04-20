using BlubLib.Serialization;
using Netsphere.Network.Serializers;
using ProudNet.Serializers;
using System;

namespace Netsphere.Network.Data.GameRule
{
    [BlubContract]
    public class RoomDto
    {
        [BlubMember(0)]
        public uint Rule { get; set; }

        [BlubMember(1)]
        public byte Map { get; set; }

        [BlubMember(2)]
        public byte PlayerLimit { get; set; }

        [BlubMember(3)]
        public ushort ScoreLimit { get; set; }

        [BlubMember(4)]
        public uint Unk1 { get; set; }

        [BlubMember(5, typeof(TimeSpanSerializer))]
        public TimeSpan TimeLimit { get; set; }

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
        public uint Unk2 { get; set; }

        [BlubMember(12)]
        public byte Unk3 { get; set; }

        [BlubMember(13)]
        public uint MissionId { get; set; }

        [BlubMember(14)]
        public byte Unk4 { get; set; }

        public RoomDto()
        {
            Password = "";
            Name = "";
        }
    }
}
