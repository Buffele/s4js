var Packet = require('../../../Network/Packet')

// TODO: Unk... Nothing happens...
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(/*unk1, unk2*/) {
		var packet = new Packet()
		packet.writeUInt32LE(/*unk1*/0)
		packet.writeUInt32LE(/*unk2*/0)
		return packet.data.toBuffer()
	}
}