var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			holepunchMagicNumber: packet.readBuffer(16)
		}

		return deserialized
	},
	serialize: function(holepunchMagicNumber) {
		var packet = new Packet(OPCode.RequestStartServerHolepunch)
		packet.writeBuffer(holepunchMagicNumber)
		return packet.finalize()
	}
}