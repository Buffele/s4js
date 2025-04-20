var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			round: packet.readUInt32LE(),
			unk1: packet.readUInt64LE(),
			playerId1: packet.readUInt64LE(),
			unk2: packet.readUInt64LE(),
			playerId2: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(round, playerId1, playerId2) {
		var packet = new Packet()
		packet.writeUInt32LE(round)
		packet.writeUInt64LE(1)
		packet.writeUInt64LE(playerId1)
		packet.writeUInt64LE(1)
		packet.writeUInt64LE(playerId2)
		return packet.data.toBuffer()
	}
}