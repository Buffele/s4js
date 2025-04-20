var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			playerId: packet.readUInt64LE(),
			name: packet.readProudString(),
			reason: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(playerId, name, reason) {
		var packet = new Packet()
		packet.writeUInt64LE(playerId)
		packet.writeProudString(name)
		packet.writeUInt8(reason)
		return packet.data.toBuffer()
	}
}