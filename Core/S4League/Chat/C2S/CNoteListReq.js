var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			page: packet.readUInt8(),
			filter: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(page, filter) {
		var packet = new Packet()
		packet.writeUInt8(page)
		packet.writeUInt32LE(filter)
		return packet.data.toBuffer()
	}
}