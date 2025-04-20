var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			players: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.players.push({
				accountId: packet.readUInt64LE(),
				nametagId: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(players) {
		var packet = new Packet()
		packet.writeUInt32LE(players.length)
		for (i = 0; i < players.length; i++) {
			var player = players[i]
			packet.writeUInt64LE(player.accountId)
			packet.writeUInt32LE(player.nametagId)
		}
		return packet.data.toBuffer()
	}
}