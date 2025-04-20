var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(hostId) {
		var packet = new Packet('E')
		packet.writeUInt32LE(hostId)
		return packet.data.toBuffer()
	}
}