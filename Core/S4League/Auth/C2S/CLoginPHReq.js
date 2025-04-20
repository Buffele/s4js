var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			userId: packet.readProudString(),
			unk1: packet.readProudString(),
			unk2: packet.readProudString(),
			unk3: packet.readProudString(),
			unk4: packet.readUInt32LE(),
			unk5: packet.readUInt32LE(),
			unk6: packet.readUInt32LE(),
			unk7: packet.readProudString(),
			unk8: packet.readUInt32LE(),
			unk9: packet.readProudString(),
			unk10: packet.readProudString(),
			unk11: packet.readProudString(),
			unk12: packet.readProudString(),
			unk13: packet.readProudString(),
			unk14: packet.readProudString(),
			token: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(userId, unk1, unk2, unk3, unk4, unk5, unk6, unk7, unk8, unk9, unk10, unk11, unk12, unk13, unk14, token) {
		var packet = new Packet()
		packet.writeProudString(userId)
		packet.writeProudString(unk1)
		packet.writeProudString(unk2)
		packet.writeProudString(unk3)
		packet.writeUInt32LE(unk4)
		packet.writeUInt32LE(unk5)
		packet.writeUInt32LE(unk6)
		packet.writeProudString(unk7)
		packet.writeUInt32LE(unk8)
		packet.writeProudString(unk9)
		packet.writeProudString(unk10)
		packet.writeProudString(unk11)
		packet.writeProudString(unk12)
		packet.writeProudString(unk13)
		packet.writeProudString(unk14)
		packet.writeProudString(token)
		return packet.data.toBuffer()
	}
}