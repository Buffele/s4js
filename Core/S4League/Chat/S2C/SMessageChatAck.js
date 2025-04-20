var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clan: packet.readUInt32LE(),
			accountId: packet.readUInt64LE(),
			name: packet.readProudString(),
			message: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(clan, accountId, name, message) {
		var packet = new Packet()
		packet.writeUInt32LE(clan)
		packet.writeUInt64LE(accountId)
		packet.writeProudString(name)
		packet.writeProudString(message)
		return packet.data.toBuffer()
	}
}