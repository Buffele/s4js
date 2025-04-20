var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function (packet) {
		/*
		uint hostId
		short peerId
		bool online
		*/
		var deserialized = {
			hostId: packet.readUInt32LE(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function (hostId, remaining) {
		var packet = new Packet()
		packet.writeUInt32LE(hostId)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}
