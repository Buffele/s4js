var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			comment: packet.readProudBuffer()
		}

		return deserialized
	},
	serialize: function(comment) {
		var packet = new Packet('E')
		packet.writeProudBuffer(comment)
		return packet.data.toBuffer()
	}
}