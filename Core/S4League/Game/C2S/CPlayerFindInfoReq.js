var Packet = require('../../../Network/Packet')

// TODO: Don't know
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			name: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(name) {
		var packet = new Packet()
		packet.writeProudString(name)
		return packet.data.toBuffer()
	}
}