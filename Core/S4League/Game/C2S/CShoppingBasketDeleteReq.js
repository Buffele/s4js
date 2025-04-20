var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			itemIds: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.itemIds.push(packet.readUInt64LE())
		}

		return deserialized
	},
	serialize: function(itemIds) {
		var packet = new Packet()
		packet.writeUInt32LE(itemIds.length)
		for (var i = 0; i < itemIds.length; i++) {
			packet.writeUInt64LE(itemIds[i])
		}
		return packet.data.toBuffer()
	}
}