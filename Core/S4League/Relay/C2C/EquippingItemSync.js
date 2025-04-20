var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			costumes: [],
			skills: [],
	        weapons: [],
	        unk: [],
	        values: [],
			remaining: null
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.costumes.push({
				itemNumber: packet.readUInt32LE(),
                unk1: packet.readInt32LE(),
                unk2: packet.readInt32LE()
			})
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.skills.push({
				itemNumber: packet.readUInt32LE(),
				unk1: packet.readInt32LE(),
				unk2: packet.readInt32LE()
			})
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.weapons.push({
				itemNumber: packet.readUInt32LE(),
				unk1: packet.readInt32LE(),
				unk2: packet.readInt32LE()
			})
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.unk.push({
				itemNumber: packet.readUInt32LE(),
				unk1: packet.readInt32LE(),
				unk2: packet.readInt32LE()
			})
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.values.push({
				value1: packet.readDoubleLE(), // r.ReadSingle() - c# 4 byte!
                value2: packet.readDoubleLE() // r.ReadSingle() - c# 4 byte!
			})
		}

		deserialized.remaining = packet.readRemaining()

		return deserialized
	},
	serialize: function(costumes, skills, weapons, unk, values, remaining) {
		var packet = new Packet()
		packet.writeUInt32LE(costumes.length)
		for (var i = 0; i < costumes.length; i++) {
			packet.writeUInt32LE(costumes[i].itemNumber)
			packet.writeInt32LE(costumes[i].unk1)
			packet.writeInt32LE(costumes[i].unk2)
		}

		packet.writeUInt32LE(skills.length)
		for (var i = 0; i < skills.length; i++) {
			packet.writeUInt32LE(skills[i].itemNumber)
			packet.writeInt32LE(skills[i].unk1)
			packet.writeInt32LE(skills[i].unk2)
		}

		packet.writeUInt32LE(weapons.length)
		for (var i = 0; i < weapons.length; i++) {
			packet.writeUInt32LE(weapons[i].itemNumber)
			packet.writeInt32LE(weapons[i].unk1)
			packet.writeInt32LE(weapons[i].unk2)
		}

		packet.writeUInt32LE(unk.length)
		for (var i = 0; i < unk.length; i++) {
			packet.writeUInt32LE(unk[i].itemNumber)
			packet.writeInt32LE(unk[i].unk1)
			packet.writeInt32LE(unk[i].unk2)
		}

		packet.writeUInt32LE(values.length)
		for (var i = 0; i < values.length; i++) {
			packet.writeDoubleLE(values[i].value1)
			packet.writeDoubleLE(values[i].value2)
		}

		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}