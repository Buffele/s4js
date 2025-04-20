var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			holepunchMagicNumber: packet.readBuffer(16),
			hostId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(holepunchMagicNumber, hostId) {
		var packet = new Packet(OPCode.PeerUdpServerHolepunch)
		packet.writeBuffer(holepunchMagicNumber)
		packet.writeUInt32LE(hostId)
		return packet.finalize()
	}
}