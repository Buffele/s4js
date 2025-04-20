var Packet = require('../../Network/Packet')

// TODO: Check Structure!
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clientOldLocalTime: packet.readInt64LE(),
			serverLocalTime: packet.readInt64LE(),
			serverUdpRecentPing: packet.readInt32LE(),
			recentFrameRate: packet.readDoubleLE()
		}

		return deserialized
	},
	serialize: function(clientOldLocalTime, serverLocalTime, serverUdpRecentPing, recentFrameRate) {
		var packet = new Packet('E')
		packet.writeInt64LE(clientOldLocalTime)
		packet.writeInt64LE(serverLocalTime)
		packet.writeInt32LE(serverUdpRecentPing)
		packet.writeDoubleLE(recentFrameRate)
		return packet.data.toBuffer()
	}
}