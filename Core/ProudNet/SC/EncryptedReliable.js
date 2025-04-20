var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			mode: packet.readUInt8(),
			encryptedData: packet.readProudBuffer()
		}

		return deserialized
	},
	serialize: function(mode, encryptedData) {
		var packet = new Packet(OPCode.EncryptedReliable)
		packet.writeUInt8(mode)
		packet.writeProudBuffer(encryptedData)
		return packet.finalize()
	}
}