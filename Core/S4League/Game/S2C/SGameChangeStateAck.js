var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			state: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(state) {
		var packet = new Packet()
		packet.writeUInt32LE(state)
		return packet.data.toBuffer()
	}
}