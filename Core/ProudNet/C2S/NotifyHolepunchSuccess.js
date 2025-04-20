var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			holepunchMagicNumber: packet.readBuffer(16),
			internalAddrIp: packet.readIp(),
			internalAddrPort: packet.readUInt16LE(),
			externalAddrIp: packet.readIp(),
			externalAddrPort: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(holepunchMagicNumber, internalAddrIp, internalAddrPort, externalAddrIp, externalAddrPort) {
		var packet = new Packet(OPCode.NotifyHolepunchSuccess)
		packet.writeBuffer(holepunchMagicNumber)
		packet.writeIp(internalAddrIp)
		packet.writeUInt16LE(internalAddrPort)
		packet.writeIp(externalAddrIp)
		packet.writeUInt16LE(externalAddrPort)
		return packet.finalize()
	}
}