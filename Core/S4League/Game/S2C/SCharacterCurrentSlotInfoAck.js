var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			chars: packet.readUInt8(),
			slots: packet.readUInt8(),
			active: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet()
		packet.writeUInt8(1) // chars??
		packet.writeUInt8(3) // slots
		packet.writeUInt8(1) // active
		return packet.data.toBuffer()
	}
}