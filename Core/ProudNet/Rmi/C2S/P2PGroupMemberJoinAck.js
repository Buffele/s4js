var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			groupHostId: packet.readUInt32LE(),
			memberHostId: packet.readUInt32LE(),
			eventId: packet.readUInt32LE(),
			localportReuseSuccess: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(groupHostId, memberHostId, eventId, localportReuseSuccess) {
		var packet = new Packet('E')
		packet.writeUInt32LE(groupHostId)
		packet.writeUInt32LE(memberHostId)
		packet.writeUInt32LE(eventId)
		packet.writeUInt8(localportReuseSuccess)
		return packet.data.toBuffer()
	}
}