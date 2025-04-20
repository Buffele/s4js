var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			enable: packet.readInt8()
		}

		return deserialized
	},
	serialize: function(enable) {
		var packet = new Packet('E')
		packet.writeInt8(enable)
		return packet.data.toBuffer()
	}
}