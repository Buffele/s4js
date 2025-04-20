var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			items: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			var item = {
				id: packet.readUInt64LE(),
				itemId: packet.readUInt32LE(),
				shopId: packet.readUInt32LE(),
				periodType: packet.readUInt32LE(),
				period: packet.readUInt16LE(),
				color: packet.readUInt32LE(),
				expireTime: packet.readUInt64LE(),
				durability: packet.readUInt32LE(),
				effects: [],
				enchantMP: 0,
				enchantLevel: 0
			}

			var effectCount = packet.readUInt32LE()
			for (iEffect = 0; iEffect < effectCount; iEffect++) {
				item.effects.push({
					effectId: packet.readUInt32LE(),
					unk1: packet.readInt32LE(),

					unk2: packet.readUInt32LE(),
					unk3: packet.readUInt32LE(),

					unk4: packet.readUInt32LE()
				})
			}

			item.enchantMP = packet.readUInt32LE()
			item.enchantLevel = packet.readUInt32LE()

			deserialized.items.push(item)
		}

		return deserialized
	},
	serialize: function(items) {
		var packet = new Packet()
		packet.writeUInt32LE(items.length)
		for (i = 0; i < items.length; i++) {
			var item = items[i]
			packet.writeUInt64LE(item.id)
			packet.writeUInt32LE(item.itemId)
			packet.writeUInt32LE(item.shopId)
			packet.writeUInt32LE(item.periodType)
			packet.writeUInt16LE(item.period)
			packet.writeUInt32LE(item.color)
			packet.writeUInt64LE(item.expireTime)
			packet.writeUInt32LE(item.durability)
			packet.writeUInt32LE(0); // item.effects.length)
			// for (iEffect = 0; iEffect < item.effects.length; iEffect++) {
			// 	var effect = item.effects[iEffect]
			// 	packet.writeUInt32LE(effect.effectId)
			// 	packet.writeInt32LE(-1)
			// 	packet.writeUInt64LE(0)
			// 	packet.writeUInt32LE(0)
			// }
			packet.writeUInt32LE(0); // item.enchantMP)
			packet.writeUInt32LE(0); // item.enchantLevel)
		}
		return packet.data.toBuffer()
	}
}