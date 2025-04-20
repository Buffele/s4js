var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(result) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		return packet.data.toBuffer()
	}
}