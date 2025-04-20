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
				name: packet.readProudString(),
				unk1: packet.readUInt32LE(),
				exp: packet.readUInt32LE(),
				isGM: packet.readUInt8(),
				server: packet.readInt32LE(),
				channel: packet.readInt32LE(),
				room: packet.readInt32LE(),
				clanId: packet.readUInt32LE(),
				unk2: packet.readUInt32LE(),
				unk3: packet.readUInt32LE()
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
			packet.writeProudString(player.name)
			packet.writeUInt32LE(player.unk1)
			packet.writeUInt32LE(player.exp)
			packet.writeUInt8(player.isGM)
			packet.writeInt32LE(player.server)
			packet.writeInt32LE(player.channel)
			packet.writeInt32LE(player.room)
			packet.writeUInt32LE(player.clanId)
			packet.writeUInt32LE(player.unk2)
			packet.writeUInt32LE(player.unk3)
		}
		return packet.data.toBuffer()
	}
}