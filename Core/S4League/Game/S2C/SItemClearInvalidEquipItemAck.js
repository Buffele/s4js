var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			count: packet.readUInt32LE(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet()
		packet.writeUInt32LE(0) // count
		return packet.data.toBuffer()
	}
}