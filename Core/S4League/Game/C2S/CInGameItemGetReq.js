var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			itemDropId: packet.readUInt64LE(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(itemDropId, remaining) {
		var packet = new Packet()
		packet.writeUInt64LE(itemDropId)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}