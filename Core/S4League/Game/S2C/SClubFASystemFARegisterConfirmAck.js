var Packet = require('../../../Network/Packet')

/*
00
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readUInt8(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk) {
		var packet = new Packet()
		packet.writeUInt8(unk)
		return packet.data.toBuffer()
	}
}