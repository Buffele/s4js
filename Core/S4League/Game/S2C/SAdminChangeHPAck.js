var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hp: packet.readFloatLE()
		}

		return deserialized
	},
	serialize: function(hp) {
		var packet = new Packet()
		packet.writeFloatLE(hp)
		return packet.data.toBuffer()
	}
}