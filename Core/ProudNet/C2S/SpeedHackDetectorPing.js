var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {

		}

		return deserialized
	},
	serialize: function(hosts, data) {
		var packet = new Packet(OPCode.SpeedHackDetectorPing)
		return packet.finalize()
	}
}