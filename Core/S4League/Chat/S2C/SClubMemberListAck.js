var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			members: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.members.push({
				accountId: packet.readUInt64LE(),
				name: packet.readProudString(),
				memberId: packet.readUInt32LE(),
				class: packet.readUInt32LE(),
				rank: packet.readUInt32LE(),
				visits: packet.readUInt32LE(),
				signIn: packet.readProudString(),
				lastVisit: packet.readProudString(),
				state: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(members) {
		var packet = new Packet()
		packet.writeUInt32LE(members.length)
		for (i = 0; i < members.length; i++) {
			var member = members[i]
			packet.writeUInt64LE(member.accountId)
			packet.writeProudString(member.name)
			packet.writeUInt32LE(member.memberId)
			packet.writeUInt32LE(member.class)
			packet.writeUInt32LE(member.rank)
			packet.writeUInt32LE(member.visits)
			packet.writeProudString(member.signIn)
			packet.writeProudString(member.lastVisit)
			packet.writeUInt32LE(member.state)
		}
		return packet.data.toBuffer()
	}
}