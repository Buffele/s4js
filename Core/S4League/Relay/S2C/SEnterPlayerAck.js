var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			accountId: packet.readUInt64LE(),
			name: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(hostId, accountId, name) {
		var packet = new Packet()
		packet.writeUInt32LE(hostId)
		packet.writeUInt64LE(accountId)
		packet.writeProudString(name)
		return packet.data.toBuffer()
	}
}