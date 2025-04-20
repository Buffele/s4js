var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			subState: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(subState) {
		var packet = new Packet()
		packet.writeUInt32LE(subState)
		return packet.data.toBuffer()
	}
}