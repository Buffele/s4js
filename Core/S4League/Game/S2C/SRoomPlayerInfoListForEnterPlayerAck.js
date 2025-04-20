var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			players: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.players.push({
				clanId: packet.readUInt32LE(),
				accountId: packet.readUInt64LE(),
				unk1: packet.readUInt8(),
				name: packet.readProudString(),
				slot: packet.readUInt8(),
				unk2: packet.readUInt8(),
				unk3: packet.readUInt8()
			})
		}

		return deserialized
	},
	serialize: function(room) {
		/*
		07 00 00 00

		00 00 00 00
		57 d5 de 00 00 00 00 00
		68
		01 01 09 4c 75 63 72 65 7a 69 61 2e
		01 00

		00 00 00 00
		11 ca de 00 00 00 00 00
		68
		01 01 0b 63 6f 6c 61 62 6f 79 32 30 30 35
		04 00

		00 00 00 00
		9a d3 de 00 00 00 00 00
		68
		01 01 0e 5f 2d 44 61 72 6b 53 6e 69 70 65 72 2d 5f
		00 00

		00 00 00 00
		29 d6 de 00 00 00 00 00
		68
		01 01 10 67 65 6c 64 69 6d 76 65 62 75 72 64 61 79 69 6d
		03 00

		00 00 00 00
		54 d5 de 00 00 00 00 00
		68
		01 01 0e 2a 4d 72 2e 55 6e 62 65 6b 61 6e 6e 74 2a
		02 00

		00 00 00 00
		43 d6 de 00 00 00 00 00
		68
		01 01 0b 6f 6c 61 66 6a 75 6e 67 65 39 30
		05 00

		36 a1 0d 00
		b6 0c d2 00 00 00 00 00
		68
		01 01 0f 42 6c 69 6e 67 42 6c 61 6e 67 42 6c 6f 6e 67
		06 00
		*/
		var packet = new Packet()
		packet.writeUInt32LE(room.players.length)
		for (var i = 0; i < room.players.length; i++) {
			var player = room.players[i]
			packet.writeUInt32LE(player.clan.id)
			packet.writeUInt64LE(player.playerId)
			packet.writeUInt8(224) // unk1 | Always the same in the whole room... | 112?
			packet.writeProudString(player.name)
			packet.writeUInt8(player.slot)// not sure
			packet.writeUInt8(0) // unk2
			packet.writeUInt8(59) // unk3
		}
		return packet.data.toBuffer()
	}
}