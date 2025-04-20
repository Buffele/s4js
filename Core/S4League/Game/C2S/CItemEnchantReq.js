var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			itemId: packet.readUInt64LE(),
			unk: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(itemId, unk) {
		var packet = new Packet()
		packet.writeUInt64LE(itemId)
		packet.writeBuffer(unk)
		return packet.data.toBuffer()
	}
}