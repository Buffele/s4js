var Packet = require('../../../Network/Packet')

// TODO: After Result
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			exp: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(exp) {
		var packet = new Packet()
		packet.writeUInt32LE(exp)
		return packet.data.toBuffer()
	}
}