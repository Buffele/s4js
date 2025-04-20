var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(accountId) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		return packet.data.toBuffer()
	}
}