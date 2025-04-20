var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(name) {
		var packet = new Packet()
		packet.writeProudString(name)
		return packet.data.toBuffer()
	}
}