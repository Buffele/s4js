var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			reason: packet.readUInt32LE() // ErrorType
		}

		return deserialized
	},
	serialize: function(hostId, reason) {
		var packet = new Packet('E')
		packet.writeUInt32LE(hostId)
		packet.writeUInt32LE(reason) // ErrorType
		return packet.data.toBuffer()
	}
}