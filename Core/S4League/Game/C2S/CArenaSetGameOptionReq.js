var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			options: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(options) {
		var packet = new Packet()
		packet.writeUInt32LE(options)
		return packet.data.toBuffer()
	}
}