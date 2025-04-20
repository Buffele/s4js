var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			toServerUdpTrialCount: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(toServerUdpTrialCount) {
		var packet = new Packet('E')
		packet.writeUInt32LE(toServerUdpTrialCount)
		return packet.data.toBuffer()
	}
}