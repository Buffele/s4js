var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')

var GameRandom = require('../../Core/S4League/Game/Constants/GameRandom')
var GameRule = require('../../Core/S4League/Game/Constants/GameRule')
var GameRuleState = require('../../Core/S4League/Game/Constants/GameRuleState')
var GameRuleSubState = require('../../Core/S4League/Game/Constants/GameRuleSubState')
var Map = require('../../Core/S4League/Game/Constants/Map')
var PlayerGameMode = require('../../Core/S4League/Game/Constants/PlayerGameMode')
var PlayerState = require('../../Core/S4League/Game/Constants/PlayerState')
var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')
var Team = require('../../Core/S4League/Game/Constants/Team')

var ConfigManager = require('../Manager/ConfigManager')

// S2C
var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')
var SRoomDisposeAck = require('../../Core/S4League/Game/S2C/SRoomDisposeAck')
var SRoomDeployAck2 = require('../../Core/S4League/Game/S2C/SRoomDeployAck2')
var SChallengeRankersAck = require('../../Core/S4League/Game/S2C/SChallengeRankersAck')
var SRoomEnterRoomInfoAck = require('../../Core/S4League/Game/S2C/SRoomEnterRoomInfoAck')
var SRoomEnterRoomInfoAck2 = require('../../Core/S4League/Game/S2C/SRoomEnterRoomInfoAck2')
var SRoomCurrentCharacterSlotAck = require('../../Core/S4League/Game/S2C/SRoomCurrentCharacterSlotAck')
var SRoomPlayerInfoListForEnterPlayerAck = require('../../Core/S4League/Game/S2C/SRoomPlayerInfoListForEnterPlayerAck')
var SRoomPlayerInfoListForEnterPlayerForCollectBookAck = require('../../Core/S4League/Game/S2C/SRoomPlayerInfoListForEnterPlayerForCollectBookAck')
var SRoomClubInfoListForEnterPlayerAck = require('../../Core/S4League/Game/S2C/SRoomClubInfoListForEnterPlayerAck')
var SRoomChangeMasterAck = require('../../Core/S4League/Game/S2C/SRoomChangeMasterAck')
var SRoomChangeRefereeAck = require('../../Core/S4League/Game/S2C/SRoomChangeRefereeAck')
var SRoomEnterClubInfoAck = require('../../Core/S4League/Game/S2C/SRoomEnterClubInfoAck')
var SRoomEnterPlayerInfoAck = require('../../Core/S4League/Game/S2C/SRoomEnterPlayerInfoAck')
var SRoomEnterPlayerInfoForCollectBookAck = require('../../Core/S4League/Game/S2C/SRoomEnterPlayerInfoForCollectBookAck')
var SRoomEnterPlayerForBookNameTagsAck = require('../../Core/S4League/Game/S2C/SRoomEnterPlayerForBookNameTagsAck')
var SGameBriefingInfoAck = require('../../Core/S4League/Game/S2C/SGameBriefingInfoAck')
var SRoomEnterPlayerInfoListForNameTagAck = require('../../Core/S4League/Game/S2C/SRoomEnterPlayerInfoListForNameTagAck')
var SRoomLeavePlayerAck = require('../../Core/S4League/Game/S2C/SRoomLeavePlayerAck')
var SRoomLeavePlayerInfoAck = require('../../Core/S4League/Game/S2C/SRoomLeavePlayerInfoAck')
var SRoomChangeTeamAck = require('../../Core/S4League/Game/S2C/SRoomChangeTeamAck')
var SRoomMixedTeamBriefingInfoAck = require('../../Core/S4League/Game/S2C/SRoomMixedTeamBriefingInfoAck')
var SRoomPlayModeChangeAck = require('../../Core/S4League/Game/S2C/SRoomPlayModeChangeAck')
var SGameRefreshGameRuleInfoAck = require('../../Core/S4League/Game/S2C/SGameRefreshGameRuleInfoAck')
var SRoomGameStartAck = require('../../Core/S4League/Game/S2C/SRoomGameStartAck')
var SRoomGameEndLoadingAck = require('../../Core/S4League/Game/S2C/SRoomGameEndLoadingAck')
var SRoomGamePlayCountDownAck = require('../../Core/S4League/Game/S2C/SRoomGamePlayCountDownAck')
var SRoomChangeMasterRequestAck = require('../../Core/S4League/Game/S2C/SRoomChangeMasterRequestAck')
var SRoomReadyRoundAck = require('../../Core/S4League/Game/S2C/SRoomReadyRoundAck')
var SRoomGameLoadingAck = require('../../Core/S4League/Game/S2C/SRoomGameLoadingAck')
var SRoomBeginRoundAck = require('../../Core/S4League/Game/S2C/SRoomBeginRoundAck')
var SRoomChangeRoomInfoAck2 = require('../../Core/S4League/Game/S2C/SRoomChangeRoomInfoAck2')
var SRoomChangeRuleAck = require('../../Core/S4League/Game/S2C/SRoomChangeRuleAck')
var SArenaSetGameOptionAck = require('../../Core/S4League/Game/S2C/SArenaSetGameOptionAck')
var SGameChangeStateAck = require('../../Core/S4League/Game/S2C/SGameChangeStateAck')
var SGameChangeSubStateAck = require('../../Core/S4League/Game/S2C/SGameChangeSubStateAck')
var SGameEventMessageAck = require('../../Core/S4League/Game/S2C/SGameEventMessageAck')
var SRoomModeChangeItemAck = require('../../Core/S4League/Game/S2C/SRoomModeChangeItemAck')
var SInGameItemDropAck = require('../../Core/S4League/Game/S2C/SInGameItemDropAck')
var SInGameItemGetAck = require('../../Core/S4League/Game/S2C/SInGameItemGetAck')

var log = new Logger('RoomManager', true)

var RoomManager = function(server, data) {
	this.server = server
	this.data = data

	setInterval(function() {
		for (var i = 0; i < this.data.rooms.length; ++i) {
			var room = this.data.rooms[i]
			if(room.state === GameRuleState.Playing && room.subState !== GameRuleSubState.HalfTime) {
				this.onTick(room)
			}
		}
	}.bind(this), 1000)
}

RoomManager.prototype = {
	create: function(room, session, type) {
		if(!ConfigManager.testMode) {
			// Validate rule
			var allowedRules = [
				GameRule.Deathmatch,
				GameRule.Touchdown,
				GameRule.Practice
			]
			if(allowedRules.indexOf(room.rule) === -1) {
				log.debug('Invalid Rule! ' + GameRule.getKeyByValue(room.rule))
				this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedToRequestTask))
				return
			}
		}

		// TODO: Validate Room!

		room.id = this.createRoomId(session.channelId)
		room.winTeam = Team.Neutral

		log.debug('Creating Room #' + room.id)

		if(room.rule === GameRule.Random && room.random === GameRandom.RuleAndMap) {
			// TODO: Generate random rule with map

			room.rule = 2
			room.map = 67
			room.timeLimit = 1200000
			room.scoreLimit = 8
		} else if(room.random === GameRandom.Map) {
			// TODO: Generate random map to rule

			if(room.rule === GameRule.Deathmatch) {
				room.map = Map.Neden3DM
			} else if(room.rule === GameRule.Touchdown) {
				room.map = Map.Neden3TD
			} else if(room.rule === GameRule.Chaser) {
				room.map = Map.Nightmare
			} else if(room.rule === GameRule.BattleRoyal) {
				room.map = Map.Neoniac
			} else if(room.rule === GameRule.Captain) {
				room.map = Map.NightmareCP
			} else if(room.rule === GameRule.Siege) {
				room.map = Map.Skyline
			} else if(room.rule === GameRule.Warfare) {
				room.map = Map.HoliDay
			} else if(room.rule === GameRule.Arena) {
				room.map = Map.NeoArena
			}
		}

		this.data.addRoom(room)

		/*
		var items = [
			// Weapons
			{
				itemId: 0,
				shopId: 0,
				periodType: 0,
				period: 0,
				color: 0,
				durability: 0,
				effects: [
					
				]
			},
			{
				itemId: 0,
				shopId: 0,
				periodType: 0,
				period: 0,
				color: 0,
				durability: 0,
				effects: [
					
				]
			},
			{
				itemId: 0,
				shopId: 0,
				periodType: 0,
				period: 0,
				color: 0,
				durability: 0,
				effects: [
					
				]
			},
			// Skill
			{
				itemId: 0,
				shopId: 0,
				periodType: 0,
				period: 0,
				color: 0,
				durability: 0,
				effects: [
					
				]
			}
		]

		this.server.send(session, GameOPCode.SRoomModeChangeItemAck, SRoomModeChangeItemAck.serialize(0, 0, items))
		log.debug('Packet Sent [SRoomModeChangeItemAck]')

		setTimeout(function() {
			var items = [
				// Weapons
				{
					itemId: 2050015,
					shopId: 3,
					periodType: 1,
					period: 0,
					color: 0,
					durability: 2400,
					effects: [
						{
							effectId: 1229613099
						}
					]
				},
				{
					itemId: 0,
					shopId: 0,
					periodType: 1,
					period: 0,
					color: 0,
					durability: 2400,
					effects: [
	
					]
				},
				{
					itemId: 0,
					shopId: 0,
					periodType: 1,
					period: 0,
					color: 0,
					durability: 2400,
					effects: [
						
					]
				},
				// Skill
				{
					itemId: 3060003,
					shopId: 1,
					periodType: 1,
					period: 0,
					color: 0,
					durability: 2400,
					effects: [
						
					]
				}
			]

			this.server.send(session, GameOPCode.SRoomModeChangeItemAck, SRoomModeChangeItemAck.serialize(1, 1, items))
			log.debug('Packet Sent [SRoomModeChangeItemAck]')
		}.bind(this), 10000)
		*/

		this.data.broadcastToChannel(session.channelId, GameOPCode.SRoomDeployAck2, SRoomDeployAck2.serialize(room))
		log.debug('Packet Sent [SRoomDeployAck2]')

		this.join(session, room.id, type)
	},
	join: function(session, roomId, type) {
		log.debug('Player ' + session.playerId + ' joining Room #' + roomId)

		var room = this.data.getRoomByIDAndChannelID(roomId, session.channelId)

		if(!room) {
			return this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailEnterRoom))
		}

		if(session.roomId) {
			return
		}

		if(room.rule === GameRule.Practice && session.playerId !== room.master.playerId) {
			return this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.RoomAllowedPlayerNumberExceed))
		}

		if(room.players.length >= room.playerLimit) {
			return this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.RoomAllowedPlayerNumberExceed))
		}

		//if(true) {
		if(room.rule === GameRule.BattleRoyal) {
		//if(room.rule === GameRule.Practice) {
			var unk1 = 1
			var unk2 = 1
			var items = [
				// Weapons
				{
					itemId: 2010007,
					shopId: 1,
					periodType: 1,
					period: 0,
					color: 0,
					durability: 2400,
					effects: [
					
					]
				},
				{
					itemId: 0,
					shopId: 0,
					periodType: 1,
					period: 0,
					color: 0,
					durability: 2400,
					effects: [

					]
				},
				{
					itemId: 0,
					shopId: 0,
					periodType: 1,
					period: 0,
					color: 0,
					durability: 2400,
					effects: [
						
					]
				},
				// Skill
				{
					itemId: 3000003,
					shopId: 1,
					periodType: 1,
					period: 0,
					color: 0,
					durability: 2400,
					effects: [
						
					]
				}
			]
		} else {
			var unk1 = 0
			var unk2 = 0
			var items = [
				// Weapons
				{
					itemId: 0,
					shopId: 0,
					periodType: 0,
					period: 0,
					color: 0,
					durability: 0,
					effects: [
						
					]
				},
				{
					itemId: 0,
					shopId: 0,
					periodType: 0,
					period: 0,
					color: 0,
					durability: 0,
					effects: [
						
					]
				},
				{
					itemId: 0,
					shopId: 0,
					periodType: 0,
					period: 0,
					color: 0,
					durability: 0,
					effects: [
						
					]
				},
				// Skill
				{
					itemId: 0,
					shopId: 0,
					periodType: 0,
					period: 0,
					color: 0,
					durability: 0,
					effects: [
						
					]
				}
			]
		}

		this.server.send(session, GameOPCode.SRoomModeChangeItemAck, SRoomModeChangeItemAck.serialize(unk1, unk2, items))
		log.debug('Packet Sent [SRoomModeChangeItemAck]')

		room.players.push(session)

		session.roomId = room.id
		session.state = PlayerState.Lobby
		session.isConnecting = true

		this.resetStats(session)

		if(room.rule === GameRule.Training) {
			this.server.send(session, GameOPCode.SChallengeRankersAck, SChallengeRankersAck.serialize(room))
			log.debug('Packet Sent [SChallengeRankersAck]')
		}

		if(type === 1) {
			this.server.send(session, GameOPCode.SRoomEnterRoomInfoAck, SRoomEnterRoomInfoAck.serialize(room, ConfigManager.relay))
			log.debug('Packet Sent [SRoomEnterRoomInfoAck]')
		} else {
			this.server.send(session, GameOPCode.SRoomEnterRoomInfoAck2, SRoomEnterRoomInfoAck2.serialize(room, ConfigManager.relay))
			log.debug('Packet Sent [SRoomEnterRoomInfoAck2]')
		}

		session.slot = this.generateUniqueSlot(room)

		this.server.send(session, GameOPCode.SRoomCurrentCharacterSlotAck, SRoomCurrentCharacterSlotAck.serialize(this.data.getProcessUptime(), session.slot))
		log.debug('Packet Sent [SRoomCurrentCharacterSlotAck]')

		this.server.send(session, GameOPCode.SRoomPlayerInfoListForEnterPlayerAck, SRoomPlayerInfoListForEnterPlayerAck.serialize(room))
		log.debug('Packet Sent [SRoomPlayerInfoListForEnterPlayerAck]')

		this.server.send(session, GameOPCode.SRoomPlayerInfoListForEnterPlayerForCollectBookAck, SRoomPlayerInfoListForEnterPlayerForCollectBookAck.serialize(room))
		log.debug('Packet Sent [SRoomPlayerInfoListForEnterPlayerForCollectBookAck]')

		this.server.send(session, GameOPCode.SRoomClubInfoListForEnterPlayerAck, SRoomClubInfoListForEnterPlayerAck.serialize(room))
		log.debug('Packet Sent [SRoomClubInfoListForEnterPlayerAck]')

		//SItemClearInvalidEquipItemAck
		//SItemClearEsperChipAck
	},
	enter: function(session, roomId) {
		log.debug('Player ' + session.playerId + ' entering Room #' + roomId)

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailEnterRoom))
		}

		if(!session.isConnecting) {
			return
		}

		session.isConnecting = false
		session.gameMode = PlayerGameMode.Normal

		// TODO: I think this should be moved to join...
		var numAlpha = this.countPlayersInTeam(room, Team.Alpha)
		var numBeta = this.countPlayersInTeam(room, Team.Beta)

		if (numAlpha < numBeta) {
			session.team = Team.Alpha
		} else if (numAlpha > numBeta) {
			session.team = Team.Beta
		} else {
			session.team = Team.Alpha
		}

		this.server.send(session, GameOPCode.SRoomChangeMasterAck, SRoomChangeMasterAck.serialize(room.master.playerId))
		log.debug('Packet Sent [SRoomChangeMasterAck]')

		this.server.send(session, GameOPCode.SRoomChangeRefereeAck, SRoomChangeRefereeAck.serialize(room.master.playerId))
		log.debug('Packet Sent [SRoomChangeRefereeAck]')

		// TODO: If rule === Scenario
		/*
		[Proxy] DEBUG - Client <-- Server:
		[Proxy] DEBUG - Packet received: [SArcadeStageSelectAck][3053]
		[Proxy] DEBUG -
		01 00
		*/

		// START Broadcast packets to other players

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomEnterClubInfoAck, SRoomEnterClubInfoAck.serialize(session.clan.id, session.clan.name, session.clan.markId), session)
		log.debug('Packet Sent [SRoomEnterClubInfoAck]')

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomEnterPlayerInfoAck, SRoomEnterPlayerInfoAck.serialize(session.clan.id, session.playerId, session.clan.name), session)
		log.debug('Packet Sent [SRoomEnterPlayerInfoAck]')

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomEnterPlayerInfoForCollectBookAck, SRoomEnterPlayerInfoForCollectBookAck.serialize(session.playerId, 0), session)
		log.debug('Packet Sent [SRoomEnterPlayerInfoForCollectBookAck]')

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomEnterPlayerForBookNameTagsAck, SRoomEnterPlayerForBookNameTagsAck.serialize(session.playerId, session.team, session.exp, session.name))
		log.debug('Packet Sent [SRoomEnterPlayerForBookNameTagsAck]')

		// END Broadcast packets to other players

		this.server.send(session, GameOPCode.SGameBriefingInfoAck, SGameBriefingInfoAck.serialize(room))
		log.debug('Packet Sent [SGameBriefingInfoAck]')

		this.server.send(session, GameOPCode.SRoomEnterPlayerInfoListForNameTagAck, SRoomEnterPlayerInfoListForNameTagAck.serialize(room))
		log.debug('Packet Sent [SRoomEnterPlayerInfoListForNameTagAck]')
	},
	leave: function(session, roomId, reason) {
		log.debug('Player ' + session.playerId + ' leaving Room #' + roomId)

		var reasonAck
		if(reason === 6) { // DC
			reasonAck = 0
		} else if(reason === 5) { // room close
			reasonAck = 5
		} else if(reason === 4) { // mod kick
			reasonAck = 4
		} else if(reason === 3) { // afk
			reasonAck = 3
		} else if(reason === 2) { // afk
			reasonAck = 2
		} else if(reason === 1) { // kick
			reasonAck = 1
		} else if(reason === 0) { // leave
			reasonAck = 0
		} else {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailEnterRoom))
		}

		// DC: Pre remove the session from the room
		if(reason === 6) {
			room.players.splice(room.players.indexOf(session), 1)
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomLeavePlayerAck, SRoomLeavePlayerAck.serialize(session.playerId, session.name, reasonAck))
		log.debug('Packet Sent [SRoomLeavePlayerAck]')

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomLeavePlayerInfoAck, SRoomLeavePlayerInfoAck.serialize(session.playerId))
		log.debug('Packet Sent [SRoomLeavePlayerInfoAck]')

		if(reason !== 6) {
			room.players.splice(room.players.indexOf(session), 1)
		}

		//session.roomId = null
		session.slot = null
		session.state = PlayerState.Lobby
		session.team = Team.Neutral
		session.gameMode = PlayerGameMode.Normal
		session.isReady = 0

		//SItemClearInvalidEquipItemAck
		//SItemClearEsperChipAck

		// check if room is empty
		if(room.players.length === 0) {
			session.roomId = null
			return this.remove(room)
		}

		// check if the master left
		if (room.master.playerId === session.playerId) {
			// The oldest player will get master
			this.changeMaster(session, room.players[0].playerId, false)
		}

		session.roomId = null

		if(!ConfigManager.testMode) {
			if(room.state !== GameRuleState.Playing) {
				return
			}

			if(room.state === GameRuleState.Playing && ((this.countPlayersInTeam(room, Team.Alpha) === 0 || this.countPlayersInTeam(room, Team.Beta) === 0) || (this.countInTeamPlaying(room, Team.Alpha) === 0 || this.countInTeamPlaying(room, Team.Beta) === 0))) {
				this.beginResult(room)
			}
		}
	},
	remove: function(room) {
		log.debug('Removing Room #' + room.id)

		this.data.removeRoom(room)

		this.data.broadcastToChannel(room.channelId, GameOPCode.SRoomDisposeAck, SRoomDisposeAck.serialize(room.id))
		log.debug('Packet Sent [SRoomDisposeAck]')
	},
	changeTeam: function(session, team) {
		// TODO: validate team

		session.team = team

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomChangeTeamAck, SRoomChangeTeamAck.serialize(session.playerId, team))
		log.debug('Packet Sent [SRoomChangeTeamAck]')
	},
	mix: function(session) {
		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// Also shuffle joining people?

		var teamMaxPlayers = room.playerLimit / 2

		var teamValues = []
		for (var i = 0; i < teamMaxPlayers; i++) {
			teamValues.push(Team.Alpha)
			teamValues.push(Team.Beta)
		}

		shuffle(teamValues)

		for (var i = 0; i < room.players.length; i++) {
			room.players[i].team = teamValues[i]
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomMixedTeamBriefingInfoAck, SRoomMixedTeamBriefingInfoAck.serialize(room.players))
		log.debug('Packet Sent [SRoomMixedTeamBriefingInfoAck]')
	},
	changePlayMode: function(session, mode) {
		// TODO: Validate mode with PlayerGameMode

		session.gameMode = mode

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomPlayModeChangeAck, SRoomPlayModeChangeAck.serialize(session.playerId, mode))
		log.debug('Packet Sent [SRoomPlayModeChangeAck]')
	},
	loadingSuccess: function(session) {
		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		if(room.state === GameRuleState.Playing) {
			var timePassed = new Date().getTime() - room.startTime
			this.server.send(session, GameOPCode.SGameRefreshGameRuleInfoAck, SGameRefreshGameRuleInfoAck.serialize(room.state, room.subState, timePassed))
			log.debug('Packet Sent [SGameRefreshGameRuleInfoAck]')

			this.server.send(session, GameOPCode.SRoomGameStartAck, SRoomGameStartAck.serialize())
			log.debug('Packet Sent [SRoomGameStartAck]')
			return
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomGameEndLoadingAck, SRoomGameEndLoadingAck.serialize(session.playerId))
		log.debug('Packet Sent [SRoomGameEndLoadingAck]')

		//this.server.send(session, GameOPCode.SRoomGamePlayCountDownAck, SRoomGamePlayCountDownAck.serialize())
		//log.debug('Packet Sent [SRoomGamePlayCountDownAck]')

		//setTimeout(function() {
			room.startTime = new Date().getTime()
			room.roundStartTime = new Date().getTime()
			room.TDWaiting = false

			this.changeState(room, GameRuleState.Playing)

			var subState
			var time
			if(room.rule == GameRule.Practice || room.rule == GameRule.BattleRoyal) {
				subState = GameRuleSubState.None//Practice
			} else {
				subState = GameRuleSubState.FirstHalf
			}
			this.changeSubState(room, subState)

			this.server.send(session, GameOPCode.SGameRefreshGameRuleInfoAck, SGameRefreshGameRuleInfoAck.serialize(room.state, room.subState, 0))
			log.debug('Packet Sent [SGameRefreshGameRuleInfoAck]')

			this.server.send(session, GameOPCode.SRoomGameStartAck, SRoomGameStartAck.serialize())
			log.debug('Packet Sent [SRoomGameStartAck]')

			//if(room.rule === GameRule.BattleRoyal) {
			//if(room.rule === GameRule.Practice) {
				var count = 10//session.gunModeKillCount + 1
				//this.server.send(session, GameOPCode.SInGameItemDropAck, SInGameItemDropAck.serialize(count, 2010007))

				//this.server.send(session, GameOPCode.SInGameItemGetAck, SInGameItemGetAck.serialize(session.playerId, count))
			//}
		//}.bind(this), 4000)
	},
	changeMaster: function(session, playerId, showWindow) {
		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// Check if session is room master
		if(room.master.playerId !== session.playerId) {
			log.error('Kick Hack detected')
			return
		}

		// Check if the player is already master
		if(room.master.playerId === playerId) {
			return
		}

		var player = this.data.getPlayerByID(playerId)

		if(!player) {
			return
		}

		if(session.channelId !== player.channelId || session.roomId !== player.roomId) {
			return
		}

		room.master = player

		if(showWindow) {
			this.server.send(player, GameOPCode.SRoomChangeMasterRequestAck, SRoomChangeMasterRequestAck.serialize())
			log.debug('Packet Sent [SRoomChangeMasterRequestAck]')
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomChangeMasterAck, SRoomChangeMasterAck.serialize(room.master.playerId))
		log.debug('Packet Sent [SRoomChangeMasterAck]')

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomChangeRefereeAck, SRoomChangeRefereeAck.serialize(room.master.playerId))
		log.debug('Packet Sent [SRoomChangeRefereeAck]')
	},
	beginRound: function(session) {
		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// Check if session is room master
		if(room.master.playerId !== session.playerId) {
			return
		}

		// Check if at least 1 player is ready!
		if(!ConfigManager.testMode) {
			if(room.rule !== GameRule.Practice) {
				if(session.team === Team.Alpha) {
					var count = this.countReadyPlayersInTeam(room, Team.Beta)
				} else {
					var count = this.countReadyPlayersInTeam(room, Team.Alpha)
				}

				if(!count) {
					// GameEventMessage.CantStartGame = 24 = 0x18
					this.server.send(session, GameOPCode.SGameEventMessageAck, SGameEventMessageAck.serialize(new Buffer([0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])))
					return
				}
			}
		}

		for (var i = 0; i < room.players.length; ++i) {
			var player = room.players[i]
			if(player.isReady || player.playerId === room.master.playerId) { // only room master and ready players
				player.state = player.gameMode == PlayerGameMode.Normal ? PlayerState.Alive : PlayerState.Spectating
				//player.score.joinTime = new Date().getTime()
				player.isReady = 0

				// TODO: Not sure...
				this.server.send(player, GameOPCode.SRoomGameLoadingAck, SRoomGameLoadingAck.serialize())
				log.debug('Packet Sent [SRoomGameLoadingAck]')

				// TODO: if rule === Scenario:
				/*
				[Proxy] DEBUG - Client <-- Server:
				[Proxy] DEBUG - Packet received: [SArcadeStageBriefingAck][3042]
				[Proxy] DEBUG -
				08 08 0a
				*/

				this.server.send(player, GameOPCode.SRoomBeginRoundAck, SRoomBeginRoundAck.serialize())
				log.debug('Packet Sent [SRoomBeginRoundAck]')
			}
		}

		//room.startTime = new Date().getTime()
		//room.roundStartTime = new Date().getTime()
		room.TDWaiting = false
		room.winTeam = Team.Neutral

		this.changeState(room, GameRuleState.Loading)
	},
	changeReady: function(session, ready) {
		session.isReady = +!!ready

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomReadyRoundAck, SRoomReadyRoundAck.serialize(session.playerId, ready))
		log.debug('Packet Sent [SRoomReadyRoundAck]')
	},
	intrude: function(session) {
		session.state = session.gameMode == PlayerGameMode.Normal ? PlayerState.Alive : PlayerState.Spectating
		//session.score.joinTime = new Date().getTime()

		this.server.send(session, GameOPCode.SRoomGameLoadingAck, SRoomGameLoadingAck.serialize())
		log.debug('Packet Sent [SRoomGameLoadingAck]')
	},
	changeRule: function(session, room) {
		if(room.rule === GameRule.Random && room.random === GameRandom.RuleAndMap) {
			// TODO: Generate random rule with map

			room.rule = 2
			room.map = 67
			room.timeLimit = 1200000
			room.scoreLimit = 8
		} else if(room.random === GameRandom.Map) {
			// TODO: Generate random map to rule

			if(room.rule === GameRule.Deathmatch) {
				room.map = Map.Neden3DM
			} else if(room.rule === GameRule.Touchdown) {
				room.map = Map.Neden3TD
			} else if(room.rule === GameRule.Chaser) {
				room.map = Map.Nightmare
			} else if(room.rule === GameRule.BattleRoyal) {
				room.map = Map.Neoniac
			} else if(room.rule === GameRule.Captain) {
				room.map = Map.NightmareCP
			} else if(room.rule === GameRule.Siege) {
				room.map = Map.Skyline
			} else if(room.rule === GameRule.Warfare) {
				room.map = Map.HoliDay
			} else if(room.rule === GameRule.Arena) {
				room.map = Map.NeoArena
			}
		}

		if(room.rule === GameRule.Training) {
			this.server.send(session, GameOPCode.SChallengeRankersAck, SChallengeRankersAck.serialize(room))
			log.debug('Packet Sent [SChallengeRankersAck]')
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomChangeRoomInfoAck2, SRoomChangeRoomInfoAck2.serialize(room))
		log.debug('Packet Sent [SRoomChangeRoomInfoAck2]')

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SRoomChangeRuleAck, SRoomChangeRuleAck.serialize(room))
		log.debug('Packet Sent [SRoomChangeRuleAck]')

		this.changeState(room, GameRuleState.Waiting)
	},
	setArenaGameOptions: function(session, options) {
		// TODO: Save options on room object

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SArenaSetGameOptionAck, SArenaSetGameOptionAck.serialize(options))
		log.debug('Packet Sent [SArenaSetGameOptionAck]')
	},
	changeState: function(room, state) {
		room.state = state

		this.data.broadcastToRoom(room.channelId, room.id, GameOPCode.SGameChangeStateAck, SGameChangeStateAck.serialize(state))
		log.debug('Packet Sent [SGameChangeStateAck]')
	},
	changeSubState: function(room, subState) {
		room.subState = subState

		if(subState !== GameRuleSubState.HalfTime && subState !== GameRuleSubState.SecondHalf) {
			return
		}

		this.data.broadcastToRoom(room.channelId, room.id, GameOPCode.SGameChangeSubStateAck, SGameChangeSubStateAck.serialize(subState))
		log.debug('Packet Sent [SGameChangeSubStateAck]')
	},
	onTick: function(room) {
		// Exclude Training
		if(room.rule === GameRule.Training) {
			return
		}

		// Exclude Conquest
		if(room.rule === GameRule.Conquest) {
			return
		}

		// Time Check
		if(room.rule == GameRule.Practice || room.rule == GameRule.BattleRoyal) {
			var roundTime = room.timeLimit
		} else {
			var roundTime = room.timeLimit / 2
		}
		
		var diff = new Date().getTime() - room.roundStartTime

		if(diff >= roundTime) {
			if(room.rule === GameRule.Practice) {
				return this.beginResult(room)
			}

			if(room.subState === GameRuleSubState.FirstHalf) {
				return this.beginHalftime(room)
			} else if(room.subState === GameRuleSubState.SecondHalf) {
				return this.beginResult(room)
			}
		}

		// Score Check
		var halfTimeScoreLimit = room.scoreLimit / 2
		if((room.scoreAlpha >= halfTimeScoreLimit || room.scoreBeta >= halfTimeScoreLimit) && room.subState === GameRuleSubState.FirstHalf) {
			return this.beginHalftime(room)
		}

		if((room.scoreAlpha >= room.scoreLimit || room.scoreBeta >= room.scoreLimit) && room.subState === GameRuleSubState.SecondHalf) {
			return this.beginResult(room)
		}

		if(room.rule == GameRule.BattleRoyal) {
			for (var i = 0; i < room.players.length; ++i) {
				var player = room.players[i]
				if(player.gunModeKillCount == (ConfigManager.gunModeWeapons.length + 1)) {
					return this.beginResult(room)
				}
			}
		}
	},
	beginHalftime: function(room) {
		room.subState = GameRuleSubState.HalfTime // Disable checker

		this.data.broadcastToRoom(room.channelId, room.id, GameOPCode.SGameEventMessageAck, SGameEventMessageAck.serialize(new Buffer([0x12, 0x02, 0x00, 0x00, 0x00, 0x10, 0x27, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00])))
		log.debug('Packet Sent [SGameEventMessageAck]')

		// change to half time
		setTimeout(function() {
			this.changeSubState(room, GameRuleSubState.HalfTime)
		}.bind(this), 10000)

		// change to second half
		setTimeout(function() {
			this.changeSubState(room, GameRuleSubState.SecondHalf)
			room.roundStartTime = new Date().getTime()
		}.bind(this), 35000) // 25 seconds half time + 10 seconds counter
	},
	beginResult: function(room) {
		room.state = GameRuleSubState.Result // Disable checker

		room.beforeResult = true

		this.data.broadcastToRoom(room.channelId, room.id, GameOPCode.SGameEventMessageAck, SGameEventMessageAck.serialize(new Buffer([0x11, 0x03, 0x00, 0x00, 0x00, 0x10, 0x27, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00])))
		log.debug('Packet Sent [SGameEventMessageAck]')

		this.calculateWinTeam(room)

		// change to result
		setTimeout(function() {
			this.changeState(room, GameRuleState.Result)

			//SItemClearInvalidEquipItemAck
			//SItemClearEsperChipAck

			this.data.broadcastToRoom(room.channelId, room.id, GameOPCode.SGameBriefingInfoAck, SGameBriefingInfoAck.serialize(room, true))
			log.debug('Packet Sent [SGameBriefingInfoAck]')
		}.bind(this), 10000)

		setTimeout(function() {
			room.scoreAlpha = 0
			room.scoreBeta = 0
			room.lastAlphaFumbiID = 0
			room.lastBetaFumbiID = 0

			for (var i = 0; i < room.players.length; ++i) {
				var player = room.players[i]
				player.state = PlayerState.Lobby
				this.resetStats(player)
			}

			room.beforeResult = false

			this.changeState(room, GameRuleState.Waiting)

			this.data.broadcastToRoom(room.channelId, room.id, GameOPCode.SGameBriefingInfoAck, SGameBriefingInfoAck.serialize(room))
			log.debug('Packet Sent [SGameBriefingInfoAck]')
		}.bind(this), 25000) // 10 seconds counter + 15 seconds result screen
	},
	calculateWinTeam: function(room) {
		var winTeam = Team.Alpha

		if(room.rule === GameRule.Practice) {
			return room.winTeam = winTeam
		}

		if(this.countPlayersInTeam(room, Team.Alpha) === 0) {
			return room.winTeam = Team.Beta
		} else if(this.countPlayersInTeam(room, Team.Beta) === 0) {
			return room.winTeam = Team.Alpha
		}

		if(room.scoreAlpha === room.scoreBeta) {
			var scoreA = 0
			var scoreB = 0

			for (var i = 0; i < room.players.length; ++i) {
				var player = room.players[i]
				if(player.state == PlayerState.Alive) {
					switch(player.team) {
						case Team.Alpha:
							switch(room.mode) {
								case GameRule.Touchdown:
									scoreA += player.score.totalPoints
									break
								case GameRule.Deathmatch:
									scoreA += player.score.totalPoints
									break
							}
						break
						case Team.Beta:
							switch(room.mode) {
								case GameRule.Touchdown:
									scoreB += player.score.totalPoints
									break
								case GameRule.Deathmatch:
									scoreB += player.score.totalPoints
									break
							}
						break
				}
			}
		}

		if(scoreA > scoreB) {
			winTeam = Team.Alpha
		} else if(scoreB > scoreA) {
			winTeam = Team.Beta
		}


		} else if(room.scoreAlpha > room.scoreBeta) {
			winTeam = Team.Alpha
		} else if(room.scoreBeta > room.scoreAlpha) {
			winTeam = Team.Beta
		}

		room.winTeam = winTeam
	},
	createRoomId: function(channelId) {
		var id = 1

		while(true) {
			var room = this.data.getRoomByIDAndChannelID(id, channelId)

			if(!room) {
				return id
			}

			id++
		}
	},
	countInTeamPlaying: function(room, team) {
		var count = 0

		for (var i = 0; i < room.players.length; ++i) {
			var player = room.players[i]

			// Check Team
			if(player.team !== team) {
				continue
			}

			// Check if is playing
			if(player.state !== PlayerState.Alive) {
				continue
			}

			count++
		}

		return count
	},
	countReadyPlayersInTeam: function(room, team) {
		var count = 0

		for (var i = 0; i < room.players.length; ++i) {
			var player = room.players[i]

			// Check Team
			if(player.team !== team) {
				continue
			}

			// Check isReady
			if(!player.isReady) {
				continue
			}

			count++
		}

		return count
	},
	countPlayersInTeam: function(room, team, gameMode) {
		var count = 0

		for (var i = 0; i < room.players.length; ++i) {
			var player = room.players[i]

			// Check Team
			if(player.team !== team) {
				continue
			}

			// Check GameMode
			if(gameMode) {
				if(player.gameMode !== gameMode) {
					continue
				}
			}

			count++
		}

		return count
	},
	generateUniqueSlot: function(room) {
		var slot = 0

		while(true) {
			var player = this.getPlayerByRoomAndSlotID(room, slot)

			if(!player) {
				return slot
			}

			slot++
		}
	},
	getPlayerByRoomAndSlotID: function(room, slot) {
		for (var i = 0; i < room.players.length; ++i) {
			var player = room.players[i]
			if(player.slot === slot) {
				return player
			}
		}

		return null
	},
	resetStats: function(player) {
		player.gunModeKillCount = 1
		// Overall
		player.score = {
			totalPoints: 0,
			joinTime: 0 // TODO
		}
		// TD
		player.td = {
			TDScore: 0,
			TDAssist: 0,
			killPoints: 0,
			killAssistPoints: 0,
			defensePoints: 0,
			defenseAssistPoints: 0,
			offensePoints: 0,
			offenseAssistPoints: 0,
			healPoints: 0,
			deaths: 0,
			fumbi: 0
		}
		// DM
		player.dm = {
			killPoints: 0,
			killAssistPoints: 0,
			healPoints: 0,
			deaths: 0
		}
		// Survival
		player.survival = {
			killPoints: 0
		}
	}
}

function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i -= 1) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

module.exports = RoomManager