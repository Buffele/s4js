var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			count: packet.readUInt32LE(),
			item: {
				id: packet.readUInt64LE(),
				result: packet.readUInt8(),
				itemId: packet.readUInt32LE(),
				shopId: packet.readUInt32LE(),
				periodType: packet.readUInt32LE(),
				period: packet.readUInt16LE(),
				color: packet.readUInt8(),
				effectId: packet.readUInt32LE()
			}
		}

		return deserialized
	},
	serialize: function(item) {
		var packet = new Packet()
		packet.writeUInt32LE(1) // count? Proxy!
		packet.writeUInt64LE(item.id)
		packet.writeUInt8(3) // result
		packet.writeUInt32LE(item.itemId)
		packet.writeUInt32LE(item.shopId)
		packet.writeUInt32LE(item.periodType)
		packet.writeUInt16LE(item.period)
		packet.writeUInt8(item.color)
		packet.writeUInt32LE(item.effectId)
		return packet.data.toBuffer()
	}
}