var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			data: packet.readRemaining(),
		}

		return deserialized
	},
	serialize: function(data) {
		var packet = new Packet()
		packet.writeBuffer(data)
		return packet.data.toBuffer()
	}
}