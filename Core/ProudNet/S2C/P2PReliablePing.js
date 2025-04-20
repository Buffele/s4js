var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			b: packet.readInt64LE()
		}

		return deserialized
	},
	serialize: function(b) {
		var packet = new Packet(OPCode.P2PReliablePing)
		packet.writeInt64LE(b)
		return packet.finalize()
	}
}