var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			messages: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.messages.push({
				noteId: packet.readUInt64LE(),
				noteId2: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(messages) {
		var packet = new Packet()
		packet.writeUInt32LE(messages.length)
		for (i = 0; i < messages.length; i++) {
			var message = messages[i]
			packet.writeUInt64LE(message.noteId)
			packet.writeUInt32LE(message.noteId)
		}
		return packet.data.toBuffer()
	}
}