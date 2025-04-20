var Packet = require('../../../Network/Packet')

// TODO: Not sure about the structure
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			itemId: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(result, itemId) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeUInt64LE(itemId)
		return packet.data.toBuffer()
	}
}