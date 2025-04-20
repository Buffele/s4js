var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt8(),
			unk2: packet.readUInt8(),
			unk3: packet.readUInt32LE(),
			items: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < 4; i++) {
			var item = {
				itemId: packet.readUInt32LE(),
				shopId: packet.readUInt32LE(),
				periodType: packet.readUInt32LE(),
				period: packet.readUInt32LE(),
				color: packet.readUInt32LE(),
				durability: packet.readUInt32LE(),
				effects: []
			}

			var effectCount = packet.readUInt32LE()
			for (iEffect = 0; iEffect < effectCount; iEffect++) {
				item.effects.push({
					effectId: packet.readUInt32LE()
				})
			}

			deserialized.items.push(item)
		}

		return deserialized
	},
	serialize: function(unk1, unk2, items) {
		var packet = new Packet()
		packet.writeUInt8(unk1) // unk1
		packet.writeUInt8(unk2) // unk2
		packet.writeUInt32LE(3) // unk3
		for (i = 0; i < 4; i++) {
			var item = items[i]
			packet.writeUInt32LE(item.itemId)
			packet.writeUInt32LE(item.shopId)
			packet.writeUInt32LE(item.periodType)
			packet.writeUInt32LE(item.period)
			packet.writeUInt32LE(item.color)
			packet.writeUInt32LE(item.durability)
			packet.writeUInt32LE(item.effects.length)
			for (iEffect = 0; iEffect < item.effects.length; iEffect++) {
				var effect = item.effects[iEffect]
				packet.writeUInt32LE(effect.effectId)
			}
		}
		return packet.data.toBuffer()
	}
}