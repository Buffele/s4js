var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			type: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(type) {
		var packet = new Packet()
		packet.writeUInt32LE(type)
		return packet.data.toBuffer()
	}
}