var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			items: []
		}

		var count = packet.readUInt32LE() // TODO: Max?
		for (var i = 0; i < count; i++) {
			deserialized.items.push(packet.readUInt64LE())
		}

		return deserialized
	},
	serialize: function(items) {
		var packet = new Packet()
		packet.writeUInt32LE(items.length)
		for (var i = 0; i < items.length; i++) {
			packet.writeUInt64LE(items[i])
		}
		return packet.data.toBuffer()
	}
}