var Packet = require('../../Network/Packet')

// TODO: Check Structure!
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(remaining) {
		var packet = new Packet('E')
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}