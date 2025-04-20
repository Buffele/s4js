var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			ranks: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.ranks.push({
				missionId: packet.readUInt32LE(),
				unk1: packet.readUInt32LE(),
				rank: packet.readUInt32LE(),
				unk2: packet.readUInt32LE(),
				unk3: packet.readUInt32LE(),
				time: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function() {
		var ranks = [
			{
				missionId: 100003,
				unk1: 1,
				rank: 0,
				unk2: 0,
				unk3: 0,
				time: 0
			},
			{
				missionId: 200001,
				unk1: 1,
				rank: 5,
				unk2: 80,
				unk3: 111,
				time: 10
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(ranks.length)
		for (var i = 0; i < ranks.length; i++) {
			var rank = ranks[i]
			packet.writeUInt32LE(rank.missionId)
			packet.writeUInt32LE(rank.unk1)
			packet.writeUInt32LE(rank.rank)
			packet.writeUInt32LE(rank.unk2)
			packet.writeUInt32LE(rank.unk3)
			packet.writeUInt32LE(rank.time)
		}
		return packet.data.toBuffer()
	}
}