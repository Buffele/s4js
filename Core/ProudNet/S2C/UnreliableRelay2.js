var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			data: packet.readProudBuffer()
		}

		return deserialized
	},
	serialize: function(hostId, data) {
		var packet = new Packet(OPCode.UnreliableRelay2)
		packet.writeUInt32LE(hostId)
		packet.writeProudBuffer(data)
		return packet.finalize()
	}
}