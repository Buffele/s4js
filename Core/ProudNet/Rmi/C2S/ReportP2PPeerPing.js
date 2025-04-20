var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			recentPing: packet.readInt32LE(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(hostId, recentPing, remaining) {
		var packet = new Packet('E')
		packet.writeUInt32LE(hostId)
		packet.writeUInt32LE(recentPing)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}