var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: packet.readUInt64LE(),
			collectionId: packet.readUInt32LE(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			unk4: packet.readUInt32LE(),
			unk5: packet.readUInt32LE(),
			unk6: packet.readUInt32LE(),
			itemId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(collectionId, itemId) {
		var packet = new Packet()
		packet.writeUInt64LE(41530809) // id
		packet.writeUInt32LE(collectionId)
		packet.writeUInt32LE(1) // unk1
		packet.writeUInt32LE(0) // unk2
		packet.writeUInt32LE(0) // unk3
		packet.writeUInt32LE(0) // unk4
		packet.writeUInt32LE(0) // unk5
		packet.writeUInt32LE(0) // unk6
		packet.writeUInt32LE(itemId)
		return packet.data.toBuffer()
	}
}