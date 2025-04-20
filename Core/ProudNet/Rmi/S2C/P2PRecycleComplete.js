var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			recycled: packet.readUInt8(),
			internalAddrIp: packet.readIp(),
			internalAddrPort: packet.readUInt16LE(),
			externalAddrIp: packet.readIp(),
			externalAddrPort: packet.readUInt16LE(),
			sendAddrIp: packet.readIp(),
			sendAddrPort: packet.readUInt16LE(),
			recvAddrIp: packet.readIp(),
			recvAddrPort: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(hostId, recycled, internalAddrIp, internalAddrPort, externalAddrIp, externalAddrPort, sendAddrIp, sendAddrPort, recvAddrIp, recvAddrPort) {
		var packet = new Packet('E')
		packet.writeUInt32LE(hostId)
		packet.writeUInt8(recycled)
		packet.writeIp(internalAddrIp)
		packet.writeUInt16LE(internalAddrPort)
		packet.writeIp(externalAddrIp)
		packet.writeUInt16LE(externalAddrPort)
		packet.writeIp(sendAddrIp)
		packet.writeUInt16LE(sendAddrPort)
		packet.writeIp(recvAddrIp)
		packet.writeUInt16LE(recvAddrPort)
		return packet.data.toBuffer()
	}
}