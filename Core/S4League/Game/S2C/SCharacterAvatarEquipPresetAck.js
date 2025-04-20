var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet()
		packet.writeUInt8(2)
		return packet.data.toBuffer()
	}
}