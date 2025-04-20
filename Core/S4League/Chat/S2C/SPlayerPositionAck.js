var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			server: packet.readInt32LE(),
			channel: packet.readInt32LE(),
			room: packet.readInt32LE(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(accountId, server, channel, room) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeInt32LE(server)
		packet.writeInt32LE(channel)
		packet.writeInt32LE(room)
		packet.writeUInt32LE(0) // unk1
		packet.writeUInt32LE(20) // unk2
		packet.writeUInt32LE(18) // unk3
		return packet.data.toBuffer()
	}
}