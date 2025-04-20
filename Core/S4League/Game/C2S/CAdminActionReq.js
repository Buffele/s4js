var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			text: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(text) {
		var packet = new Packet()
		packet.writeProudString(text)
		return packet.data.toBuffer()
	}
}