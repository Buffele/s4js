var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			coinId: packet.readUInt32LE(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(coinId) {
		var packet = new Packet()
		packet.writeUInt32LE(0) // result
		packet.writeUInt32LE(coinId)
		packet.writeUInt32LE(0) // unk1
		packet.writeUInt32LE(0) // unk2
		packet.writeUInt8(0) // unk3
		return packet.data.toBuffer()
	}
}