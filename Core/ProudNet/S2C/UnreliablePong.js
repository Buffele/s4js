var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			absoluteTimeMs: packet.readDoubleLE(),
			serverUdpRecentPingMs: packet.readDoubleLE()
		}

		return deserialized
	},
	serialize: function(absoluteTimeMs, serverUptime) {
		var packet = new Packet(OPCode.UnreliablePong)
		packet.writeDoubleLE(absoluteTimeMs)
		packet.writeDoubleLE(serverUptime)
		return packet.finalize()
	}
}