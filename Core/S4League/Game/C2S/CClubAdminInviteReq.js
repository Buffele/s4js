var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			playerId: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(playerId) {
		var packet = new Packet()
		packet.writeUInt64LE(playerId)
		return packet.data.toBuffer()
	}
}