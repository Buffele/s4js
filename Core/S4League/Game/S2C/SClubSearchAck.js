var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			totalClans: packet.readUInt32LE(),
			clans: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.clans.push({
				id: packet.readUInt32LE(),
				logo: packet.readProudString(),
				name: packet.readProudString(),
				master: packet.readProudString(),
				class: packet.readUInt32LE(),
				points: packet.readUInt32LE(),
				rank: packet.readUInt32LE(),
				creationDate: packet.readProudString(),
				memberCount: packet.readUInt32LE(),
				activityArea: packet.readUInt32LE(),
				activityPurpose: packet.readUInt32LE(),
				introduction: packet.readProudString()
			})
		}

		return deserialized
	},
	serialize: function(/*totalClans, clans*/) {
		var clans = [
			{
				id: 1,
				logo: 'D-00001',
				name: 'Clan 1',
				master: 'Master 1',
				class: 2,
				points: 10000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1337,
				activityArea: 1,
				activityPurpose: 1,
				introduction: 'Awesome Introduction 1.'
			},
			{
				id: 2,
				logo: 'D-00002',
				name: 'Clan 2',
				master: 'Master 2',
				class: 1,
				points: 9000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1336,
				activityArea: 2,
				activityPurpose: 2,
				introduction: 'Awesome Introduction 2.'
			},
			{
				id: 3,
				logo: 'D-00003',
				name: 'Clan 3',
				master: 'Master 3',
				class: 0,
				points: 8000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1335,
				activityArea: 3,
				activityPurpose: 3,
				introduction: 'Awesome Introduction 3.'
			},
			{
				id: 4,
				logo: 'D-00004',
				name: 'Clan 4',
				master: 'Master 4',
				class: 2,
				points: 7000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1334,
				activityArea: 4,
				activityPurpose: 4,
				introduction: 'Awesome Introduction 4.'
			},
			{
				id: 5,
				logo: 'D-00005',
				name: 'Clan 5',
				master: 'Master 5',
				class: 1,
				points: 6000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1333,
				activityArea: 5,
				activityPurpose: 1,
				introduction: 'Awesome Introduction 5.'
			},
			{
				id: 6,
				logo: 'D-00006',
				name: 'Clan 6',
				master: 'Master 6',
				class: 0,
				points: 5000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1332,
				activityArea: 6,
				activityPurpose: 2,
				introduction: 'Awesome Introduction 6.'
			},
			{
				id: 7,
				logo: 'D-00007',
				name: 'Clan 7',
				master: 'Master 7',
				class: 2,
				points: 4000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1331,
				activityArea: 7,
				activityPurpose: 3,
				introduction: 'Awesome Introduction 7.'
			},
			{
				id: 8,
				logo: 'D-00008',
				name: 'Clan 8',
				master: 'Master 8',
				class: 1,
				points: 3000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1330,
				activityArea: 8,
				activityPurpose: 4,
				introduction: 'Awesome Introduction 8.'
			},
			{
				id: 9,
				logo: 'D-00009',
				name: 'Clan 9',
				master: 'Master 9',
				class: 0,
				points: 2000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1329,
				activityArea: 9,
				activityPurpose: 1,
				introduction: 'Awesome Introduction 9.'
			},
			{
				id: 10,
				logo: 'D-000010',
				name: 'Clan 10',
				master: 'Master 10',
				class: 2,
				points: 1000,
				rank: 0,
				creationDate: '20090821194111',
				memberCount: 1328,
				activityArea: 1,
				activityPurpose: 2,
				introduction: 'Awesome Introduction 10.'
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(/*totalClans*/419844)
		packet.writeUInt32LE(clans.length)
		for (i = 0; i < clans.length; i++) {
			var clan = clans[i]
			packet.writeUInt32LE(clan.id)
			packet.writeProudString(clan.logo)
			packet.writeProudString(clan.name)
			packet.writeProudString(clan.master)
			packet.writeUInt32LE(clan.class)
			packet.writeUInt32LE(clan.points)
			packet.writeUInt32LE(clan.rank)
			packet.writeProudString(clan.creationDate)
			packet.writeUInt32LE(clan.memberCount)
			packet.writeUInt32LE(clan.activityArea)
			packet.writeUInt32LE(clan.activityPurpose)
			packet.writeProudString(clan.introduction)
		}
		return packet.data.toBuffer()
	}
}