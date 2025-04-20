var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			reason: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(reason) {
		var packet = new Packet()
		packet.writeUInt8(reason)
		return packet.data.toBuffer()
	}
}