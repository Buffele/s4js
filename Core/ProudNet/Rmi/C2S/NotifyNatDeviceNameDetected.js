var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			string: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(string) {
		var packet = new Packet('E')
		packet.writeProudString(string)
		return packet.data.toBuffer()
	}
}