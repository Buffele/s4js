var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			item: {
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
	serialize: function(unk1, unk2, item) {
		var packet = new Packet()
		packet.writeUInt32LE(unk1)
		packet.writeUInt32LE(unk2)
		packet.writeUInt32LE(item.itemId)
		packet.writeUInt32LE(item.shopId)
		packet.writeUInt32LE(item.periodType)
		packet.writeUInt16LE(item.period)
		packet.writeUInt8(item.color)
		packet.writeUInt32LE(item.effectId)
		return packet.data.toBuffer()
	}
}