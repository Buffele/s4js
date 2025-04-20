var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			roomId: packet.readUInt32LE(),
			unk1: packet.readUInt8(),
			unk2: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(roomId, unk1, unk2) {
		var packet = new Packet()
		packet.writeUInt32LE(roomId)
		packet.writeUInt8(unk1) // mode
		packet.writeUInt32LE(unk2) // pw crc
		return packet.data.toBuffer()
	}
}