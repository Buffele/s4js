var Packet = require('../../../Network/Packet')

// TODO: Get all Result Codes
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(/*result*/) {
		var packet = new Packet()
		packet.writeUInt32LE(/*result*/0)
		return packet.data.toBuffer()
	}
}