var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function (packet) {
		var deserialized = {
			key: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function (key) {
		var packet = new Packet()
		packet.writeUInt32LE(key)
		return packet.data.toBuffer()
	}
}
