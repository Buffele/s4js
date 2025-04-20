var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			memberHostId: packet.readUInt32LE(),
			groupHostId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(memberHostId, groupHostId) {
		var packet = new Packet('E')
		packet.writeUInt32LE(memberHostId)
		packet.writeUInt32LE(groupHostId)
		return packet.data.toBuffer()
	}
}