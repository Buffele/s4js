var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt8(),
			roomId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(result, roomId) {
		var packet = new Packet()
		packet.writeUInt8(result)
		packet.writeUInt32LE(roomId)
		return packet.data.toBuffer()
	}
}