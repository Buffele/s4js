var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			holepunchMagicNumber: packet.readBuffer(16),
			addrIp: packet.readIp(),
			addrPort: packet.readUInt16LE(),
			hostId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(holepunchMagicNumber, addrIp, addrPort, hostId) {
		var packet = new Packet(OPCode.PeerUdpServerHolepunchAck)
		packet.writeBuffer(holepunchMagicNumber)
		packet.writeIp(addrIp)
		packet.writeUInt16LE(addrPort)
		packet.writeUInt32LE(hostId)
		return packet.finalize()
	}
}