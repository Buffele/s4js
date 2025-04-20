var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			opcode: packet.readUInt32LE(),
			data: packet.readProudBuffer()
		}

		return deserialized
	},
	serialize: function(opcode, data) {
		var packet = new Packet()
		packet.writeUInt32LE(opcode)
		packet.writeProudBuffer(data)
		return packet.data.toBuffer()
	}
}