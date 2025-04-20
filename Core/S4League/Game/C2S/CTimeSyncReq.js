var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			time: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(time) {
		var packet = new Packet()
		packet.writeUInt32LE(time)
		return packet.data.toBuffer()
	}
}