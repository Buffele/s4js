var Packet = require('../../../Network/Packet')

// TODO: No?
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt32LE(),
			sessionId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(accountId, sessionId) {
		var packet = new Packet()
		packet.writeUInt32LE(accountId)
		packet.writeUInt32LE(sessionId)
		return packet.data.toBuffer()
	}
}