var Packet = require('../../../Network/Packet')

// TODO: Does the client sends something?
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet()
		return packet.data.toBuffer()
	}
}