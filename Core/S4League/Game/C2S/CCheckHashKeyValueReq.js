var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			checksum: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(checksum) {
		var packet = new Packet()
		packet.writeProudString(checksum)
		return packet.data.toBuffer()
	}
}