var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {

		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet(OPCode.NotifyProtocolVersionMismatch)
		return packet.finalize()
	}
}