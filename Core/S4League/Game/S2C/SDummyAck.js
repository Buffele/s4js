var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk) {
		var packet = new Packet()
		packet.writeBuffer(unk)
		return packet.data.toBuffer()
	}
}