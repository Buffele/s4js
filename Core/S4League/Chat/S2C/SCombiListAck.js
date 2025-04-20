var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			combis: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.combis.push({
				accountId: packet.readUInt64LE(),
				unk1: packet.readUInt32LE(),
				type: packet.readUInt32LE(), // 3 -> Pending, 2 -> Mutual Combi, 1 -> Requesting Combi, 0 -> Nothing
				unk2: packet.readUInt32LE(),
				unk3: packet.readUInt32LE(),
				unk4: packet.readUInt32LE(),
				unk5: packet.readUInt32LE(),
				unk6: packet.readUInt32LE(),
				matches: packet.readUInt64LE(),
				win: packet.readUInt64LE(),
				lose: packet.readUInt64LE(),
				unkString: packet.readProudString(),
				playerName: packet.readProudString(),
				name: packet.readProudString(),
				creationDate: packet.readProudString()
			})
		}

		return deserialized
	},
	serialize: function(combis) {
		var packet = new Packet()
		packet.writeUInt32LE(combis.length)
		for (i = 0; i < combis.length; i++) {
			var combi = combis[i]
			packet.writeUInt64LE(combi.accountId)
			packet.writeUInt32LE(0) // unk1
			packet.writeUInt32LE(combi.type) // 3 -> Pending, 2 -> Mutual Combi, 1 -> Requesting Combi, 0 -> Nothing
			packet.writeUInt32LE(0) // unk2
			packet.writeUInt32LE(1500) // unk3 (EXP?)
			packet.writeUInt32LE(0) // unk4
			packet.writeUInt32LE(0) // unk5
			packet.writeUInt32LE(0) // unk6
			packet.writeUInt64LE(combi.matches)
			packet.writeUInt64LE(combi.win)
			packet.writeUInt64LE(combi.lose)
			packet.writeProudString(combi.unkString)
			packet.writeProudString(combi.playerName)
			packet.writeProudString(combi.name)
			packet.writeProudString(combi.creationDate)
		}
		return packet.data.toBuffer()
	}
}