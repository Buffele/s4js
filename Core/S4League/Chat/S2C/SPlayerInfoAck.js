var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			name: packet.readProudString(),
			unk1: packet.readUInt32LE(),
			exp: packet.readUInt32LE(),
			isGM: packet.readUInt8(),
			server: packet.readInt32LE(),
			channel: packet.readInt32LE(),
			room: packet.readInt32LE(),
			clanId: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(accountId, name, exp, isGM, server, channel, room, clanId) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeProudString(name)
		packet.writeUInt32LE(0) // unk1
		packet.writeUInt32LE(exp)
		packet.writeUInt8(isGM)
		packet.writeInt32LE(server)
		packet.writeInt32LE(channel)
		packet.writeInt32LE(room)
		packet.writeUInt32LE(clanId)
		packet.writeUInt32LE(28) // unk2
		packet.writeUInt32LE(9) // unk3
		return packet.data.toBuffer()
	}
}