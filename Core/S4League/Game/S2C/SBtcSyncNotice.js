var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet()
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		return packet.data.toBuffer()
	}
}