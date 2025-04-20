var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			itemId: packet.readUInt64LE(),
			targetItemId: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(itemId, targetItemId) {
		var packet = new Packet()
		packet.writeUInt64LE(itemId)
		packet.writeUInt64LE(targetItemId)
		return packet.data.toBuffer()
	}
}