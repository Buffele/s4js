var Packet = require('../../../Network/Packet')

/*
00 00 00 00 # unk1
00 00 00 00 # unk2
00 00 00 00 # unk3
00 00 00 00 # unk4
00 00 00 00 # unk5
03 00 00 00 # unk6
00 00 00 00 # unk7
01 00 00 00 # unk8
02 00 00 00 # unk9
*/

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			unk4: packet.readUInt32LE(),
			unk5: packet.readUInt32LE(),
			unk6: packet.readUInt32LE(),
			unk7: packet.readUInt32LE(),
			unk8: packet.readUInt32LE(),
			unk9: packet.readUInt32LE(),
		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet()
		packet.writeUInt32LE(0) // unk1
		packet.writeUInt32LE(0) // unk2
		packet.writeUInt32LE(0) // unk3
		packet.writeUInt32LE(0) // unk4
		packet.writeUInt32LE(0) // unk5
		packet.writeUInt32LE(3) // unk6
		packet.writeUInt32LE(0) // unk7
		packet.writeUInt32LE(1) // unk8
		packet.writeUInt32LE(2) // unk9
		return packet.data.toBuffer()
	}
}