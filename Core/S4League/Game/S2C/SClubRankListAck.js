var Packet = require('../../../Network/Packet')

/*
02 00 00 00 # total ranks
02 00 00 00 # count

# 1
aa 3e 07 00 # clan id
01 01 07 50 52 4f 2d 69 73 68 # name
01 01 07 31 32 2d 37 2d 32 33 # mark id
01 01 00 # unk1
c9 cb 08 00 00 00 00 00 # master account id
50 00 00 00 # master level
01 01 0a 48 65 6c 6c 61 5f 48 65 6c 6c # master name
01 00 00 00 # unk2
09 00 00 00 # memberCount
01 01 03 61 73 64 # description
01 01 0e 32 30 31 32 30 39 31 38 30 39 30 33 31 35 # creation date
01 01 00 # unk3
01 01 00 # unk4
01 00 00 00 # rank?
00 00 00 00 # unk5
00 00 00 00 # unk6
00 00 00 00 # unk7
d0 07 00 00 # club points
00 00 00 00 # unk8
02 00 00 00 # wins
00 00 00 00 # loses
0a 00 00 00 # ladder points
00 00 00 00 # unk9
00 00 # unk10

# 2
f1 35 0e 00 # clan id
01 01 09 54 65 61 6d 20 53 34 4c 20 # name
01 01 00 # mark id
01 01 00 # unk1
a8 c8 cf 00 00 00 00 00 # master account id
50 00 00 00 # master level
01 01 09 5b 47 4d 5d 4d 75 67 65 6e # master name
01 00 00 00 # unk2
03 00 00 00 # memberCount
01 01 01 20 # description
01 01 0e 32 30 31 35 30 39 32 34 31 34 33 30 35 33 # creation date
01 01 00 # unk3
01 01 00 # unk4
02 00 00 00 # rank?
00 00 00 00 # unk5
00 00 00 00 # unk6
00 00 00 00 # unk7
d0 07 00 00 # club points
00 00 00 00 # unk8
00 00 00 00 # wins
02 00 00 00 # loses
04 00 00 00 # ladder points
00 00 00 00 # unk9
00 00 # unk10
*/

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			totalRanks: packet.readUInt32LE(),
			ranks: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.ranks.push({
				id: packet.readUInt32LE(),
				name: packet.readProudString(),
				markId: packet.readProudString(),
				unk1: packet.readProudString(), // class
				masterAccountId: packet.readUInt64LE(),
				masterLevel: packet.readUInt32LE(),
				masterName: packet.readProudString(),
				unk2: packet.readUInt32LE(),
				memberCount: packet.readUInt32LE(),
				description: packet.readProudString(),
				creationDate: packet.readProudString(),
				unk3: packet.readProudString(),
				unk4: packet.readProudString(),
				rank: packet.readUInt32LE(),
				unk5: packet.readUInt32LE(),
				unk6: packet.readUInt32LE(),
				unk7: packet.readUInt32LE(),
				clubPoints: packet.readUInt32LE(),
				unk8: packet.readUInt32LE(),
				wins: packet.readUInt32LE(),
				loses: packet.readUInt32LE(),
				ladderPoints: packet.readUInt32LE(),
				unk9: packet.readUInt32LE(),
				unk10: packet.readUInt16LE()
			})
		}

		return deserialized
	},
	serialize: function(/*totalRanks, ranks*/) {
		var ranks = [
			{
				id: 1,
				name: 'Clan1',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 1,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 2,
				name: 'Clan2',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 2,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 3,
				name: 'Clan3',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 3,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 4,
				name: 'Clan4',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 4,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 5,
				name: 'Clan5',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 5,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 6,
				name: 'Clan6',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 6,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 7,
				name: 'Clan7',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 7,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 8,
				name: 'Clan8',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 8,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 9,
				name: 'Clan9',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 9,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 10,
				name: 'Clan10',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 10,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			},
			{
				id: 11,
				name: 'Clan11',
				markId: 'D-00001',
				unk1: '',
				masterAccountId: 1,
				masterLevel: 80,
				masterName: 'Master 1',
				unk2: 1,
				memberCount: 30,
				description: 'Description',
				creationDate: '20150924143053',
				unk3: '',
				unk4: '',
				rank: 11,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				clubPoints: 69,
				unk8: 0,
				wins: 50,
				loses: 25,
				ladderPoints: 6969,
				unk9: 0,
				unk10: 0
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(ranks.length * 500) // total ranks
		packet.writeUInt32LE(ranks.length)
		for (var i = 0; i < ranks.length; i++) {
			var rank = ranks[i]
			packet.writeUInt32LE(rank.id)
			packet.writeProudString(rank.name)
			packet.writeProudString(rank.markId)
			packet.writeProudString(rank.unk1)
			packet.writeUInt64LE(rank.masterAccountId)
			packet.writeUInt32LE(rank.masterLevel)
			packet.writeProudString(rank.masterName)
			packet.writeUInt32LE(rank.unk2)
			packet.writeUInt32LE(rank.memberCount)
			packet.writeProudString(rank.description)
			packet.writeProudString(rank.creationDate)
			packet.writeProudString(rank.unk3)
			packet.writeProudString(rank.unk4)
			packet.writeUInt32LE(rank.rank)
			packet.writeUInt32LE(rank.unk5)
			packet.writeUInt32LE(rank.unk6)
			packet.writeUInt32LE(rank.unk7)
			packet.writeUInt32LE(rank.clubPoints)
			packet.writeUInt32LE(rank.unk8)
			packet.writeUInt32LE(rank.wins)
			packet.writeUInt32LE(rank.loses)
			packet.writeUInt32LE(rank.ladderPoints)
			packet.writeUInt32LE(rank.unk9)
			packet.writeUInt16LE(rank.unk10)
		}
		return packet.data.toBuffer()
	}
}