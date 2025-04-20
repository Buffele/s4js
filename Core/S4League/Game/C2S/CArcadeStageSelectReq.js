var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			stage: packet.readUInt8(),
			unk: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(stage, unk) {
		var packet = new Packet()
		packet.writeUInt8(stage)
		packet.writeUInt8(unk)
		return packet.data.toBuffer()
	}
}