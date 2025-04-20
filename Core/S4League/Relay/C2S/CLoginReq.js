var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			name: packet.readProudString(),
			sessionHash: packet.readProudString(),
			tunnelId: packet.readUInt32LE(),
			createdRoom: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(accountId, name, sessionHash, tunnelId, createdRoom) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeProudString(name)
		packet.writeProduString(sessionHash)
		packet.writeUInt32LE(tunnelId)
		packet.writeUInt8(createdRoom)
		return packet.data.toBuffer()
	}
}