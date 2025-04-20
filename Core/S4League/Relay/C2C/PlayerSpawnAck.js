var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet, oldCharacter) {
		var deserialized = {
			accountId: packet.readUInt32LE(),
			unk1: packet.readUInt16LE(),
			peerId: new PeerId(packet.readUInt16LE()),
			team: packet.readUInt8(),
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			rotation: {
				x: packet.readUInt8(),
				y: packet.readUInt8()
			},
			clothes: [],
			skills: [],
			weapons1: [],
			weapons2: [],
			selectedWeaponSlot: null,
			gender: null,
			name: null,
			unk9: null,
			country: null,
			currentHp: null,
			maxHp: null,
			unk12: null,
			unk13: null,
			unk14: null
		}

		// clothes
		var count = packet.readUInt32LE() // TODO: Max 8?
		for (var i = 0; i < count; i++) {
			deserialized.clothes.push({
				val1: packet.readUInt32LE(),
				val2: packet.readUInt32LE(),
				val3: packet.readUInt32LE()
				//val4: packet.readUInt32LE()
			})
			if(!oldCharacter) {
				packet.readUInt32LE() // val4
			}
		}

		// skills
		var count = packet.readUInt32LE() // TODO: Max 2?
		for (var i = 0; i < count; i++) {
			deserialized.skills.push({
				val1: packet.readUInt32LE(),
				val2: packet.readUInt32LE(),
				val3: packet.readUInt32LE()
				//val4: packet.readUInt32LE()
			})
			if(!oldCharacter) {
				packet.readUInt32LE() // val4
			}
		}

		// weapons1
		var count = packet.readUInt32LE() // TODO: Max 3?
		for (var i = 0; i < count; i++) {
			deserialized.weapons1.push({
				val1: packet.readUInt32LE(),
				val2: packet.readUInt32LE(),
				val3: packet.readUInt32LE()
				//val4: packet.readUInt32LE()
			})
			if(!oldCharacter) {
				packet.readUInt32LE() // val4
			}
		}

		// weapons2
		var count = packet.readUInt32LE() // TODO: Max 3?
		for (var i = 0; i < count; i++) {
			deserialized.weapons2.push({
				val1: packet.readUInt32LE(),
				val2: packet.readUInt32LE(),
				val3: packet.readUInt32LE()
				//val4: packet.readUInt32LE()
			})
			if(!oldCharacter) {
				packet.readUInt32LE() // val4
			}
		}

		deserialized.selectedWeaponSlot = packet.readUInt32LE()
		deserialized.gender = packet.readUInt8()
		deserialized.name = packet.readProudString()
		deserialized.unk9 = packet.readUInt8()
		deserialized.country = packet.readProudString()
		deserialized.currentHp = BinaryUtil.decompressFloat(packet.readUInt16LE())
		deserialized.maxHp = BinaryUtil.decompressFloat(packet.readUInt16LE())
		deserialized.unk12 = BinaryUtil.decompressFloat(packet.readUInt16LE())
		deserialized.unk13 = packet.readUInt32LE()
		deserialized.unk14 = packet.readRemaining()

		return deserialized
	},
	serialize: function(data, oldCharacter) {
		var packet = new Packet()
		packet.writeUInt32LE(data.accountId)
		packet.writeUInt16LE(data.unk1)
		packet.writeUInt16LE(data.slot)
		packet.writeUInt8(data.team)
		packet.writeInt16LE(BinaryUtil.compressFloat(data.position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(data.position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(data.position.z))
		packet.writeUInt8(data.rotation.x)
		packet.writeUInt8(data.rotation.y)

		// clothes
		packet.writeUInt32LE(data.clothes.length)
		for (var i = 0; i < data.clothes.length; i++) {
			packet.writeUInt32LE(data.clothes[i].val1)
			packet.writeUInt32LE(data.clothes[i].val2)
			packet.writeUInt32LE(data.clothes[i].val3)
			if(!oldCharacter) {
				packet.writeUInt32LE(data.clothes[i].val4)
			}
		}

		// skills
		packet.writeUInt32LE(data.skills.length)
		for (var i = 0; i < data.skills.length; i++) {
			packet.writeUInt32LE(data.skills[i].val1)
			packet.writeUInt32LE(data.skills[i].val2)
			packet.writeUInt32LE(data.skills[i].val3)
			if(!oldCharacter) {
				packet.writeUInt32LE(data.skills[i].val4)
			}
		}

		// weapons1
		packet.writeUInt32LE(data.weapons1.length)
		for (var i = 0; i < data.weapons1.length; i++) {
			packet.writeUInt32LE(data.weapons1[i].val1)
			packet.writeUInt32LE(data.weapons1[i].val2)
			packet.writeUInt32LE(data.weapons1[i].val3)
			if(!oldCharacter) {
				packet.writeUInt32LE(data.weapons1[i].val4)
			}
		}

		// weapons2
		packet.writeUInt32LE(data.weapons2.length)
		for (var i = 0; i < data.weapons2.length; i++) {
			packet.writeUInt32LE(data.weapons2[i].val1)
			packet.writeUInt32LE(data.weapons2[i].val2)
			packet.writeUInt32LE(data.weapons2[i].val3)
			if(!oldCharacter) {
				packet.writeUInt32LE(data.weapons2[i].val4)
			}
		}

		packet.writeUInt32LE(data.selectedWeaponSlot)
		packet.writeUInt8(data.gender)
		packet.writeProudString(data.name)
		packet.writeUInt8(data.unk9)
		packet.writeProudString(data.country)
		packet.writeUInt16LE(BinaryUtil.compressFloat(data.currentHp))
		packet.writeUInt16LE(BinaryUtil.compressFloat(data.maxHp))
		packet.writeUInt16LE(BinaryUtil.compressFloat(data.unk12))
		packet.writeUInt32LE(data.unk13)
		packet.writeBuffer(data.unk14)
		return packet.data.toBuffer()
	}
}