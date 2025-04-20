var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			name: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(result, name) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeProudString(name)
		return packet.data.toBuffer()
	}
}