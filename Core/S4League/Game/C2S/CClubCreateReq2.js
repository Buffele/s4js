var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			name: packet.readProudString(),
			string1: packet.readProudString(),
			string2: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(name, string1, string2) {
		var packet = new Packet()
		packet.writeProudString(name)
		packet.writeProudString(string1)
		packet.writeProudString(string2)
		return packet.data.toBuffer()
	}
}