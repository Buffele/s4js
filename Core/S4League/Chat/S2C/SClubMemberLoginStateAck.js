var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			state: packet.readUInt32LE(),
			accountId: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(state, accountId) {
		var packet = new Packet()
		packet.writeUInt32LE(state)
		packet.writeUInt64LE(accountId)
		return packet.data.toBuffer()
	}
}