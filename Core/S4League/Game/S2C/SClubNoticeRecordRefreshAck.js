var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			matches: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			var match = {
				clanName: packet.readProudString(),
				enemyName: packet.readProudString(),
				rule: packet.readUInt32LE(),
				map: packet.readUInt32LE(),
				win: packet.readUInt32LE(),
				unk: packet.readUInt32LE(),
				members: [],
				enemies: []
			}

			var memberCount = packet.readUInt32LE()
			for (var iMember = 0; iMember < memberCount; iMember++) {
				match.members.push({
					name: packet.readProudString()
				})
			}

			var enemyCount = packet.readUInt32LE()
			for (var iEnemy = 0; iEnemy < enemyCount; iEnemy++) {
				match.enemies.push({
					name: packet.readProudString()
				})
			}

			deserialized.matches.push(match)
		}

		return deserialized
	},
	serialize: function(/*result, matches*/) {
		var matches = [
			{
				enemyName: 'Clan1',
				clanName: 'TestClub001',
				rule: 2,
				map: 66,
				win: 0,
				unk: 12,
				members: [
					{
						name: 'Player 1.1'
					},
					{
						name: 'Player 1.2'
					},
					{
						name: 'Player 1.3'
					},
					{
						name: 'Player 1.4'
					},
					{
						name: 'Player 1.5'
					},
					{
						name: 'Player 1.6'
					}
				],
				enemies: [
					{
						name: 'Player 2.1'
					},
					{
						name: 'Player 2.2'
					},
					{
						name: 'Player 2.3'
					},
					{
						name: 'Player 2.4'
					},
					{
						name: 'Player 2.5'
					},
					{
						name: 'Player 2.6'
					}
				]
			},
			{
				enemyName: 'Clan2',
				clanName: 'TestClub001',
				rule: 2,
				map: 66,
				win: 1,
				unk: 12,
				members: [
					{
						name: 'Player 1.1'
					},
					{
						name: 'Player 1.2'
					},
					{
						name: 'Player 1.3'
					}
				],
				enemies: [
					{
						name: 'Player 2.1'
					},
					{
						name: 'Player 2.2'
					},
					{
						name: 'Player 2.3'
					}
				]
			},
			{
				enemyName: 'Clan3',
				clanName: 'TestClub001',
				rule: 2,
				map: 66,
				win: 0,
				unk: 12,
				members: [
					{
						name: 'Player 1.1'
					},
					{
						name: 'Player 1.2'
					},
					{
						name: 'Player 1.3'
					}
				],
				enemies: [
					{
						name: 'Player 2.1'
					},
					{
						name: 'Player 2.2'
					},
					{
						name: 'Player 2.3'
					}
				]
			},
			{
				enemyName: 'Clan4',
				clanName: 'TestClub001',
				rule: 2,
				map: 66,
				win: 1,
				unk: 12,
				members: [
					{
						name: 'Player 1.1'
					},
					{
						name: 'Player 1.2'
					},
					{
						name: 'Player 1.3'
					}
				],
				enemies: [
					{
						name: 'Player 2.1'
					},
					{
						name: 'Player 2.2'
					},
					{
						name: 'Player 2.3'
					}
				]
			},
			{
				enemyName: 'Clan5',
				clanName: 'TestClub001',
				rule: 2,
				map: 66,
				win: 0,
				unk: 12,
				members: [
					{
						name: 'Player 1.1'
					},
					{
						name: 'Player 1.2'
					},
					{
						name: 'Player 1.3'
					}
				],
				enemies: [
					{
						name: 'Player 2.1'
					},
					{
						name: 'Player 2.2'
					},
					{
						name: 'Player 2.3'
					}
				]
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(0) // result
		packet.writeUInt32LE(matches.length)
		for (var i = 0; i < matches.length; i++) {
			var match = matches[i]
			packet.writeProudString(match.clanName)
			packet.writeProudString(match.enemyName)
			packet.writeUInt32LE(match.rule)
			packet.writeUInt32LE(match.map)
			packet.writeUInt32LE(match.win)
			packet.writeUInt32LE(match.unk)

			packet.writeUInt32LE(match.members.length)
			for (var iMembers = 0; iMembers < match.members.length; iMembers++) {
				packet.writeProudString(match.members[iMembers].name)
			}

			packet.writeUInt32LE(match.enemies.length)
			for (var iEnemies = 0; iEnemies < match.enemies.length; iEnemies++) {
				packet.writeProudString(match.enemies[iEnemies].name)
			}

		}
		return packet.data.toBuffer()
	}
}