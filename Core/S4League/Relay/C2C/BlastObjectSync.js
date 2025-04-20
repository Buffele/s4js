var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			objects: []
		}

		var count = packet.readInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.objects.push(packet.readInt32LE())
		}

		return deserialized
	},
	serialize: function(objects) {
		var packet = new Packet()
		packet.writeInt32LE(objects.length)
		for (var i = 0; i < objects.length; i++) {
			packet.writeInt32LE(objects[i])
		}
		return packet.data.toBuffer()
	}
}