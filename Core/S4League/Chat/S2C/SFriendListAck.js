var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			friends: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.friends.push({
				accountId: packet.readUInt64LE(),
				name: packet.readProudString(),
				type: packet.readUInt32LE(),
				unk: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(friends) {
		var packet = new Packet()
		packet.writeUInt32LE(friends.length)
		for (i = 0; i < friends.length; i++) {
			var friend = friends[i]
			packet.writeUInt64LE(friend.accountId)
			packet.writeProudString(friend.name)
			packet.writeUInt32LE(friend.type)
			packet.writeUInt32LE(friend.unk)
		}
		return packet.data.toBuffer()
	}
}