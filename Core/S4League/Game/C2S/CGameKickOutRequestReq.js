var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			startPlayerId: packet.readUInt64LE(),
			kickPlayerId: packet.readUInt64LE(),
			reason: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(startPlayerId, kickPlayerId, reason) {
		var packet = new Packet()
		packet.writeUInt64LE(startPlayerId)
		packet.writeUInt64LE(kickPlayerId)
		packet.writeUInt8(reason)
		return packet.data.toBuffer()
	}
}