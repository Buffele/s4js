var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			checksum: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(accountId, checksum) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeUInt32LE(checksum)
		return packet.data.toBuffer()
	}
}