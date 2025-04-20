var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function (packet) {
		var deserialized = {
			type: packet.readUInt8(),
			key: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function (type, key) {
		var packet = new Packet()
		packet.writeUInt8(type)
		packet.writeUInt32LE(key)
		return packet.data.toBuffer()
	}
}
