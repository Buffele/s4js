var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			unk: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(result) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeUInt32LE(0)
		return packet.data.toBuffer()
	}
}