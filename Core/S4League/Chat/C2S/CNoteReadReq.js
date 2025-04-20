var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			noteId: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(noteId) {
		var packet = new Packet()
		packet.writeUInt64LE(noteId)
		return packet.data.toBuffer()
	}
}