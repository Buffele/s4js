var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			internalAddrIp: packet.readIp(),
			internalAddrPort: packet.readUInt16LE(),
			externalAddrIp: packet.readIp(),
			externalAddrPort: packet.readUInt16LE(),
			hostId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(internalAddrIp, internalAddrPort, externalAddrIp, externalAddrPort, hostId) {
		var packet = new Packet(OPCode.PeerUdpNotifyHolepunchSuccess)
		packet.writeIp(internalAddrIp)
		packet.writeUInt16LE(internalAddrPort)
		packet.writeIp(externalAddrIp)
		packet.writeUInt16LE(externalAddrPort)
		packet.writeUInt32LE(hostId)
		return packet.finalize()
	}
}