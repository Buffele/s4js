var Packet = require('../../Network/Packet')

// TODO: Check Structure!
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			udpSuccessCount: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(udpSuccessCount) {
		var packet = new Packet('E')
		packet.writeUInt32LE(udpSuccessCount)
		return packet.data.toBuffer()
	}
}