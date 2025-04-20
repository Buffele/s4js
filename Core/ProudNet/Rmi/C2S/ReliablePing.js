var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			recentFrameRate: packet.readFloatLE()
		}

		return deserialized
	},
	serialize: function(recentFrameRate) {
		var packet = new Packet('E')
		packet.writeFloatLE(recentFrameRate)
		return packet.data.toBuffer()
	}
}