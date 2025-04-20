var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			itemId: packet.readUInt64LE(),
			targetItemId: packet.readUInt64LE(),
			result: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(itemId, targetItemId, result) {
		var packet = new Packet()
		packet.writeUInt64LE(itemId)
		packet.writeUInt64LE(targetItemId)
		packet.writeUInt32LE(result)
		return packet.data.toBuffer()
	}
}