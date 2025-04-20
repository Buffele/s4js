var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			items: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.items.push({
				id: packet.readUInt64LE(),
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
	serialize: function() {
		var items = [
			{
				id: 1,
				itemId: 2000001,
				shopId: 1,
				periodType: 2,
				period: 5,
				color: 0,
				effectId: 0
			},
			{
				id: 2,
				itemId: 2000002,
				shopId: 1,
				periodType: 2,
				period: 5,
				color: 0,
				effectId: 0
			},
			{
				id: 3,
				itemId: 2000003,
				shopId: 1,
				periodType: 2,
				period: 5,
				color: 0,
				effectId: 0
			},
			{
				id: 4,
				itemId: 2000006,
				shopId: 1,
				periodType: 2,
				period: 5,
				color: 0,
				effectId: 0
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(items.length)
		for (i = 0; i < items.length; i++) {
			var item = items[i]
			packet.writeUInt64LE(item.id)
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