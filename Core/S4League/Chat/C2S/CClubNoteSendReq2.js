var Packet = require('../../../Network/Packet')

// TODO
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(remaining) {
		var packet = new Packet()
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}