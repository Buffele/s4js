var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			memberHostId: packet.readUInt32LE(),
			reason: packet.readUInt32LE() // ErrorType
		}

		return deserialized
	},
	serialize: function(memberHostId, reason) {
		var packet = new Packet('E')
		packet.writeUInt32LE(memberHostId)
		packet.writeUInt32LE(reason) // ErrorType
		return packet.data.toBuffer()
	}
}