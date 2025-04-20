var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clan: packet.readUInt32LE(),
			message: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(clan, message) {
		var packet = new Packet()
		packet.writeUInt32LE(clan)
		packet.writeProudString(message)
		return packet.data.toBuffer()
	}
}