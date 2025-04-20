var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			groupHostId: packet.readUInt32LE(),
			memberHostId: packet.readUInt32LE(),
			customField: packet.readProudBuffer(),
			eventId: packet.readUInt32LE(),
			p2pFirstFrameNumber: packet.readUInt32LE(),
			connectionMagicNumber: packet.readBuffer(16),
			enableDirectP2P: packet.readUInt8(),
			bindport: packet.readInt32LE()
		}

		return deserialized
	},
	serialize: function(groupHostId, memberHostId, customField, eventId, p2pFirstFrameNumber, connectionMagicNumber, enableDirectP2P, bindport) {
		var packet = new Packet('E')
		packet.writeUInt32LE(groupHostId)
		packet.writeUInt32LE(memberHostId)
		packet.writeProudBuffer(customField)
		packet.writeUInt32LE(eventId)
		packet.writeUInt32LE(p2pFirstFrameNumber)
		packet.writeBuffer(connectionMagicNumber)
		packet.writeUInt8(+!!enableDirectP2P)
		packet.writeInt32LE(bindport)
		return packet.data.toBuffer()
	}
}