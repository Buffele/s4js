var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt8(),
			players: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.players.push({
				playerId: packet.readUInt64LE(),
				team: packet.readUInt8()
			})
		}

		return deserialized
	},
	serialize: function(players) {
		var packet = new Packet()
		packet.writeUInt8(1) // result?
		packet.writeUInt32LE(players.length)
		for (i = 0; i < players.length; i++) {
			var player = players[i]
			packet.writeUInt64LE(player.playerId)
			packet.writeUInt8(player.team)
		}
		return packet.data.toBuffer()
	}
}