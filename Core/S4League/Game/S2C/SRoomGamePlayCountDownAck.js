var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(exp) {
		var packet = new Packet()
		packet.writeUInt8(0xac)
		packet.writeUInt8(0x0d)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		return packet.data.toBuffer()
	}
}