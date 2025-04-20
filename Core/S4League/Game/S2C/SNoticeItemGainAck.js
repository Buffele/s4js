var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			type: packet.readUInt32LE(),
			name: packet.readProudString(),
			playerId: packet.readUInt64LE(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt16LE(),
			unk3: packet.readUInt32LE(),
			unk4: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(name, playerId) {
		var packet = new Packet()
		packet.writeUInt32LE(1) // type
		packet.writeProudString(name)
		packet.writeUInt64LE(playerId)

		packet.writeUInt8(0x90)
		packet.writeUInt8(0x94)
		packet.writeUInt8(0x0f)
		packet.writeUInt8(0x00) // unk1 | 1021072

		packet.writeUInt8(0x03)
		packet.writeUInt8(0x00) // unk2 | type

		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x1e)
		packet.writeUInt8(0x00) // unk3 | 1966080

		packet.writeUInt8(0x1d)
		packet.writeUInt8(0xcf)
		packet.writeUInt8(0xb3)
		packet.writeUInt8(0x41) // unk4 | 1102303005
		return packet.data.toBuffer()
	}
}