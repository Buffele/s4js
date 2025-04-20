var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			holepunchMagicNumber: packet.readBuffer(16),
			localHostId: packet.readUInt32LE(),
			ABSendAddrIp: packet.readIp(),
			ABSendAddrPort: packet.readUInt16LE(),
			ABRecvAddrIp: packet.readIp(),
			ABRecvAddrPort: packet.readUInt16LE(),
			BASendAddrIp: packet.readIp(),
			BASendAddrPort: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(holepunchMagicNumber, localHostId, ABSendAddrIp, ABSendAddrPort, ABRecvAddrIp, ABRecvAddrPort, BASendAddrIp, BASendAddrPort) {
		var packet = new Packet(OPCode.PeerUdpPeerHolepunchAck)
		packet.writeBuffer(holepunchMagicNumber)
		packet.writeUInt32LE(localHostId)
		packet.writeIp(ABSendAddrIp)
		packet.writeUInt16LE(ABSendAddrPort)
		packet.writeIp(ABRecvAddrIp)
		packet.writeUInt16LE(ABRecvAddrPort)
		packet.writeIp(BASendAddrIp)
		packet.writeUInt16LE(BASendAddrPort)
		return packet.finalize()
	}
}