var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var GameKickOutResult = require('../../Core/S4League/Game/Constants/GameKickOutResult')
var GameRandom = require('../../Core/S4League/Game/Constants/GameRandom')
var GameRule = require('../../Core/S4League/Game/Constants/GameRule')
var GameRuleState = require('../../Core/S4League/Game/Constants/GameRuleState')
var GameRuleSubState = require('../../Core/S4League/Game/Constants/GameRuleSubState')
var GameSettings = require('../../Core/S4League/Game/Constants/GameSettings')
var GameWeaponLimit = require('../../Core/S4League/Game/Constants/GameWeaponLimit')
var Map = require('../../Core/S4League/Game/Constants/Map')
var RoomQuickJoinResult = require('../../Core/S4League/Game/Constants/RoomQuickJoinResult')
var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')
var Team = require('../../Core/S4League/Game/Constants/Team')

var ConfigManager = require('../Manager/ConfigManager')

// C2S
var CRoomMakeReq = require('../../Core/S4League/Game/C2S/CRoomMakeReq')
var CRoomEnterReq = require('../../Core/S4League/Game/C2S/CRoomEnterReq')
var CRoomLeaveReq = require('../../Core/S4League/Game/C2S/CRoomLeaveReq')
var CRoomInfoRequestReq = require('../../Core/S4League/Game/C2S/CRoomInfoRequestReq')
var CRoomQuickJoinReq = require('../../Core/S4League/Game/C2S/CRoomQuickJoinReq')
var CRoomMakeReq2 = require('../../Core/S4League/Game/C2S/CRoomMakeReq2')
var CRoomEnterPlayerReq = require('../../Core/S4League/Game/C2S/CRoomEnterPlayerReq')
var CRoomLeaveRequestReq = require('../../Core/S4League/Game/C2S/CRoomLeaveRequestReq')
var CRoomTeamChangeReq = require('../../Core/S4League/Game/C2S/CRoomTeamChangeReq')
var CRoomAutoMixingTeamReq = require('../../Core/S4League/Game/C2S/CRoomAutoMixingTeamReq')
var CGameEventMessageReq = require('../../Core/S4League/Game/C2S/CGameEventMessageReq')
var CRoomChangeRuleNotifyReq = require('../../Core/S4League/Game/C2S/CRoomChangeRuleNotifyReq')
var CRoomPlayModeChangeReq = require('../../Core/S4League/Game/C2S/CRoomPlayModeChangeReq')
var CArcadeBeginRoundReq = require('../../Core/S4League/Game/C2S/CArcadeBeginRoundReq')
var CArcadeStageClearReq = require('../../Core/S4League/Game/C2S/CArcadeStageClearReq')
var CArcadeStageFailedReq = require('../../Core/S4League/Game/C2S/CArcadeStageFailedReq')
var CArcadeStageSelectReq = require('../../Core/S4League/Game/C2S/CArcadeStageSelectReq')
var CMoneyUseCoinReq = require('../../Core/S4League/Game/C2S/CMoneyUseCoinReq')
var CGameKickOutRequestReq = require('../../Core/S4League/Game/C2S/CGameKickOutRequestReq')
var CGameLoadingSuccessReq = require('../../Core/S4League/Game/C2S/CGameLoadingSuccessReq')
var CRoomChoiceMasterChangeReq = require('../../Core/S4League/Game/C2S/CRoomChoiceMasterChangeReq')
var CInGameItemDropReq = require('../../Core/S4League/Game/C2S/CInGameItemDropReq')
var CInGameItemGetReq = require('../../Core/S4League/Game/C2S/CInGameItemGetReq')
var CInGamePlayerResponseReq = require('../../Core/S4League/Game/C2S/CInGamePlayerResponseReq')
var CChallengeResultReq = require('../../Core/S4League/Game/C2S/CChallengeResultReq')
var CRoomBeginRoundReq2 = require('../../Core/S4League/Game/C2S/CRoomBeginRoundReq2')
var CRoomReadyRoundReq2 = require('../../Core/S4League/Game/C2S/CRoomReadyRoundReq2')
var CRoomIntrudeRoundReq2 = require('../../Core/S4League/Game/C2S/CRoomIntrudeRoundReq2')
var CRoomChangeRuleNotifyReq2 = require('../../Core/S4League/Game/C2S/CRoomChangeRuleNotifyReq2')
var CArenaSetGameOptionReq = require('../../Core/S4League/Game/C2S/CArenaSetGameOptionReq')

// S2C
var SRoomListInfoAck2 = require('../../Core/S4League/Game/S2C/SRoomListInfoAck2')
var SRoomInfoRequestAck2 = require('../../Core/S4League/Game/S2C/SRoomInfoRequestAck2')
var SGameEventMessageAck = require('../../Core/S4League/Game/S2C/SGameEventMessageAck')
var SInGamePlayerResponseOfDeathAck = require('../../Core/S4League/Game/S2C/SInGamePlayerResponseOfDeathAck')
var SMoneyUseCoinAck = require('../../Core/S4League/Game/S2C/SMoneyUseCoinAck')
var SGameKickOutStateAck = require('../../Core/S4League/Game/S2C/SGameKickOutStateAck')
var SGameKickOutRequestAck = require('../../Core/S4League/Game/S2C/SGameKickOutRequestAck')
var SInGameItemDropAck = require('../../Core/S4League/Game/S2C/SInGameItemDropAck')
var SInGameItemGetAck = require('../../Core/S4League/Game/S2C/SInGameItemGetAck')
var SRoomQuickJoinAck = require('../../Core/S4League/Game/S2C/SRoomQuickJoinAck')
var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')

var log = new Logger('RoomService', true)

var RoomService = function(server, data, roomManager) {
	this.server = server
	this.data = data
	this.manager = roomManager
}

RoomService.prototype = {
	handleCRoomMakeReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomMakeReq]')
		var packet = CRoomMakeReq.deserialize(packet)

		var room = {
			channelId: session.channelId,
			master: session,
			players: [],
			state: GameRuleState.Waiting,
			subState: GameRuleSubState.None,
			rule: packet.rule,
			map: packet.map,
			playerLimit: packet.playerLimit,
			scoreLimit: packet.scoreLimit,
			timeLimit: packet.timeLimit,
			weaponLimit: packet.weaponLimit,
			name: packet.name,
			pw: packet.pw,
			observers: 0,
			observerLimit: 0,
			unk: packet.unk1,
			random: 0,
			settings: 0,
			missionId: packet.missionId,
			unk2: packet.unk2,
			// general stuff
			startTime: 0,
			itemDropCounter: 0,
			// room score
			scoreAlpha: 0,
			scoreBeta: 0,
			// td assist shits
			lastAlphaTD: 0,
			lastAlphaFumbi: 0,
			lastAlphaFumbiID: 0,
			lastBetaTD: 0,
			lastBetaFumbi: 0,
			lastBetaFumbiID: 0
		}

		log.debug('Rule: ' + GameRule.getKeyByValue(room.rule))
		log.debug('Map: ' + Map.getKeyByValue(room.map))
		log.debug('Player Limit: ' + room.playerLimit)
		log.debug('Score Limit: ' + room.scoreLimit)
		log.debug('Time Limit: ' + room.timeLimit)
		log.debug('Weapon Limit: ' + GameWeaponLimit.getKeyByValue(room.weaponLimit))
		log.debug('Name: ' + room.name)
		log.debug('PW: ' + room.pw)
		log.debug(Packet.dump(room.unk))
		log.debug('Mission ID: ' + room.missionId)
		log.debug('Unk2: ' + room.unk2)

		this.manager.create(room, session, 1)
	},
	handleCRoomEnterReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomEnterReq]')
		var packet = CRoomEnterReq.deserialize(packet)

		log.debug('Room ID: ' + packet.roomId + ' Unk1: ' + packet.unk1 + ' Unk2: ' + packet.unk2)

		this.manager.join(session, packet.roomId)
	},
	handleCRoomLeaveReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomLeaveReq]')
		var packet = CRoomLeaveReq.deserialize(packet)

		log.debug('Reason: ' + packet.reason)

		this.manager.leave(session, session.roomId, packet.reason)
	},
	handleCRoomInfoRequestReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		log.debug('Packet Received [CRoomInfoRequestReq]')
		var packet = CRoomInfoRequestReq.deserialize(packet)

		log.debug('Room ID: ' + packet.roomId)

		var room = this.data.getRoomByIDAndChannelID(packet.roomId, session.channelId)

		if(!room) {
			return
		}

		// TODO: Move to RoomManager?
		var numAlpha = this.manager.countPlayersInTeam(room, Team.Alpha)
		var numBeta = this.manager.countPlayersInTeam(room, Team.Beta)

		this.server.send(session, GameOPCode.SRoomInfoRequestAck2, SRoomInfoRequestAck2.serialize(room, numAlpha, numBeta))
		log.debug('Packet Sent [SRoomInfoRequestAck2]')
	},
	handleCRoomQuickJoinReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		log.debug('Packet Received [CRoomQuickJoinReq]')
		var packet = CRoomQuickJoinReq.deserialize(packet)

		log.debug('Rule: ' + GameRule.getKeyByValue(packet.rule))
		log.debug('Map: ' + Map.getKeyByValue(packet.map))
		log.debug('Weapon Limit: ' + GameWeaponLimit.getKeyByValue(packet.weaponLimit))
		log.debug('Player Limit: ' + packet.playerLimit)

		// TODO: Validate!

		// Nothing found
		this.server.send(session, GameOPCode.SRoomQuickJoinAck, SRoomQuickJoinAck.serialize(RoomQuickJoinResult.NothingFound, 0))
		log.debug('Packet Sent [SRoomQuickJoinAck]')

		// TODO
		return

		var roomId = 1

		this.server.send(session, GameOPCode.SRoomQuickJoinAck, SRoomQuickJoinAck.serialize(RoomQuickJoinResult.OK, roomId))
		log.debug('Packet Sent [SRoomQuickJoinAck]')
	},
	handleCRoomMakeReq2: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomMakeReq2]')
		var packet = CRoomMakeReq2.deserialize(packet)

		var room = {
			channelId: session.channelId,
			master: session,
			players: [],
			state: GameRuleState.Waiting,
			subState: GameRuleSubState.None,
			rule: packet.rule,
			map: packet.map,
			playerLimit: packet.playerLimit,
			scoreLimit: packet.scoreLimit,
			timeLimit: packet.timeLimit,
			weaponLimit: packet.weaponLimit,
			name: packet.name,
			pw: packet.pw,
			observers: packet.observers,
			observerLimit: packet.observerLimit,
			unk: packet.unk1,
			random: packet.random,
			settings: packet.settings,
			unk2: new Buffer([0x00, 0x00, 0x00, 0x00, 0x00]),
			unk3: new Buffer([0x00]),
			// general stuff
			startTime: 0,
			itemDropCounter: 0,
			// room score
			scoreAlpha: 0,
			scoreBeta: 0,
			// td assist shits
			lastAlphaTD: 0,
			lastAlphaFumbi: 0,
			lastAlphaFumbiID: 0,
			lastBetaTD: 0,
			lastBetaFumbi: 0,
			lastBetaFumbiID: 0
		}

		log.debug('Rule: ' + GameRule.getKeyByValue(room.rule))
		log.debug('Map: ' + Map.getKeyByValue(room.map))
		log.debug('Player Limit: ' + room.playerLimit)
		log.debug('Score Limit: ' + room.scoreLimit)
		log.debug('Time Limit: ' + room.timeLimit)
		log.debug('Weapon Limit: ' + GameWeaponLimit.getKeyByValue(room.weaponLimit))
		log.debug('Name: ' + room.name)
		log.debug('PW: ' + room.pw)
		log.debug('Observers: ' + room.observers)
		log.debug('Observer Limit: ' + room.observerLimit)
		log.debug(Packet.dump(room.unk))
		log.debug('Random: ' + GameRandom.getKeyByValue(room.random))
		log.debug('Settings: ' + GameSettings.getKeyByValue(room.settings))

		this.manager.create(room, session)
	},
	handleCRoomEnterPlayerReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomEnterPlayerReq]')
		var packet = CRoomEnterPlayerReq.deserialize(packet)

		this.manager.enter(session, session.roomId)
	},
	handleCRoomLeaveRequestReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomLeaveRequestReq]')
		var packet = CRoomLeaveRequestReq.deserialize(packet)

		log.debug('Player ID: ' + packet.playerId + ' Reason: ' + packet.reason)

		// Ignore AFK Kick shits from client for preventing kick hack
		if(packet.reason !== 1) {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// Check if session is room master
		if(room.master.playerId !== session.playerId) {
			return
		}

		// Check if the room is waiting
		if(room.state !== GameRuleState.Waiting) {
			return
		}

		var player = this.data.getPlayerByID(packet.playerId)

		if(!player) {
			return
		}

		// Check if they are in the same room
		if(session.channelId !== player.channelId || session.roomId !== player.roomId) {
			return
		}

		// TODO: Check if that works!
		this.manager.leave(player, session.roomId, packet.reason)
	},
	handleCRoomTeamChangeReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomTeamChangeReq]')
		var packet = CRoomTeamChangeReq.deserialize(packet)

		log.debug('Team: ' + packet.team)

		this.manager.changeTeam(session, packet.team)
	},
	handleCRoomAutoMixingTeamReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomAutoMixingTeamReq]')
		var packet = CRoomAutoMixingTeamReq.deserialize(packet)

		this.manager.mix(session)
	},
	handleCGameEventMessageReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		//log.debug('Packet Received [CGameEventMessageReq]')
		var packet = CGameEventMessageReq.deserialize(packet)

		/*
		var event = packet.readUInt8()
		var id = packet.readUInt64LE()
		var unk1 = packet.readUInt32LE()
		var unk2 = packet.readUInt16LE()
		var strLen = packet.readUInt32LE()
		//var str = (strLen > 0) ? packet.readString(strLen) : ''
		var str = (strLen > 0) ? packet.readProudBuffer() : ''

		log.debug('Event: ' + event + ' ID: ' + id + ' Unk1: ' + unk1 + ' Unk2: ' + unk2 + ' StrLen: ' + strLen + ' Str: ' + str)
		*/

		//log.debug(Packet.dump(packet.data))

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SGameEventMessageAck, SGameEventMessageAck.serialize(packet.data/*event, id, unk1, unk2, str*/))
		//log.debug('Packet Sent [SGameEventMessageAck]')

		// TODO: Send only when needed...
		this.server.send(session, GameOPCode.SInGamePlayerResponseOfDeathAck, SInGamePlayerResponseOfDeathAck.serialize())
		//log.debug('Packet Sent [SInGamePlayerResponseOfDeathAck]')
	},
	handleCRoomChangeRuleNotifyReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomChangeRuleNotifyReq]')
		var packet = CRoomChangeRuleNotifyReq.deserialize(packet)

		log.debug('Rule: ' + GameRule.getKeyByValue(packet.rule))
		log.debug('Map: ' + Map.getKeyByValue(packet.map))
		log.debug('Player Limit: ' + packet.playerLimit)
		log.debug('Score Limit: ' + packet.scoreLimit)
		log.debug('Unk1: ' + packet.unk1)
		log.debug('Time Limit: ' + packet.timeLimit)
		log.debug('Weapon Limit: ' + GameWeaponLimit.getKeyByValue(packet.weaponLimit))
		log.debug('PW: ' + packet.pw)
		log.debug('Name: ' + packet.name)
		log.debug('Observers: ' + packet.observers)
		log.debug('Observer Limit: ' + packet.observerLimit)
		log.debug('Unk2: ' + Packet.dump(packet.unk2))
		log.debug('Mission ID: ' + packet.missionId)
		log.debug('Unk3: ' + packet.unk3)

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// Check if the player is master
		if(room.master.playerId !== session.playerId) {
			return
		}

		// TODO: Move to Room Manager
		if(packet.rule === GameRule.Practice) {
			return
		}

		if(!ConfigManager.testMode) {
			// Validate rule
			var allowedRules = [
				GameRule.Deathmatch,
				GameRule.Touchdown,
				GameRule.Practice
			]
			if(allowedRules.indexOf(packet.rule) === -1) {
				log.debug('Invalid Rule! ' + GameRule.getKeyByValue(room.rule))
				this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedToRequestTask))
				return
			}
		}

		room.rule = packet.rule
		room.map = packet.map
		room.playerLimit = packet.playerLimit
		room.scoreLimit = packet.scoreLimit
		room.unk1 = packet.unk1
		room.timeLimit = packet.timeLimit
		room.weaponLimit = packet.weaponLimit
		room.pw = packet.pw
		room.name = packet.name
		room.observers = packet.observers
		room.observerLimit = packet.observerLimit
		room.unk2 = packet.unk2
		room.missionId = packet.missionId
		room.unk3 = packet.unk3

		this.manager.changeRule(session, room)
	},
	handleCRoomPlayModeChangeReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomPlayModeChangeReq]')
		var packet = CRoomPlayModeChangeReq.deserialize(packet)

		log.debug('Mode: ' + packet.mode)

		this.manager.changePlayMode(session, packet.mode)
	},
	handleCArcadeBeginRoundReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CArcadeBeginRoundReq]')
		var packet = CArcadeBeginRoundReq.deserialize(packet)

		log.debug('Unk: ' + packet.unk + ' Stage: ' + packet.stage)

		log.debug(Packet.dump(packet.remaining))

		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedToRequestTask))
		log.debug('Packet Sent [SServerResultAck]')

		// TODO: Begin round
		//this.manager.beginRound(session)
	},
	handleCArcadeStageClearReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CArcadeStageClearReq]')
		var packet = CArcadeStageClearReq.deserialize(packet)

		// TODO

		log.debug(Packet.dump(packet.remaining))

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		this.manager.beginResult(room)
	},
	handleCArcadeStageFailedReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CArcadeStageFailedReq]')
		var packet = CArcadeStageFailedReq.deserialize(packet)

		// TODO

		log.debug(Packet.dump(packet.remaining))

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		this.manager.beginResult(room)
	},
	handleCArcadeStageSelectReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CArcadeStageSelectReq]')
		var packet = CArcadeStageSelectReq.deserialize(packet)

		log.debug('Stage: ' + packet.stage + ' Unk: ' + packet.unk)

		// TODO: Save Stage to room
	},
	handleCMoneyUseCoinReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CMoneyUseCoinReq]')
		var packet = CMoneyUseCoinReq.deserialize(packet)

		log.debug('Coin ID: ' + packet.coinId)

		return
		// TODO

		// TODO: Only instant coin is working atm

		this.server.send(session, GameOPCode.SMoneyUseCoinAck, SMoneyUseCoinAck.serialize(packet.coinId))
		log.debug('Packet Sent [SMoneyUseCoinAck]')
	},
	handleCGameKickOutRequestReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CGameKickOutRequestReq]')
		var packet = CGameKickOutRequestReq.deserialize(packet)

		log.debug('Start Player ID: ' + packet.startPlayerId + ' Kick Player ID: ' + packet.kickPlayerId + ' Reason: ' + packet.reason)

		this.server.send(session, GameOPCode.SGameKickOutRequestAck, SGameKickOutRequestAck.serialize(GameKickOutResult.PlayerNotExists))
		log.debug('Packet Sent [SGameKickOutRequestAck]')

		return
		// TODO

		this.server.send(session, GameOPCode.SGameKickOutRequestAck, SGameKickOutRequestAck.serialize(GameKickOutResult.OK))
		log.debug('Packet Sent [SGameKickOutRequestAck]')

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SGameKickOutStateAck, SGameKickOutStateAck.serialize(1, 0, 4, packet.reason, packet.startPlayerId, packet.kickPlayerId))
		log.debug('Packet Sent [SGameKickOutStateAck]')
	},
	handleCGameKickOutVoteResultReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CGameKickOutVoteResultReq]')
		//var packet = CGameKickOutVoteResultReq.deserialize(packet)

		// TODO
	},
	handleCGameLoadingSuccessReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CGameLoadingSuccessReq]')
		var packet = CGameLoadingSuccessReq.deserialize(packet)

		this.manager.loadingSuccess(session)
	},
	handleCRoomChoiceMasterChangeReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomChoiceMasterChangeReq]')
		var packet = CRoomChoiceMasterChangeReq.deserialize(packet)

		log.debug('Player ID: ' + packet.playerId)

		this.manager.changeMaster(session, packet.playerId, true)
	},
	handleCInGameItemDropReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CInGameItemDropReq]')
		var packet = CInGameItemDropReq.deserialize(packet)

		log.debug('Unk1: ' + packet.unk1 + ' Unk2: ' + packet.unk2 + ' Unk3: ' + packet.unk3 + ' Unk4: ' + packet.unk4 + ' Unk5: ' + packet.unk5 + ' Unk6: ' + packet.unk6 + ' Unk7: ' + packet.unk7 + ' Unk8: ' + packet.unk8 + ' Unk9: ' + packet.unk9)

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemDropAck, SInGameItemDropAck.serialize(room.itemDropCounter, packet.unk1, packet.unk2, packet.unk3, packet.unk4, packet.unk6, packet.unk8))
		log.debug('Packet Sent [SInGameItemDropAck]')

		room.itemDropCounter++
	},
	handleCInGameItemGetReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CInGameItemGetReq]')
		var packet = CInGameItemGetReq.deserialize(packet)

		log.debug('Item Drop ID: ' + packet.itemDropId)

		log.debug(Packet.dump(packet.remaining))

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemGetAck, SInGameItemGetAck.serialize(session.playerId, packet.itemDropId))
		log.debug('Packet Sent [SInGameItemGetAck]')
	},
	handleCInGamePlayerResponseReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		//log.debug('Packet Received [CInGamePlayerResponseReq]')
		var packet = CInGamePlayerResponseReq.deserialize(packet)

		//log.debug(Packet.dump(packet.remaining))

		// TODO
	},
	handleCChallengeResultReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CChallengeResultReq]')
		var packet = CChallengeResultReq.deserialize(packet)

		log.debug(Packet.dump(packet.remaining))

		// TODO
	},
	handleCRoomReadyRoundReq2: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomReadyRoundReq2]')
		var packet = CRoomReadyRoundReq2.deserialize(packet)

		log.debug('Ready: ' + packet.ready)

		// TODO: Validate the packet

		this.manager.changeReady(session, packet.ready)
	},
	handleCRoomBeginRoundReq2: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomBeginRoundReq2]')
		var packet = CRoomBeginRoundReq2.deserialize(packet)

		// TODO: Validate the packet

		this.manager.beginRound(session)
	},
	handleCGameAvatarChangeReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CGameAvatarChangeReq]')
		//var packet = CGameAvatarChangeReq.deserialize(packet)

		// TODO
	},
	handleCRoomIntrudeRoundReq2: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomIntrudeRoundReq2]')
		var packet = CRoomIntrudeRoundReq2.deserialize(packet)

		log.debug(Packet.dump(packet.remaining))

		this.manager.intrude(session)
	},
	handleCRoomChangeRuleNotifyReq2: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CRoomChangeRuleNotifyReq2]')
		var packet = CRoomChangeRuleNotifyReq2.deserialize(packet)

		log.debug('Rule: ' + GameRule.getKeyByValue(packet.rule))
		log.debug('Map: ' + Map.getKeyByValue(packet.map))
		log.debug('Player Limit: ' + packet.playerLimit)
		log.debug('Score Limit: ' + packet.scoreLimit)
		log.debug('Unk1: ' + packet.unk1)
		log.debug('Time Limit: ' + packet.timeLimit)
		log.debug('Weapon Limit: ' + GameWeaponLimit.getKeyByValue(packet.weaponLimit))
		log.debug('PW: ' + packet.pw)
		log.debug('Name: ' + packet.name)
		log.debug('Observers: ' + packet.observers)
		log.debug('Observer Limit: ' + packet.observerLimit)
		log.debug('Unk2: ' + Packet.dump(packet.unk2))
		log.debug('Random: ' + GameRandom.getKeyByValue(packet.random))
		log.debug('Settings: ' + GameSettings.getKeyByValue(packet.settings))

		log.debug(Packet.dump(packet.remaining))

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// Check if the player is master
		if(room.master.playerId !== session.playerId) {
			return
		}

		// TODO: Move to Room Manager
		if(packet.rule === GameRule.Practice) {
			return
		}

		if(!ConfigManager.testMode) {
			// Validate rule
			var allowedRules = [
				GameRule.Deathmatch,
				GameRule.Touchdown,
				GameRule.Practice
			]
			if(allowedRules.indexOf(packet.rule) === -1) {
				log.debug('Invalid Rule! ' + GameRule.getKeyByValue(room.rule))
				this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedToRequestTask))
				return
			}
		}

		room.rule = packet.rule
		room.map = packet.map
		room.playerLimit = packet.playerLimit
		room.scoreLimit = packet.scoreLimit
		room.timeLimit = packet.timeLimit
		room.weaponLimit = packet.weaponLimit
		room.pw = packet.pw
		room.name = packet.name
		room.observers = packet.observers
		room.observerLimit = packet.observerLimit
		room.random = packet.random
		room.settings = packet.settings

		this.manager.changeRule(session, room)
	},
	handleCArenaSetGameOptionReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CArenaSetGameOptionReq]')
		var packet = CArenaSetGameOptionReq.deserialize(packet)

		log.debug('Options: ' + packet.options)

		this.manager.setArenaGameOptions(session, packet.options)
	},
	sendRoomList: function(session) {
		if(!session.channelId) {
			return
		}

		var rooms = this.data.getRoomsByChannelID(session.channelId)
		this.server.send(session, GameOPCode.SRoomListInfoAck2, SRoomListInfoAck2.serialize(rooms))
		log.debug('Packet Sent [SRoomListInfoAck2]')
	}
}

module.exports = RoomService