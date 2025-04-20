var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			type: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(type) {
		var packet = new Packet()
		packet.writeUInt8(type) // type or team | 1, 2
		return packet.data.toBuffer()
	}
}