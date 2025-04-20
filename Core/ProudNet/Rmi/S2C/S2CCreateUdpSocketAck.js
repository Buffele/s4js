var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			success: packet.readInt8(),
			ip: packet.readProudString(),
			port: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(success, ip, port) {
		var packet = new Packet('E')
		packet.writeUInt8(success)
		packet.writeProudString(ip)
		packet.writeUInt16LE(port)
		return packet.data.toBuffer()
	}
}