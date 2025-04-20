var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			from: packet.readUInt32LE(),
			to: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(from, to) {
		var packet = new Packet()
		packet.writeUInt32LE(from)
		packet.writeUInt32LE(to)
		return packet.data.toBuffer()
	}
}