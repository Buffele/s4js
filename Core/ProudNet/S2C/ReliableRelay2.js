var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			frameNumber: packet.readUInt32LE(),
			data: packet.readProudBuffer()
		}

		return deserialized
	},
	serialize: function(hostId, frameNumber, data) {
		var packet = new Packet(OPCode.ReliableRelay2)
		packet.writeUInt32LE(hostId)
		packet.writeUInt32LE(frameNumber)
		packet.writeProudBuffer(data)
		return packet.finalize()
	}
}