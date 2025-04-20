var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			internalAddrIp: packet.readIp(),
			internalAddrPort: packet.readUInt16LE(),
			externalAddrIp: packet.readIp(),
			externalAddrPort: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(hostId, internalAddrIp, internalAddrPort, externalAddrIp, externalAddrPort) {
		var packet = new Packet('E')
		packet.writeUInt32LE(hostId)
		packet.writeIp(internalAddrIp)
		packet.writeUInt16LE(internalAddrPort)
		packet.writeIp(externalAddrIp)
		packet.writeUInt16LE(externalAddrPort)
		return packet.data.toBuffer()
	}
}