var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			itemId: packet.readUInt64LE(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			effectId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(itemId, unk1, unk2, effectId) {
		var packet = new Packet()
		packet.writeUInt64LE(itemId)
		packet.writeUInt32LE(unk1)
		packet.writeUInt32LE(unk2)
		packet.writeUInt32LE(effectId)
		return packet.data.toBuffer()
	}
}