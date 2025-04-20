var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			itemId: packet.readUInt64LE(),
			success: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(itemId, success) {
		var packet = new Packet()
		packet.writeUInt64LE(itemId)
		packet.writeUInt8(+!success)
		return packet.data.toBuffer()
	}
}