var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readInt8(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk, remaining) {
		var packet = new Packet()
		packet.writeInt8(unk)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}