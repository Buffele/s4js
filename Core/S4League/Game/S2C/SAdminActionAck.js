var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt8(),
			text: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(result, text) {
		var packet = new Packet()
		packet.writeUInt8(result)
		packet.writeProudString(text)
		return packet.data.toBuffer()
	}
}