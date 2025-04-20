var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			weapons: [],
			skill: {

			},
			clothes: [],
			avatar: null,
			unk: null,
			hp: null,
			sp: null
		}

		// weapons
		for (var i = 0; i < 3; i++) {
			var item = {
				id: packet.readUInt64LE(),
				itemId: packet.readUInt32LE(),
				color: packet.readUInt32LE(),
				effects: [],
				unk1: null,
				unk2: null
			}

			var effectCount = packet.readUInt32LE()
			for (iEffect = 0; iEffect < effectCount; iEffect++) {
				item.effects.push({
					effectId: packet.readUInt32LE()
				})
			}

			item.unk1 = packet.readUInt32LE()
			item.unk2 = packet.readUInt32LE()

			deserialized.weapons.push(item)
		}

		// skill
		var item = {
			id: packet.readUInt64LE(),
			itemId: packet.readUInt32LE(),
			color: packet.readUInt32LE(),
			effects: [],
			unk1: null,
			unk2: null
		}

		var effectCount = packet.readUInt32LE()
		for (iEffect = 0; iEffect < effectCount; iEffect++) {
			item.effects.push({
				effectId: packet.readUInt32LE()
			})
		}

		item.unk1 = packet.readUInt32LE()
		item.unk2 = packet.readUInt32LE()

		deserialized.skill = item

		// clothes
		for (var i = 0; i < 8; i++) {
			var item = {
				id: packet.readUInt64LE(),
				itemId: packet.readUInt32LE(),
				color: packet.readUInt32LE(),
				effects: [],
				unk1: null,
				unk2: null
			}

			var effectCount = packet.readUInt32LE()
			for (iEffect = 0; iEffect < effectCount; iEffect++) {
				item.effects.push({
					effectId: packet.readUInt32LE()
				})
			}

			item.unk1 = packet.readUInt32LE()
			item.unk2 = packet.readUInt32LE()

			deserialized.clothes.push(item)
		}

		deserialized.avatar = packet.readUInt32LE()
		deserialized.unk = packet.readUInt32LE()
		deserialized.hp = packet.readUInt32LE()
		deserialized.sp = packet.readUInt32LE()

		return deserialized
	},
	serialize: function(data) {
		var packet = new Packet()
		// weapons
		for (var i = 0; i < 3; i++) {
			var item = data.weapons[i]
			packet.writeUInt64LE(item.id)
			packet.writeUInt32LE(item.itemId)
			packet.writeUInt32LE(item.color)
			packet.writeUInt32LE(item.effects.length)
			for (iEffect = 0; iEffect < item.effects.length; iEffect++) {
				var effect = item.effects[iEffect]
				packet.writeUInt32LE(effect.effectId)
			}
			packet.writeUInt32LE(item.unk1)
			packet.writeUInt32LE(item.unk2)
		}
		// skill
		var item = data.skill
		packet.writeUInt64LE(item.id)
		packet.writeUInt32LE(item.itemId)
		packet.writeUInt32LE(item.color)
		packet.writeUInt32LE(item.effects.length)
		for (iEffect = 0; iEffect < item.effects.length; iEffect++) {
			var effect = item.effects[iEffect]
			packet.writeUInt32LE(effect.effectId)
		}
		packet.writeUInt32LE(item.unk1)
		packet.writeUInt32LE(item.unk2)
		// clothes
		for (var i = 0; i < 8; i++) {
			var item = data.clothes[i]
			packet.writeUInt64LE(item.id)
			packet.writeUInt32LE(item.itemId)
			packet.writeUInt32LE(item.color)
			packet.writeUInt32LE(item.effects.length)
			for (iEffect = 0; iEffect < item.effects.length; iEffect++) {
				var effect = item.effects[iEffect]
				packet.writeUInt32LE(effect.effectId)
			}
			packet.writeUInt32LE(item.unk1)
			packet.writeUInt32LE(item.unk2)
		}
		packet.writeUInt32LE(data.avatar)
		packet.writeUInt32LE(data.unk)
		packet.writeUInt32LE(data.hp)
		packet.writeUInt32LE(data.sp)
		return packet.data.toBuffer()
	}
}