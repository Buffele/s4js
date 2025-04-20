var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			compressed: packet.readUInt8(),
			data: packet.readProudBuffer()
		}

		return deserialized
	},
	serialize: function(compressed, data) {
		var packet = new Packet()
		packet.writeUInt8(compressed)
		packet.writeProudBuffer(data)
		return packet.data.toBuffer()
	}
}