var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			players: []
		}

		var count = packet.readUInt32LE() // TODO: max 299
		for (i = 0; i < count; i++) {
			deserialized.players.push({
				playerId: packet.readUInt64LE(),
				class: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(players) {
		var packet = new Packet()
		packet.writeUInt32LE(players.length)
		for (var i = 0; i < players.length; i++) {
			var player = players[i]
			packet.writeUInt64LE(player.playerId)
			packet.writeUInt32LE(player.class)
		}
		return packet.data.toBuffer()
	}
}