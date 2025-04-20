var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			noteId: packet.readUInt64LE(),
			noteId2: packet.readUInt64LE(),
			text: packet.readProudString(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			unk4: packet.readUInt32LE(),
			unk5: packet.readUInt32LE(),
			unk6: packet.readUInt8(),
			unk7: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(noteId) {
		var text = 'Visit: http://freeap.weebly.com'

		var packet = new Packet()
		packet.writeUInt64LE(noteId)
		packet.writeUInt64LE(noteId)
		packet.writeProudString(text)
		packet.writeUInt32LE(0)
		packet.writeUInt32LE(0)
		packet.writeUInt32LE(1)
		packet.writeUInt32LE(0)
		packet.writeUInt32LE(0)
		packet.writeUInt8(1)
		packet.writeUInt32LE(1)
		return packet.data.toBuffer()
	}
}