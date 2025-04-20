var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			members: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.members.push({
				playerId: packet.readUInt64LE(),
				name: packet.readProudString(),
				level: packet.readUInt32LE(),
				class: packet.readUInt32LE(),
				rank: packet.readUInt32LE(),
				visits: packet.readUInt32LE(),
				signIn: packet.readProudString(),
				lastVisit: packet.readProudString(),
				unk: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function() {
		var members = [
			{
				playerId: 2001,
				name: 'Test2001',
				level: 80,
				class: 3,
				rank: 0,
				visits: 100,
				signIn: '20150607133539',
				lastVisit: '20150607133740',
				unk: 2939096
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(members.length)
		for (i = 0; i < members.length; i++) {
			var member = members[i]
			packet.writeUInt64LE(member.playerId)
			packet.writeProudString(member.name)
			packet.writeUInt32LE(member.level)
			packet.writeUInt32LE(member.class)
			packet.writeUInt32LE(member.rank)
			packet.writeUInt32LE(member.visits)
			packet.writeProudString(member.signIn)
			packet.writeProudString(member.lastVisit)
			packet.writeUInt32LE(member.unk)
		}
		return packet.data.toBuffer()
	}
}