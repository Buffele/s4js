var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			type: packet.readUInt32LE(),
			value1: packet.readUInt32LE(),
			value2: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(type, value1, value2) {
		var packet = new Packet()
		packet.writeUInt32LE(type)
		packet.writeUInt32LE(value1)
		packet.writeUInt32LE(value2)
		return packet.data.toBuffer()
	}
}