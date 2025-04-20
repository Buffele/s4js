var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt32LE(),
			playerId1: packet.readUInt64LE(),
			unk2: packet.readUInt32LE(),
			playerId2: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(playerId1, playerId2) {
		var packet = new Packet()
		packet.writeUInt32LE(1)
		packet.writeUInt64LE(playerId1)
		packet.writeUInt32LE(1)
		packet.writeUInt64LE(playerId2)
		return packet.data.toBuffer()
	}
}