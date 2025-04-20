var GameRule = require('../Constants/GameRule')
var Team = require('../Constants/Team')
var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet, room) {
		var deserialized = {
			result: packet.readUInt8(),
			event: packet.readUInt8(),
			room: null
		}

		var packet = new Packet(packet.readProudBuffer())

		deserialized.room = {
			winTeam: packet.readUInt32LE(),
			teamCount: packet.readUInt32LE(),
			playerCount: packet.readUInt32LE(),
			spectatorCount: packet.readUInt32LE(),
			alpha: packet.readUInt8(),
			scoreAlpha: packet.readUInt32LE(),
			beta: packet.readUInt8(),
			scoreBeta: packet.readUInt32LE(),
			players: [],
			spectators: []
		}

		for (var i = 0; i < deserialized.room.playerCount; i++) {
			var player = {
				accountId: packet.readUInt64LE(),
				team: packet.readUInt8(),
				state: packet.readUInt8(),
				isReady: packet.readUInt8(),
				gameMode: packet.readUInt32LE(),
				totalPoints: packet.readUInt32LE(),
				unk1: packet.readUInt32LE(),
				resultPen: packet.readUInt32LE(),
				resultExp: packet.readUInt32LE(),
				exp: packet.readUInt32LE(),
				resultRankUp: packet.readUInt8(),
				resultExtraExp: packet.readUInt32LE(),
				resultExtPlayn: packet.readUInt32LE(),
				unk2: packet.readUInt32LE(), // time | new Date().getTime() - room.startTime
				unk3: packet.readUInt32LE(),
				unk4: packet.readUInt32LE(),
				unk5: packet.readUInt32LE(),
				unk6: packet.readUInt32LE(),
				unk7: packet.readUInt32LE(),
				unk8: packet.readUInt32LE(),
				unk9: packet.readUInt32LE(),
				unk10: packet.readUInt32LE(),
				unk11: packet.readUInt32LE(),
				dm: null,
				td: null,
				chaser: null,
				br: null,
				captain: null,
				siege: null,
				warfare: null,
				arena: null,
				practice: null
			}

			if(room.rule === GameRule.Deathmatch) {
				player.dm = {
					killPoints: packet.readUInt32LE(),
					killAssistPoints: packet.readUInt32LE(),
					healPoints: packet.readUInt32LE(),
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt32LE(),
					unk3: packet.readUInt32LE(),
					deaths: packet.readUInt32LE()
				}
			} else if(room.rule === GameRule.Touchdown) {
				player.td = {
					tdScore: packet.readUInt32LE(),
					killPoints1: packet.readUInt32LE(),
					killPoints2: packet.readUInt32LE(),
					killPoints3: packet.readUInt32LE(),
					defensePoints1: packet.readUInt32LE(),
					defensePoints2: packet.readUInt32LE(),
					defensePoints3: packet.readUInt32LE(),
					defensePoints4: packet.readUInt32LE(),
					healPoints: packet.readUInt32LE(),
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt32LE(),
					unk3: packet.readUInt32LE(),
					offensePoints: packet.readUInt32LE(),
					unk4: packet.readUInt32LE(),
					unk5: packet.readUInt32LE()
				}
			} else if(room.rule === GameRule.Chaser) {
				player.chaser = {
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt32LE(),
					unk3: packet.readUInt32LE(),
					unk4: packet.readUInt32LE(),
					unk5: packet.readUInt32LE(),
					unk6: packet.readUInt32LE(),
					unk7: packet.readUInt32LE(),
					unk8: packet.readUInt32LE(),
					unk9: packet.readUInt32LE(),
					unk10: packet.readUInt32LE(),
					unk11: packet.readUInt32LE(),
					unk12: packet.readUInt32LE(),
					unk13: packet.readUInt32LE(),
					unk14: packet.readUInt32LE(),
					unk15: packet.readUInt32LE(),
					unk16: packet.readUInt32LE(),
					unk17: packet.readUInt32LE(),
					unk18: packet.readUInt32LE(),
					unk19: packet.readUInt32LE(),
					unk20: packet.readUInt32LE(),
					unk21: packet.readUInt32LE(),
					unk22: packet.readUInt32LE(),
					unk23: packet.readUInt32LE(),
					unk24: packet.readUInt32LE(),
					unk25: packet.readUInt32LE(),
					unk26: packet.readUInt32LE(),
					unk27: packet.readUInt32LE(),
					unk28: packet.readUInt32LE(),
					unk29: packet.readUInt32LE(),
					unk30: packet.readUInt32LE(),
					unk31: packet.readUInt32LE(),
					unk32: packet.readUInt32LE(),
					unk33: packet.readUInt8(),
					unk34: packet.readUInt32LE(),
					unk35: packet.readUInt32LE(),
					unk36: packet.readUInt32LE(),
					unk37: packet.readUInt32LE()
				}
			} else if(room.rule === GameRule.BattleRoyal) {
				player.br = {
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt32LE(),
					unk3: packet.readUInt32LE(),
					unk4: packet.readUInt32LE(),
					unk5: packet.readUInt32LE(),
					unk6: packet.readUInt32LE(),
					unk7: packet.readUInt32LE(),
					unk8: packet.readUInt32LE(),
					unk9: packet.readUInt32LE(),
					unk10: packet.readUInt32LE(),
					unk11: packet.readUInt32LE()
				}
			} else if(room.rule === GameRule.Captain) {
				player.captain = {
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt32LE(),
					unk3: packet.readUInt32LE(),
					unk4: packet.readUInt32LE(),
					unk5: packet.readUInt32LE(),
					unk6: packet.readUInt32LE(),
					unk7: packet.readUInt32LE(),
					unk8: packet.readUInt32LE(),
					unk9: packet.readUInt32LE(),
					unk10: packet.readUInt32LE(),
					unk11: packet.readUInt32LE(),
					unk12: packet.readUInt8()
				}
			} else if(room.rule === GameRule.Siege) {
				player.siege = {
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt32LE(),
					unk3: packet.readUInt32LE(),
					unk4: packet.readUInt32LE(),
					unk5: packet.readUInt32LE(),
					unk6: packet.readUInt32LE(),
					unk7: packet.readUInt32LE(),
					unk8: packet.readUInt32LE(),
					unk9: packet.readUInt32LE(),
					unk10: packet.readUInt32LE(),
					unk11: packet.readUInt32LE(),
					unk12: packet.readUInt32LE(),
					unk13: packet.readUInt32LE(),
					unk14: packet.readUInt32LE()
				}
			} else if(room.rule === GameRule.Warfare) {
				player.warfare = {
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt32LE(),
					unk3: packet.readUInt32LE(),
					unk4: packet.readUInt32LE(),
					unk5: packet.readUInt32LE(),
					unk6: packet.readUInt32LE(),
					unk7: packet.readUInt32LE(),
					unk8: packet.readUInt32LE(),
					unk9: packet.readUInt32LE(),
					unk10: packet.readUInt32LE(),
					unk11: packet.readUInt32LE()
				}
			} else if(room.rule === GameRule.Arena) {
				player.arena = {
					unk1: packet.readUInt32LE(),
					unk2: packet.readUInt32LE(),
					unk3: packet.readUInt32LE(),
					unk4: packet.readUInt32LE(),
					unk5: packet.readUInt32LE(),
					unk6: packet.readUInt32LE(),
					unk7: packet.readUInt32LE(),
					unk8: packet.readUInt32LE(),
					unk9: packet.readUInt32LE(),
					unk10: packet.readUInt32LE(),
					unk11: packet.readUInt32LE(),
					unk12: packet.readUInt32LE(),
					unk13: packet.readUInt32LE(),
					unk14: packet.readUInt32LE(),
					unk15: packet.readUInt32LE(),
					unk16: packet.readUInt32LE(),
					unk17: packet.readUInt32LE(),
					unk18: packet.readUInt32LE(),
					unk19: packet.readUInt32LE()
				}
			} else if(room.rule === GameRule.Practice) {
				player.practice = {
					scoreAlpha: packet.readUInt32LE()
				}
			}

			deserialized.room.players.push(player)
		}

		// TODO: Check structure
		for (var i = 0; i < deserialized.room.spectatorCount; ++i) {
			deserialized.room.spectators.push({
				playerId: packet.readUInt64LE(),
				unk: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(room, result) {
		var event = 0

		var resultPen
		var resultExp
		var resultRankUp
		var resultExtraExp
		var resultExtPlayn
		if(result) {
			resultPen = 50
			resultExp = 10
			resultRankUp = 1
			resultExtraExp = 10
			resultExtPlayn = 25
			room.scoreAlpha = 50
		} else {
			resultPen = 0
			resultExp = 0
			resultRankUp = 0
			resultExtraExp = 0
			resultExtPlayn = 0
		}

		var spectators = []

		var packet = new Packet()
		packet.writeUInt32LE(room.winTeam)
		packet.writeUInt32LE(2) // teams
		packet.writeUInt32LE(room.players.length)
		packet.writeUInt32LE(spectators.length)
		packet.writeUInt8(Team.Alpha)
		packet.writeUInt32LE(room.scoreAlpha)
		packet.writeUInt8(Team.Beta)
		packet.writeUInt32LE(room.scoreBeta)

		for (var i = 0; i < room.players.length; ++i) {
			var player = room.players[i]
			packet.writeUInt64LE(player.playerId)
			packet.writeUInt8(player.team)
			packet.writeUInt8(player.state)
			packet.writeUInt8(player.isReady)
			packet.writeUInt32LE(player.gameMode)
			packet.writeUInt32LE(player.score.totalPoints)
			packet.writeUInt32LE(0) // unk1
			packet.writeUInt32LE(resultPen)
			packet.writeUInt32LE(resultExp)
			packet.writeUInt32LE(player.exp)
			packet.writeUInt8(resultRankUp)
			packet.writeUInt32LE(resultExtraExp)
			packet.writeUInt32LE(resultExtPlayn)
			packet.writeUInt32LE(0) // unk2 | time | new Date().getTime() - room.startTime
			packet.writeUInt32LE(0) // unk3
			packet.writeUInt32LE(0) // unk4
			packet.writeUInt32LE(0) // unk5
			packet.writeUInt32LE(0) // unk6
			packet.writeUInt32LE(0) // unk7
			packet.writeUInt32LE(0) // unk8
			packet.writeUInt32LE(0) // unk9
			packet.writeUInt32LE(0) // unk10
			packet.writeUInt32LE(0) // unk11
			if(room.rule === GameRule.Deathmatch) {
				packet.writeUInt32LE(player.dm.killPoints >> 1) // kill points
				packet.writeUInt32LE(player.dm.killPoints) // kill assist points
				packet.writeUInt32LE(player.dm.healPoints) //heal points
				packet.writeUInt32LE(0) // unk1
				packet.writeUInt32LE(0) // unk2
				packet.writeUInt32LE(0) // unk3
				packet.writeUInt32LE(player.dm.deaths)
			} else if(room.rule === GameRule.Touchdown) {
				packet.writeUInt32LE(player.td.TDScore)
				packet.writeUInt32LE(player.td.killPoints)
				packet.writeUInt32LE(player.td.killPoints)
				packet.writeUInt32LE(player.td.killPoints) // kill
				packet.writeUInt32LE(player.td.defensePoints)
				packet.writeUInt32LE(player.td.defensePoints)
				packet.writeUInt32LE(player.td.defensePoints) // defensive
				packet.writeUInt32LE(player.td.defensePoints) // defensive
				packet.writeUInt32LE(player.td.healPoints) // heal points
				packet.writeUInt32LE(0) // unk1
				packet.writeUInt32LE(0) // unk2
				packet.writeUInt32LE(0) // unk3
				packet.writeUInt32LE(player.td.offensePoints) // offense point
				packet.writeUInt32LE(0) // unk4
				packet.writeUInt32LE(0) // unk5
			} else if(room.rule === GameRule.Chaser) {
				packet.writeUInt32LE(0) // unk1
				packet.writeUInt32LE(0) // unk2
				packet.writeUInt32LE(0) // unk3
				packet.writeUInt32LE(0) // unk4
				packet.writeUInt32LE(0) // unk5
				packet.writeUInt32LE(0) // unk6
				packet.writeUInt32LE(0) // unk7
				packet.writeUInt32LE(0) // unk8
				packet.writeUInt32LE(0) // unk9
				packet.writeUInt32LE(0) // unk10
				packet.writeUInt32LE(0) // unk11
				packet.writeUInt32LE(0) // unk12
				packet.writeUInt32LE(0) // unk13
				packet.writeUInt32LE(0) // unk14
				packet.writeUInt32LE(0) // unk15
				packet.writeUInt32LE(0) // unk16
				packet.writeUInt32LE(0) // unk17
				packet.writeUInt32LE(0) // unk18
				packet.writeUInt32LE(0) // unk19
				packet.writeUInt32LE(0) // unk20
				packet.writeUInt32LE(0) // unk21
				packet.writeUInt32LE(0) // unk22
				packet.writeUInt32LE(0) // unk23
				packet.writeUInt32LE(0) // unk24
				packet.writeUInt32LE(0) // unk25
				packet.writeUInt32LE(1) // unk26
				packet.writeUInt32LE(0) // unk27
				packet.writeUInt32LE(0) // unk28
				packet.writeUInt32LE(0) // unk29
				packet.writeUInt32LE(0) // unk30
				packet.writeUInt32LE(0) // unk31
				packet.writeUInt32LE(0) // unk32
				packet.writeUInt8(0) // unk33
				packet.writeUInt32LE(1) // unk34
				packet.writeUInt32LE(0) // unk35
				packet.writeUInt32LE(0) // unk36
				packet.writeUInt32LE(0) // unk37
			} else if(room.rule === GameRule.BattleRoyal) {
				packet.writeUInt32LE(0) // unk1
				packet.writeUInt32LE(0) // unk2
				packet.writeUInt32LE(0) // unk3
				packet.writeUInt32LE(0) // unk4
				packet.writeUInt32LE(0) // unk5
				packet.writeUInt32LE(0) // unk6
				packet.writeUInt32LE(0) // unk7
				packet.writeUInt32LE(0) // unk8
				packet.writeUInt32LE(0) // unk9
				packet.writeUInt32LE(0) // unk10
				packet.writeUInt32LE(0) // unk11
			} else if(room.rule === GameRule.Captain) {
				packet.writeUInt32LE(0) // unk1
				packet.writeUInt32LE(0) // unk2
				packet.writeUInt32LE(0) // unk3
				packet.writeUInt32LE(0) // unk4
				packet.writeUInt32LE(0) // unk5
				packet.writeUInt32LE(0) // unk6
				packet.writeUInt32LE(0) // unk7
				packet.writeUInt32LE(0) // unk8
				packet.writeUInt32LE(0) // unk9
				packet.writeUInt32LE(0) // unk10
				packet.writeUInt32LE(0) // unk11
				packet.writeUInt8(0) // unk12
			} else if(room.rule === GameRule.Siege) {
				packet.writeUInt32LE(0) // unk1
				packet.writeUInt32LE(0) // unk2
				packet.writeUInt32LE(0) // unk3
				packet.writeUInt32LE(0) // unk4
				packet.writeUInt32LE(0) // unk5
				packet.writeUInt32LE(0) // unk6
				packet.writeUInt32LE(0) // unk7
				packet.writeUInt32LE(0) // unk8
				packet.writeUInt32LE(0) // unk9
				packet.writeUInt32LE(0) // unk10
				packet.writeUInt32LE(0) // unk11
				packet.writeUInt32LE(0) // unk12
				packet.writeUInt32LE(0) // unk13
				packet.writeUInt32LE(0) // unk14
			} else if(room.rule === GameRule.Warfare) {
				packet.writeUInt32LE(0) // unk1
				packet.writeUInt32LE(0) // unk2
				packet.writeUInt32LE(0) // unk3
				packet.writeUInt32LE(0) // unk4
				packet.writeUInt32LE(0) // unk5
				packet.writeUInt32LE(0) // unk6
				packet.writeUInt32LE(0) // unk7
				packet.writeUInt32LE(0) // unk8
				packet.writeUInt32LE(0) // unk9
				packet.writeUInt32LE(0) // unk10
				packet.writeUInt32LE(0) // unk11
			} else if(room.rule === GameRule.Arena) {
				packet.writeUInt32LE(0) // unk1
				packet.writeUInt32LE(0) // unk2
				packet.writeUInt32LE(0) // unk3
				packet.writeUInt32LE(0) // unk4
				packet.writeUInt32LE(0) // unk5
				packet.writeUInt32LE(0) // unk6
				packet.writeUInt32LE(0) // unk7
				packet.writeUInt32LE(0) // unk8
				packet.writeUInt32LE(0) // unk9
				packet.writeUInt32LE(0) // unk10
				packet.writeUInt32LE(0) // unk11
				packet.writeUInt32LE(0) // unk12
				packet.writeUInt32LE(0) // unk13
				packet.writeUInt32LE(0) // unk14
				packet.writeUInt32LE(0) // unk15
				packet.writeUInt32LE(0) // unk16
				packet.writeUInt32LE(0) // unk17
				packet.writeUInt32LE(0) // unk18
				packet.writeUInt32LE(0) // unk19
			} else if(room.rule === GameRule.Practice) {
				packet.writeUInt32LE(room.scoreAlpha)
			}
		}

		// TODO: Check structure
		for (var i = 0; i < spectators.length; ++i) {
			var spectator = spectators[i]
			packet.writeUInt64LE(spectators.playerId)
			packet.writeUInt32LE(0)
		}

		var data = packet.data.toBuffer()

		var packet = new Packet()
		packet.writeUInt8(+!!result)
		packet.writeUInt8(event)
		packet.writeProudBuffer(data)
		return packet.data.toBuffer()
	}
}