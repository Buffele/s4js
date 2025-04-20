var Packet = require('../../../Network/Packet')

/*
00 00 00 00
00 00 00 00
02 00 00 00
01
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			unk4: packet.readUInt8(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk1, unk2, unk3, unk4) {
		var packet = new Packet()
		packet.writeUInt32LE(unk1)
		packet.writeUInt32LE(unk2)
		packet.writeUInt32LE(unk3)
		packet.writeUInt8(unk4)
		return packet.data.toBuffer()
	}
}