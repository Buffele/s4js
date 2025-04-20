var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readBuffer(8), // TODO
			subject: packet.readProudString(),
			text: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(unk, subject, text) {
		var packet = new Packet()
		packet.writeBuffer(unk) // TODO
		packet.writeProudString(subject)
		packet.writeProudString(text)
		return packet.data.toBuffer()
	}
}