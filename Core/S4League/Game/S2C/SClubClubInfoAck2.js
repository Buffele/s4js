var Packet = require('../../../Network/Packet')

// TODO: Complete this structure
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: packet.readUInt32LE(),
			id2: packet.readUInt32LE(),
			name: packet.readProudString(),
			markId: packet.readProudString(),
			class: packet.readProudString(),
			masterAccountId: packet.readUInt64LE(),
			masterLevel: packet.readUInt32LE(),
			masterName: packet.readProudString(),
			unk1: packet.readUInt32LE(),
			memberCount: packet.readUInt32LE(),
			description: packet.readProudString(),
			creationDate: packet.readProudString(),
			unk2: packet.readProudString(),
			unk3: packet.readProudString(),
			rankingPlace: packet.readInt32LE(),
			unk4: packet.readUInt32LE(),
			unk5: packet.readUInt32LE(),
			unk6: packet.readUInt32LE(),
			clubPoints: packet.readUInt32LE(), // It's readUInt64LE()
			unk7: packet.readUInt32LE(),
			wins: packet.readUInt32LE(),
			loses: packet.readUInt32LE(),
			ladderPoints: packet.readUInt32LE(),
			unk8: packet.readUInt32LE(),
			unk9: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(id, name, markId, clazz, masterAccountId, masterName, creationDate) {
		var packet = new Packet()
		packet.writeUInt32LE(id)
		packet.writeUInt32LE(id)
		packet.writeProudString(name)
		packet.writeProudString(markId)
		packet.writeProudString(clazz)
		packet.writeUInt64LE(masterAccountId)
		packet.writeUInt32LE(22) // unk1
		packet.writeProudString(masterName)
		packet.writeUInt32LE(1) // unk2
		packet.writeUInt32LE(2) // unk3
		packet.writeProudString(' ') // unk4
		packet.writeProudString(creationDate)
		packet.writeProudString('') // unk5
		packet.writeProudString('') // unk6
		packet.writeInt32LE(-1) // unk7
		packet.writeUInt32LE(0) // unk8
		packet.writeUInt32LE(0) // unk9
		packet.writeUInt32LE(0) // unk10
		packet.writeUInt32LE(0) // unk11
		packet.writeUInt32LE(0) // unk12
		packet.writeUInt32LE(0) // unk13
		packet.writeUInt32LE(0) // unk14
		packet.writeUInt32LE(0) // unk15
		packet.writeUInt32LE(0) // unk16
		packet.writeUInt16LE(0) // unk17
		return packet.data.toBuffer()
	}
}