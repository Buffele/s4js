var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			round: packet.readUInt32LE(),
			playerId: packet.readUInt64LE(),
			event: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(round, playerId, event) {
		var packet = new Packet()
		packet.writeUInt32LE(round)
		packet.writeUInt64LE(playerId)
		packet.writeUInt32LE(event)
		return packet.data.toBuffer()
	}
}