var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hostId: packet.readUInt32LE(),
			serverInstanceGuid: packet.readBuffer(16),
			userData: packet.readProudBuffer(),
			ip: packet.readIp(),
			clientPort: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(hostId, serverInstanceGuid, userData, ip, port) {
		var packet = new Packet(OPCode.NotifyServerConnectSuccess)
		packet.writeUInt32LE(hostId)
		packet.writeBuffer(serverInstanceGuid)
		packet.writeProudBuffer(userData)
		packet.writeIp(ip)
		packet.writeUInt16LE(port)
		return packet.finalize()
	}
}