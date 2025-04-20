var Packet = require('../../../Network/Packet')

/*
TODO: Reverse it more...
0a 00 00 00
00 00 00 00
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			count: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(result, count) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeUInt32LE(count)
		return packet.data.toBuffer()
	}
}