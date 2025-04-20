var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			aBSendAddrIp: packet.readIp(),
			aBSendAddrPort: packet.readUInt16LE(),
			hostId: packet.readUInt32LE(),
			holepunchMagicNumber: packet.readBuffer(16)
		}

		return deserialized
	},
	serialize: function(aBSendAddrIp, aBSendAddrPort, hostId, holepunchMagicNumber) {
		var packet = new Packet(OPCode.PeerUdpPeerHolepunch)
		packet.writeIp(aBSendAddrIp)
		packet.writeUInt16LE(aBSendAddrPort)
		packet.writeUInt32LE(hostId)
		packet.writeBuffer(holepunchMagicNumber)
		return packet.finalize()
	}
}