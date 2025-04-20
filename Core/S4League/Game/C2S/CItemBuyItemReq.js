var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			items: []
		}

		var count = packet.readUInt32LE() // TODO: Max?
		for (var i = 0; i < count; i++) {
			deserialized.items.push({
				itemId: packet.readUInt32LE(),
				shopId: packet.readUInt32LE(),
				periodType: packet.readUInt32LE(),
				period: packet.readUInt16LE(),
				color: packet.readUInt8(),
				effectId: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(items) {
		var packet = new Packet()
		packet.writeUInt32LE(items.length)
		for (var i = 0; i < items.length; i++) {
			var item = items[i]
			packet.writeUInt32LE(item.itemId)
			packet.writeUInt32LE(item.shopId)
			packet.writeUInt32LE(item.periodType)
			packet.writeUInt16LE(item.period)
			packet.writeUInt8(item.color)
			packet.writeUInt32LE(item.effectId)
		}
		return packet.data.toBuffer()
	}
}