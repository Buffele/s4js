var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			settings: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(settings) {
		var packet = new Packet()
		packet.writeUInt32LE(settings)
		return packet.data.toBuffer()
	}
}