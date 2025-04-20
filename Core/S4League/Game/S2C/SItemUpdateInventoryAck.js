var Packet = require('../../../Network/Packet')

// TODO: Get Result Codes
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			item: {
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
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.item.effects.push({
				effectId: packet.readUInt32LE(),
				unk1: packet.readInt32LE(),
				unk2: packet.readUInt32LE(),
				unk3: packet.readUInt32LE(),
				unk4: packet.readUInt32LE()
			})
		}

		deserialized.item.enchantMP = packet.readUInt32LE()
		deserialized.item.enchantLevel = packet.readUInt32LE()

		return deserialized
	},
	serialize: function(result, item) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeUInt64LE(item.id)
		packet.writeUInt32LE(item.itemId)
		packet.writeUInt32LE(item.shopId)
		packet.writeUInt32LE(item.periodType)
		packet.writeUInt16LE(item.period)
		packet.writeUInt32LE(item.color)
		packet.writeUInt64LE(item.expireTime)
		packet.writeUInt32LE(item.durability)
		packet.writeUInt32LE(item.effects.length)
		for (var i = 0; i < item.effects.length; i++) {
			var effect = item.effects[i]
			packet.writeUInt32LE(effect.effectId)
			packet.writeInt32LE(-1)
			packet.writeUInt32LE(0)
			packet.writeUInt32LE(0)
			packet.writeUInt32LE(0)
		}
		packet.writeUInt32LE(item.enchantMP)
		packet.writeUInt32LE(item.enchantLevel)
		return packet.data.toBuffer()
	}
}