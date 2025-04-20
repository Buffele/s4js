var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			success: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(success) {
		var packet = new Packet('E')
		packet.writeUInt8(success)
		return packet.data.toBuffer()
	}
}