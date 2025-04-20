var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			roomId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(roomId) {
		var packet = new Packet()
		packet.writeUInt32LE(roomId)
		return packet.data.toBuffer()
	}
}