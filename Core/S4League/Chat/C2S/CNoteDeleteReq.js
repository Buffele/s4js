var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			messages: []
		}

		var count = packet.readUInt32LE() // TODO: Max 8?
		for (var i = 0; i < count; i++) {
			deserialized.messages.push({
				noteId: packet.readUInt64LE()
			})
		}

		return deserialized
	},
	serialize: function(messages) {
		var packet = new Packet()
		packet.writeUInt32LE(messages.length)
		for (var i = 0; i < messages.length; i++) {
			packet.writeUInt64LE(messages[i].noteId)
		}
		return packet.data.toBuffer()
	}
}