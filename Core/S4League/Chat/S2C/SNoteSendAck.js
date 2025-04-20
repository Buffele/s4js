var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			success: packet.readInt32LE()
		}

		return deserialized
	},
	serialize: function(success) {
		var packet = new Packet()
		// TODO
		if(success) {
			packet.writeUInt32LE(0)
		} else {
			packet.writeUInt8(0xfe)
			packet.writeUInt8(0xff)
			packet.writeUInt8(0xff)
			packet.writeUInt8(0xff)
		}
		return packet.data.toBuffer()
	}
}