var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			channelId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(channelId) {
		var packet = new Packet()
		packet.writeUInt32LE(channelId)
		return packet.data.toBuffer()
	}
}