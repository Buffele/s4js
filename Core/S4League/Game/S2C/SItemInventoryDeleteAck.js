var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			itemId: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(itemId) {
		var packet = new Packet()
		packet.writeUInt64LE(itemId)
		return packet.data.toBuffer()
	}
}