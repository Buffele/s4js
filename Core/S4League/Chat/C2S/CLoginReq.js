var Packet = require('../../../Network/Packet')
var HashUtil = require('../../HashUtil')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			name: packet.readProudString(),
			sessionId: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(data) {
		var packet = new Packet()
		packet.writeUInt64LE(data.accountId)
		packet.writeProudString(data.name)
		packet.writeProudString(data.sessionId)
		return packet.data.toBuffer()
	}
}