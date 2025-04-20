var Packet = require('../../../Network/Packet')

// TODO: Get Result Codes
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			itemId: packet.readUInt64LE(),
			enchantLevel: packet.readUInt32LE(),
			enchantMP: packet.readUInt32LE(),
			unk: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(result, itemId, enchantLevel, enchantMP) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeUInt64LE(itemId)
		packet.writeUInt32LE(enchantLevel)
		packet.writeUInt32LE(enchantMP)
		packet.writeUInt8(1) // unk
		return packet.data.toBuffer()
	}
}