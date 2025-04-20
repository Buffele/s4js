var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			collectBookId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(playerId, collectBookId) {
		var packet = new Packet()
		packet.writeUInt64LE(playerId)
		packet.writeUInt32LE(collectBookId)
		return packet.data.toBuffer()
	}
}