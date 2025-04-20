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
				unk1: packet.readUInt32LE(),
				unk2: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function() {
		var items = []

		var packet = new Packet()
		packet.writeUInt32LE(items.length)
		for (i = 0; i < items.length; i++) {
			var item = items[i]
			packet.writeUInt64LE(item.id)
			packet.writeUInt32LE(0) // unk1
			packet.writeUInt32LE(252) // unk2
		}
		return packet.data.toBuffer()
	}
}