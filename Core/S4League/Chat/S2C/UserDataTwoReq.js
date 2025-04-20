var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			result: packet.readUInt32LE() // TODO
		}

		return deserialized
	},
	serialize: function(accountId/*, result*/) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeUInt32LE(/*result*/1) // TODO
		return packet.data.toBuffer()
	}
}