var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			slot: packet.readUInt8(),
			gender: packet.readUInt8(),
			unk: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(slot, gender, unk) {
		var packet = new Packet()
		packet.writeUInt8(slot)
		packet.writeUInt8(gender)
		packet.writeBuffer(unk)
		return packet.data.toBuffer()
	}
}