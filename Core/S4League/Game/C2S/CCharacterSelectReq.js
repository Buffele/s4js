var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			slot: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(slot) {
		var packet = new Packet()
		packet.writeUInt8(slot)
		return packet.data.toBuffer()
	}
}