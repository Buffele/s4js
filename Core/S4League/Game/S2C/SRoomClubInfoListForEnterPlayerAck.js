var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			players: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.players.push({
				clan: {
					id: packet.readUInt32LE(),
					name: packet.readProudString(),
					markId: packet.readProudString()
				}
			})
		}

		return deserialized
	},
	serialize: function(room) {
		var packet = new Packet()
		packet.writeUInt32LE(room.players.length)
		for (var i = 0; i < room.players.length; i++) {
			var player = room.players[i]
			packet.writeUInt32LE(player.clan.id)
			packet.writeProudString(player.clan.name)
			packet.writeProudString(player.clan.markId)
		}
		return packet.data.toBuffer()
	}
}