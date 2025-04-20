var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			date: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(date) {
		var packet = new Packet()
		packet.writeProudString(date)
		return packet.data.toBuffer()
	}
}