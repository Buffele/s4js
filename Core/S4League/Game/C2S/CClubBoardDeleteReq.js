var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			postId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(postId) {
		var packet = new Packet()
		packet.writeUInt32LE(postId)
		return packet.data.toBuffer()
	}
}