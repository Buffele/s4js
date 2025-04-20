var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			denies: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.denies.push({
				accountId: packet.readUInt64LE(),
				name: packet.readProudString()
			})
		}

		return deserialized
	},
	serialize: function(denies) {
		var packet = new Packet()
		packet.writeUInt32LE(denies.length)
		for (i = 0; i < denies.length; i++) {
			var deny = denies[i]
			packet.writeUInt64LE(deny.accountId)
			packet.writeProudString(deny.name)
		}
		return packet.data.toBuffer()
	}
}