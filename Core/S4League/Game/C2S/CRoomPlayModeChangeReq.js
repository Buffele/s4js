var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			mode: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(mode) {
		var packet = new Packet()
		packet.writeUInt8(mode)
		return packet.data.toBuffer()
	}
}