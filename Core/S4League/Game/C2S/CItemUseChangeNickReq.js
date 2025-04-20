var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			itemId: packet.readUInt64LE(),
			name: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(itemId, name) {
		var packet = new Packet()
		packet.writeUInt64LE(itemId)
		packet.writeProudString(name)
		return packet.data.toBuffer()
	}
}