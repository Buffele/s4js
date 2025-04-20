var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			result: packet.readUInt32LE(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readProudString(),
			unk4: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(accountId, result, unk1, unk2, unk3, unk4) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeUInt32LE(result)
		packet.writeUInt32LE(unk1)
		packet.writeUInt32LE(unk2)
		packet.writeProudString(unk3)
		packet.writeProudString(unk4)
		return packet.data.toBuffer()
	}
}