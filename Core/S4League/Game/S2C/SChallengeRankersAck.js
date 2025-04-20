var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			missionId: packet.readUInt32LE(),
			ranks: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.ranks.push({
				place: packet.readUInt32LE(),
				name: packet.readProudString(),
				unk1: packet.readUInt32LE(),
				unk2: packet.readUInt32LE(),
				time: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(room) {
		var ranks = [
			{
				place: 1,
				name: 'Player1',
				unk1: 37,
				unk2: 0,
				time: 40
			},
			{
				place: 2,
				name: 'Player2',
				unk1: 40,
				unk2: 100,
				time: 40
			},
			{
				place: 3,
				name: 'Player3',
				unk1: 37,
				unk2: 0,
				time: 40
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(room.missionId)
		packet.writeUInt32LE(ranks.length)
		for (var i = 0; i < ranks.length; i++) {
			var rank = ranks[i]
			packet.writeUInt32LE(rank.place)
			packet.writeProudString(rank.name)
			packet.writeUInt32LE(rank.unk1)
			packet.writeUInt32LE(rank.unk2)
			packet.writeUInt32LE(rank.time)
		}
		return packet.data.toBuffer()
	}
}