var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			holepunchMagicNumber: packet.readBuffer(16),
			addrIp: packet.readIp(),
			addrPort: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(holepunchMagicNumber, addrIp, addrPort) {
		var packet = new Packet(OPCode.ServerHolepunchAck)
		packet.writeBuffer(holepunchMagicNumber)
		packet.writeIp(addrIp)
		packet.writeUInt16LE(addrPort)
		return packet.finalize()
	}
}