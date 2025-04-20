var Packet = require('../../../Network/Packet')

/*
ff ff ff ff
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readInt32LE(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk) {
		var packet = new Packet()
		packet.writeInt32LE(unk)
		return packet.data.toBuffer()
	}
}