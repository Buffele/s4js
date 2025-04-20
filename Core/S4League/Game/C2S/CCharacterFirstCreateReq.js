var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			name: packet.readProudString(),
			unk: packet.readRemaining() // TODO: Avatar shit etc
		}

		return deserialized
	},
	serialize: function(name, unk) {
		var packet = new Packet()
		packet.writeProudString(name)
		packet.writeBuffer(unk)
		return packet.data.toBuffer()
	}
}