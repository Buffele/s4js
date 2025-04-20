var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			items: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.items.push({
				collectionId: packet.readUInt32LE(),
				itemId: packet.readUInt32LE(),
				unk: packet.readUInt8()
			})
		}

		return deserialized
	},
	serialize: function(items) {
		var packet = new Packet()
		packet.writeUInt32LE(items.length)
		for (var i = 0; i < items.length; i++) {
			var item = items[i]
			packet.readUInt32LE(item.collectionId)
			packet.readUInt32LE(item.itemId)
			packet.readUInt8(item.unk)
		}
		return packet.data.toBuffer()
	}
}