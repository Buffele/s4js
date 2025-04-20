var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			opCode: packet.readUInt8(),
			data: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(opCode, data) {
		var packet = new Packet()
		packet.writeUInt8(opCode)
		packet.writeBuffer(data)
		return packet.data.toBuffer()
	}
}