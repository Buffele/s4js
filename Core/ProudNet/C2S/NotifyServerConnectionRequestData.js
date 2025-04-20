var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			userData: packet.readProudBuffer(),
			protocolVersion: packet.readBuffer(16),
			internalVersion: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(userData, protocolVersion, InternalVersion) {
		var packet = new Packet(OPCode.NotifyServerConnectionRequestData)
		packet.writeProudBuffer(userData)
		packet.writeBuffer(protocolVersion)
		packet.writeUInt32LE(InternalVersion)
		return packet.finalize()
	}
}