var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			coinId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(coinId) {
		var packet = new Packet()
		packet.writeUInt32LE(coinId)
		return packet.data.toBuffer()
	}
}