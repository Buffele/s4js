var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(id) {
		var packet = new Packet()
		packet.writeUInt32LE(id)
		return packet.data.toBuffer()
	}
}