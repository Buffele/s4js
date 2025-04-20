var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(unk) {
		var packet = new Packet()
		packet.writeProudString(unk)
		return packet.data.toBuffer()
	}
}