var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(unk) {
		var packet = new Packet()
		packet.writeUInt32LE(unk)
		return packet.data.toBuffer()
	}
}
