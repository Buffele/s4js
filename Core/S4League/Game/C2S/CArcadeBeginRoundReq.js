var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readUInt8(),
			stage: packet.readUInt8(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk, stage, remaining) {
		var packet = new Packet()
		packet.writeUInt8(unk)
		packet.writeUInt8(stage)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}