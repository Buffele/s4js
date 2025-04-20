var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readInt8(),
			unk2: packet.readInt8(),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(unk1, unk2, remaining) {
		var packet = new Packet()
		packet.writeInt8(unk1)
		packet.writeInt8(unk2)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}