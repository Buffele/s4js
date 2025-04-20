var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			platformType: packet.readUInt32LE() // RuntimePlatform
		}

		return deserialized
	},
	serialize: function(platformType) {
		var packet = new Packet(OPCode.RequestServerConnectionHint)
		packet.writeUInt32LE(platformType) // RuntimePlatform
		return packet.finalize()
	}
}