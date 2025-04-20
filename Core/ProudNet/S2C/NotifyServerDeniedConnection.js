var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			comment: packet.readProudBuffer()
		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet(OPCode.NotifyServerDeniedConnection)
		packet.writeProudBuffer(new Buffer(0)) // comment
		return packet.finalize()
	}
}