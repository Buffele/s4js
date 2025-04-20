var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			type: packet.readUInt32LE(),
			accountId: packet.readUInt64LE(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt16LE(),
			message: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(type, accountId, unk1, unk2, message) {
		var packet = new Packet()
		packet.writeUInt32LE(type)
		packet.writeUInt64LE(accountId)
		packet.writeUInt32LE(unk1)
		packet.writeUInt16LE(unk2)
		packet.writeProudString(message)
		return packet.data.toBuffer()
	}
}