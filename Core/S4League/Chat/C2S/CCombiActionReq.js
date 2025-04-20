var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			remove: packet.readUInt32LE(),
			accountId: packet.readUInt64LE(),
			name: packet.readProudString(),
			combiName: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(remove, accountId, name, combiName) {
		var packet = new Packet()
		packet.writeUInt32LE(remove)
		packet.writeUInt64LE(accountId)
		packet.writeProudString(name)
		packet.writeProudString(combiName)
		return packet.data.toBuffer()
	}
}