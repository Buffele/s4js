var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(hostId, remaining) {
		var packet = new Packet('E')
		packet.writeUInt32LE(hostId)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}