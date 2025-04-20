var Packet = require('../../../Network/Packet')

// TODO: Get all Result Codes
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			action: packet.readUInt8(),
			item: {
				id: packet.readUInt64LE(),
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
	serialize: function(result, item) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeUInt8(1) // action?
		packet.writeUInt64LE(item.id)
		packet.writeUInt32LE(item.itemId)
		packet.writeUInt32LE(item.shopId)
		packet.writeUInt32LE(item.periodType)
		packet.writeUInt16LE(item.period)
		packet.writeUInt8(item.color)
		packet.writeUInt32LE(item.effectId)
		return packet.data.toBuffer()
	}
}