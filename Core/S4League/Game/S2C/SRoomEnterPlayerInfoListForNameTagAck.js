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
	serialize: function(room) {
		var packet = new Packet()
		packet.writeUInt32LE(room.players.length)
		for (var i = 0; i < room.players.length; i++) {
			var player = room.players[i]
			packet.writeUInt64LE(player.playerId)
			packet.writeUInt32LE(player.nametagId)
		}
		return packet.data.toBuffer()
	}
}