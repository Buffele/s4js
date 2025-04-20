using BlubLib.Serialization;
using ProudNet.Serializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class ClubPlayerDto
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public uint Unk1 { get; set; }

        [BlubMember(3)]
        public uint EXP { get; set; }

        [BlubMember(4)]
        public bool IsGM { get; set; }

        [BlubMember(5)]
        public int Server { get; set; }

        [BlubMember(6)]
        public int Channel { get; set; }

        [BlubMember(7)]
        public int Room { get; set; }

        [BlubMember(8)]
        public uint ClanId { get; set; }

        [BlubMember(9)]
        public uint Unk2 { get; set; }

        [BlubMember(10)]
        public uint Unk3 { get; set; }
    }
}
