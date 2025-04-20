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
	serialize: function(members) {
		var packet = new Packet()
		packet.writeUInt32LE(members.length)
		for (i = 0; i < members.length; i++) {
			var member = members[i]
			packet.writeUInt64LE(member.accountId)
			packet.writeProudString(member.name)
			packet.writeUInt32LE(member.unk1)
			packet.writeUInt32LE(member.exp)
			packet.writeUInt8(+!!member.isGM)
			packet.writeInt32LE(member.server)
			packet.writeInt32LE(member.channel)
			packet.writeInt32LE(member.room)
			packet.writeUInt32LE(member.clanId)
			packet.writeUInt32LE(member.unk2)
			packet.writeUInt32LE(member.unk3)
		}
		return packet.data.toBuffer()
	}
}