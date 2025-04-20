var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			udpMessageTrialCount: packet.readUInt32LE(),
			udpMessageSuccessCount: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(hostId, udpMessageTrialCount, udpMessageSuccessCount) {
		var packet = new Packet('E')
		packet.writeUInt32LE(hostId)
		packet.writeUInt32LE(udpMessageTrialCount)
		packet.writeUInt32LE(udpMessageSuccessCount)
		return packet.data.toBuffer()
	}
}