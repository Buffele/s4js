var Packet = require('../../../Network/Packet')

/*
8e 37 0e 00 # clan id
01 00 00 00 # count
	b6 0c d2 00 00 00 00 00 # account id
	01 01 0f 42 6c 69 6e 67 42 6c 61 6e 67 42 6c 6f 6e 67 # name
	16 00 00 00 # memberId
	00 00 00 00 # unk1
	01 00 00 00 # class
	00 00 00 00 # points
	00 00 00 00 # unk2
	01 01 0e 32 30 31 35 30 39 32 34 31 37 35 37 35 36 # signIn
	01 00 00 00 # unk3
	01 01 0e 32 30 31 35 30 39 32 34 32 32 33 31 31 38 # lastVisit
	0d 00 00 00 # unk4
	00 00 00 00 # unk5
	ff ff ff ff # unk6
	29 00 00 00 # unk7
	08 00 00 00 # unk8
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clanId: packet.readUInt32LE(),
			members: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.members.push({
				accountId: packet.readUInt64LE(),
				name: packet.readProudString(),
				memberId: packet.readUInt32LE(),
				unk1: packet.readUInt32LE(),
				class: packet.readUInt32LE(),
				points: packet.readUInt32LE(),
				unk2: packet.readUInt32LE(),
				signIn: packet.readProudString(),
				unk3: packet.readUInt32LE(),
				lastVisit: packet.readProudString(),
				unk4: packet.readUInt32LE(),
				unk5: packet.readUInt32LE(),
				unk6: packet.readInt32LE(),
				unk7: packet.readUInt32LE(),
				unk8: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(clanId, members) {
		var packet = new Packet()
		packet.writeUInt32LE(clanId)
		packet.writeUInt32LE(members.length)
		for (i = 0; i < members.length; i++) {
			var member = members[i]
			packet.writeUInt64LE(member.accountId)
			packet.writeProudString(member.name)
			packet.writeUInt32LE(member.memberId)
			packet.writeUInt32LE(member.unk1)
			packet.writeUInt32LE(member.class)
			packet.writeUInt32LE(member.points)
			packet.writeUInt32LE(member.unk2)
			packet.writeProudString(member.signIn)
			packet.writeUInt32LE(member.unk3)
			packet.writeProudString(member.lastVisit)
			packet.writeUInt32LE(member.unk4)
			packet.writeUInt32LE(member.unk5)
			packet.writeInt32LE(member.unk6)
			packet.writeUInt32LE(member.unk7)
			packet.writeUInt32LE(member.unk8)
		}
		return packet.data.toBuffer()
	}
}