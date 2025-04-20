var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			playerId: packet.readUInt64LE(),
			reason: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(accountId, reason) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeUInt8(reason)
		return packet.data.toBuffer()
	}
}