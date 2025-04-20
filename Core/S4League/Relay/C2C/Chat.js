var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			message: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(message) {
		var packet = new Packet()
		packet.writeProudString(message)
		return packet.data.toBuffer()
	}
}