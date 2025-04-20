var Packet = require('../../Network/Packet')

// TODO: Check Structure!
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clientLocalTime: packet.readInt64LE(),
			recentFrameRate: packet.readDoubleLE()
		}

		return deserialized
	},
	serialize: function(clientLocalTime, recentFrameRate) {
		var packet = new Packet('E')
		packet.writeInt64LE(clientLocalTime)
		packet.writeDoubleLE(recentFrameRate)
		return packet.data.toBuffer()
	}
}