var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			mp: packet.readFloatLE()
		}

		return deserialized
	},
	serialize: function(mp) {
		var packet = new Packet()
		packet.writeFloatLE(mp)
		return packet.data.toBuffer()
	}
}