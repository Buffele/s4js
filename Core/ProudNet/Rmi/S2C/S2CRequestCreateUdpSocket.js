var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			ip: packet.readProudString(),
			port: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(ip, port) {
		var packet = new Packet('E')
		packet.writeProudString(ip)
		packet.writeUInt16LE(port)
		return packet.data.toBuffer()
	}
}