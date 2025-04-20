var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			playerId: packet.readUInt64LE(),
			duration: packet.readUInt32LE() // in days: 4 weeks -> 28 days, 5 weeks -> 35 days... Per week 7 days ;)
		}

		return deserialized
	},
	serialize: function(playerId, duration) {
		var packet = new Packet()
		packet.writeUInt64LE(playerId)
		packet.writeUInt32LE(duration)
		return packet.data.toBuffer()
	}
}