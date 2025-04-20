var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			itemId: packet.readUInt64LE(),
			effectId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(result, itemId, effectId) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeUInt64LE(itemId)
		packet.writeUInt32LE(effectId)
		return packet.data.toBuffer()
	}
}