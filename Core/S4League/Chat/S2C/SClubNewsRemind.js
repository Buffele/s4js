var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readInt32LE(),
			unk2: packet.readInt32LE()
		}

		return deserialized
	},
	serialize: function(unk1, unk2) {
		var packet = new Packet()
		packet.writeInt32LE(unk1)
		packet.writeInt32LE(unk2)
		return packet.data.toBuffer()
	}
}