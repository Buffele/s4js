var Packet = require('../../../Network/Packet')

/*
01 00 00 00 // stage
b6 0c d2 00 00 00 00 00 // account id
1d 00 00 00 // points 1
73 00 00 00 // points 2
cf 0e 00 00 // points 3
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(remaining) {
		var packet = new Packet()
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}