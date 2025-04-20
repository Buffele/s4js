var Packet = require('../../../Network/Packet')

module.exports = {
	/*
	03 00 00 00 // fromType
	02 00 00 00 // type
	d7 9d b2 1e 44 a3 // Location
	0f 00 00 00 uiRemoveTime
	aa    // Buff Effect
	64 00 // currAmmo
	64 00 // maxAmmo
	*/
	deserialize: function(packet) {
		var deserialized = {
			fromType: packet.readUInt32LE(), // 3 - AI
			type: packet.readUInt32LE(), // 2 - Buff
			position: packet.readBuffer(6),
			removeTime: packet.readUInt32LE(),
			buffEffect: packet.readUInt8(),
			currentAmmo: packet.readUInt16LE(),
			maxAmmo: packet.readUInt16LE(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk1, unk2, unk3, unk4, unk5, unk6, unk7, unk8, unk9) {
		var packet = new Packet()
		packet.writeUInt32LE(unk1)
		packet.writeUInt32LE(unk2)
		packet.writeUInt32LE(unk3)
		packet.writeUInt16LE(unk4)
		packet.writeUInt16LE(unk5)
		packet.writeUInt16LE(unk6)
		packet.writeUInt8(unk7)
		packet.writeUInt16LE(unk8)
		packet.writeUInt16LE(unk9)
		return packet.data.toBuffer()
	}
}