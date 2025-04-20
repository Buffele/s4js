var Packet = require('../../../Network/Packet')

// TODO: Get the Structure
module.exports = {
	deserialize: function(packet) {
		var deserialized = {

		}

		return deserialized
	},
	serialize: function(result, text) {
		var packet = new Packet()

		return packet.data.toBuffer()
	}
}