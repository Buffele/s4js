var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			// TODO
		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet()
		packet.writeUInt8(0x01)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x01)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0xbe)
		packet.writeUInt8(0x94)
		packet.writeUInt8(0x0f)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x03)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x01)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x1d)
		packet.writeUInt8(0xcf)
		packet.writeUInt8(0xb3)
		packet.writeUInt8(0x41)
		packet.writeUInt8(0x19)
		packet.writeUInt8(0x10)
		packet.writeUInt8(0xac)
		packet.writeUInt8(0x57)
		packet.writeUInt8(0x4b)
		return packet.data.toBuffer()
	}
}