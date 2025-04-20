var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			receiver: packet.readProudString(),
			message: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(receiver, message) {
		var packet = new Packet()
		packet.writeProudString(receiver)
		packet.writeProudString(message)
		return packet.data.toBuffer()
	}
}