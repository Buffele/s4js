var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clanId: packet.readUInt32LE(),
			postId: packet.readUInt32LE(),
			internal: packet.readUInt32LE(),
			text: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(clanId, postId, internal, text) {
		var packet = new Packet()
		packet.writeUInt32LE(clanId)
		packet.writeUInt32LE(postId)
		packet.writeUInt32LE(internal)
		packet.writeProudString(text)
		return packet.data.toBuffer()
	}
}