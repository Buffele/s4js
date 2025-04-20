var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			playerId: packet.readUInt64LE(),
			unk: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(playerId, unk) {
		var packet = new Packet()
		packet.writeUInt64LE(playerId)
		packet.writeUInt32LE(unk)
		return packet.data.toBuffer()
	}
}