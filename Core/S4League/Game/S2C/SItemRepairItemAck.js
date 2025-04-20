var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt8(),
			itemId: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(result, itemId) {
		var packet = new Packet()
		packet.writeUInt8(result)
		packet.writeUInt64LE(itemId)
		return packet.data.toBuffer()
	}
}