using BlubLib.Serialization;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class NoteGiftDto
    {
        [BlubMember(0)]
        public ItemNumber ItemNumber { get; set; }

        [BlubMember(1)]
        public ItemPriceType PriceType { get; set; }

        [BlubMember(2)]
        public ItemPeriodType PeriodType { get; set; }

        [BlubMember(3)]
        public ushort Period { get; set; }

        [BlubMember(4)]
        public byte Unk5 { get; set; }

        [BlubMember(5)]
        public int Unk6 { get; set; }

        [BlubMember(6)]
        public byte Unk7 { get; set; }

        // TODO: May be this...
        /*
        unk1: packet.readUInt32LE(),
		unk2: packet.readUInt32LE(),
		unk3: packet.readUInt32LE(),
		unk4: packet.readUInt32LE(),
		unk5: packet.readUInt32LE(),
		unk6: packet.readUInt8(),
		unk7: packet.readUInt32LE()




        packet.writeUInt32LE(0)
		packet.writeUInt32LE(0)
		packet.writeUInt32LE(1)
		packet.writeUInt32LE(0)
		packet.writeUInt32LE(0)
		packet.writeUInt8(1)
		packet.writeUInt32LE(1)
        */
    }
}