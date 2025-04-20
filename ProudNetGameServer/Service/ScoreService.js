var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var GameRule = require('../../Core/S4League/Game/Constants/GameRule')
var GameRuleState = require('../../Core/S4League/Game/Constants/GameRuleState')
var GameRuleSubState = require('../../Core/S4League/Game/Constants/GameRuleSubState')
var Team = require('../../Core/S4League/Game/Constants/Team')

// C2S
var CScoreKillReq = require('../../Core/S4League/Game/C2S/CScoreKillReq')
var CScoreKillAssistReq = require('../../Core/S4League/Game/C2S/CScoreKillAssistReq')
var CScoreOffenseReq = require('../../Core/S4League/Game/C2S/CScoreOffenseReq')
var CScoreOffenseAssistReq = require('../../Core/S4League/Game/C2S/CScoreOffenseAssistReq')
var CScoreDefenseReq = require('../../Core/S4League/Game/C2S/CScoreDefenseReq')
var CScoreDefenseAssistReq = require('../../Core/S4League/Game/C2S/CScoreDefenseAssistReq')
var CScoreHealAssistReq = require('../../Core/S4League/Game/C2S/CScoreHealAssistReq')
var CScoreGoalReq = require('../../Core/S4League/Game/C2S/CScoreGoalReq')
var CScoreReboundReq = require('../../Core/S4League/Game/C2S/CScoreReboundReq')
var CScoreSuicideReq = require('../../Core/S4League/Game/C2S/CScoreSuicideReq')
var CScoreTeamKillReq = require('../../Core/S4League/Game/C2S/CScoreTeamKillReq')

// S2C
var SScoreKillAck = require('../../Core/S4League/Game/S2C/SScoreKillAck')
var SScoreKillAssistAck = require('../../Core/S4League/Game/S2C/SScoreKillAssistAck')
var SScoreOffenseAck = require('../../Core/S4League/Game/S2C/SScoreOffenseAck')
var SScoreOffenseAssistAck = require('../../Core/S4League/Game/S2C/SScoreOffenseAssistAck')
var SScoreDefenseAck = require('../../Core/S4League/Game/S2C/SScoreDefenseAck')
var SScoreDefenseAssistAck = require('../../Core/S4League/Game/S2C/SScoreDefenseAssistAck')
var SScoreHealAssistAck = require('../../Core/S4League/Game/S2C/SScoreHealAssistAck')
var SScoreGoalAck = require('../../Core/S4League/Game/S2C/SScoreGoalAck')
var SScoreGoalAssistAck = require('../../Core/S4League/Game/S2C/SScoreGoalAssistAck')
var SScoreReboundAck = require('../../Core/S4League/Game/S2C/SScoreReboundAck')
var SScoreSuicideAck = require('../../Core/S4League/Game/S2C/SScoreSuicideAck')
var SScoreTeamKillAck = require('../../Core/S4League/Game/S2C/SScoreTeamKillAck')
var SGameEventMessageAck = require('../../Core/S4League/Game/S2C/SGameEventMessageAck')
var SInGameItemDropAck = require('../../Core/S4League/Game/S2C/SInGameItemDropAck')
var SInGameItemGetAck = require('../../Core/S4League/Game/S2C/SInGameItemGetAck')

var ConfigManager = require('../Manager/ConfigManager')

var log = new Logger('ScoreService', true)

var ScoreService = function(server, data) {
	this.server = server
	this.data = data
}

ScoreService.prototype = {
	handleCScoreKillReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreKillReq]')
		var packet = CScoreKillReq.deserialize(packet)

		log.debug('Murder Account ID: ' + packet.murderPlayerId)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Murder Peer ID: ' + packet.murderPeerId.getValue() + ' [' + packet.murderPeerId.toString() + ']')
		log.debug('Weapon ID: ' + packet.weaponId)
		log.debug('Victim Account ID: ' + packet.victimPlayerId)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Victim Peer ID: ' + packet.victimPeerId.getValue() + ' [' + packet.victimPeerId.toString() + ']')
		log.debug('Unk3: ' + packet.unk3)

		var murder = this.data.getPlayerByID(packet.murderPlayerId)

		if(!murder) {
			return
		}

		// check if murder is with the session in the same room
		if(session.roomId !== murder.roomId || session.channelId !== murder.channelId) {
			return
		}

		var victim = this.data.getPlayerByID(packet.victimPlayerId)

		if(!victim) {
			return
		}

		// check if victim is the session (sender)
		if(victim.playerId !== session.playerId) {
			return
		}

		// check if murder and victim are in the same room
		if(murder.roomId !== victim.roomId || murder.roomId !== victim.roomId) {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		// check if murder and victim are not in the same team
		if(room.rule != GameRule.BattleRoyal) {
			if(murder.team === victim.team) {
				return
			}
		}

		switch (room.rule) {
            case GameRule.Touchdown:
				murder.score.totalPoints += 2
				murder.td.killPoints++
				break
			case GameRule.Deathmatch:
            	murder.score.totalPoints += 2
                murder.dm.killPoints++

				victim.dm.deaths++

                if(murder.team == Team.Alpha) {
                	room.scoreAlpha++
                } else {
                	room.scoreBeta++
				}
				break
			case GameRule.BattleRoyal:
            	murder.score.totalPoints += 2
                break
			default:
				return
				break
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreKillAck, SScoreKillAck.serialize(packet.murderPlayerId, packet.unk1, packet.murderPeerId, packet.weaponId, packet.victimPlayerId, packet.unk2, packet.victimPeerId, packet.unk3))
		log.debug('Packet Sent [SScoreKillAck]')

		if(room.rule === GameRule.BattleRoyal) {
		//if(room.rule === GameRule.Practice) {
			setTimeout(function() {
				if(murder.gunModeKillCount == (ConfigManager.gunModeWeapons.length + 1)) {
					return
				}

				murder.gunModeKillCount++
				var count = 10//murder.gunModeKillCount + 1
				this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemDropAck, SInGameItemDropAck.serialize(count, ConfigManager.gunModeWeapons[murder.gunModeKillCount].itemId))
				log.debug('Packet Sent [SInGameItemDropAck]')

				this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemGetAck, SInGameItemGetAck.serialize(murder.playerId, count))
				log.debug('Packet Sent [SInGameItemGetAck]')
			}.bind(this), 3000)

			setTimeout(function() {
				var count = 10
				this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemDropAck, SInGameItemDropAck.serialize(count, ConfigManager.gunModeWeapons[victim.gunModeKillCount].itemId))
				log.debug('Packet Sent [SInGameItemDropAck]')

				this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemGetAck, SInGameItemGetAck.serialize(victim.playerId, count))
				log.debug('Packet Sent [SInGameItemGetAck]')
			}.bind(this), 11000)
		}
	},
	handleCScoreKillAssistReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreKillAssistReq]')
		var packet = CScoreKillAssistReq.deserialize(packet)

		log.debug('Murder Player ID: ' + packet.murderPlayerId)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Murder Peer ID: ' + packet.murderPeerId.getValue() + ' [' + packet.murderPeerId.toString() + ']')
		log.debug('Murder Assist Player ID: ' + packet.murderAssistPlayerId)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Murder Assist Peer ID: ' + packet.murderAssistPeerId.getValue() + ' [' + packet.murderAssistPeerId.toString() + ']')
		log.debug('Weapon ID: ' + packet.weaponId)
		log.debug('Victim Player ID: ' + packet.victimPlayerId)
		log.debug('Unk 3: ' + packet.unk2)
		log.debug('Victim Peer ID: ' + packet.victimPeerId.getValue() + ' [' + packet.victimPeerId.toString() + ']')

		var murder = this.data.getPlayerByID(packet.murderPlayerId)

		if(!murder) {
			return
		}

		// check if murder is with the session in the same room
		if(session.roomId !== murder.roomId || session.channelId !== murder.channelId) {
			return
		}

		var assist = this.data.getPlayerByID(packet.murderAssistPlayerId)

		if(!assist) {
			return
		}

		// check if murder and assist are in the same room
		if(murder.roomId !== assist.roomId || murder.channelId !== assist.channelId) {
			return
		}

		var victim = this.data.getPlayerByID(packet.victimPlayerId)

		if(!victim) {
			return
		}

		// check if victim is the session (sender)
		if(victim.playerId !== session.playerId) {
			return
		}

		// check if murder and victim are in the same room
		if(murder.roomId !== victim.roomId || murder.channelId !== victim.channelId) {
			return
		}
		
		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		// check if murder and assist are in the same team
		if(room.rule != GameRule.BattleRoyal) {
			if(murder.team !== assist.team) {
				return
			}
		}

		// check if murder and victim are not in the same team
		if(room.rule != GameRule.BattleRoyal) {
			if(murder.team === victim.team) {
				return
			}
		}

		switch (room.rule) {
    		case GameRule.Touchdown:
				murder.score.totalPoints += 2
				murder.td.killPoints++

                assist.score.totalPoints += 1
                assist.td.killAssistPoints++
                break
            case GameRule.Deathmatch:
				murder.score.totalPoints += 2
                murder.dm.killPoints++

                assist.score.totalPoints += 1
				assist.dm.killAssistPoints++

                victim.dm.deaths++

                if(murder.team == Team.Alpha) {
                	room.scoreAlpha++
                } else {
                	room.scoreBeta++
				}
				break
			case GameRule.BattleRoyal:
				murder.score.totalPoints += 2
				
				assist.score.totalPoints += 1
                break
			default:
				return
				break
        }

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreKillAssistAck, SScoreKillAssistAck.serialize(packet.murderPlayerId, packet.unk1, packet.murderPeerId, packet.murderAssistPlayerId, packet.unk2, packet.murderAssistPeerId, packet.weaponId, packet.victimPlayerId, packet.unk3, packet.victimPeerId))
		log.debug('Packet Sent [SScoreKillAssistAck]')

		if(room.rule === GameRule.BattleRoyal) {
		//if(room.rule === GameRule.Practice) {
			setTimeout(function() {
				if(murder.gunModeKillCount == (ConfigManager.gunModeWeapons.length + 1)) {
					return
				}

				murder.gunModeKillCount++
				var count = 10//murder.gunModeKillCount + 1
				this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemDropAck, SInGameItemDropAck.serialize(count, ConfigManager.gunModeWeapons[murder.gunModeKillCount].itemId))
				log.debug('Packet Sent [SInGameItemDropAck]')

				this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemGetAck, SInGameItemGetAck.serialize(murder.playerId, count))
				log.debug('Packet Sent [SInGameItemGetAck]')
			}.bind(this), 3000)

			setTimeout(function() {
				var count = 10
				this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemDropAck, SInGameItemDropAck.serialize(count, ConfigManager.gunModeWeapons[victim.gunModeKillCount].itemId))
				log.debug('Packet Sent [SInGameItemDropAck]')

				this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SInGameItemGetAck, SInGameItemGetAck.serialize(victim.playerId, count))
				log.debug('Packet Sent [SInGameItemGetAck]')
			}.bind(this), 11000)
		}
	},
	handleCScoreOffenseReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreOffenseReq]')
		var packet = CScoreOffenseReq.deserialize(packet)

		log.debug('Murder Player ID: ' + packet.murderPlayerId)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Murder Peer ID: ' + packet.murderPeerId.getValue() + ' [' + packet.murderPeerId.toString() + ']')
		log.debug('Weapon ID: ' + packet.weaponId)
		log.debug('Victim Player ID: ' + packet.victimPlayerId)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Victim Peer ID: ' + packet.victimPeerId.getValue() + ' [' + packet.victimPeerId.toString() + ']')

		var murder = this.data.getPlayerByID(packet.murderPlayerId)

		if(!murder) {
			return
		}

		// check if murder is with the session in the same room
		if(session.roomId !== murder.roomId || session.channelId !== murder.channelId) {
			return
		}

		var victim = this.data.getPlayerByID(packet.victimPlayerId)

		if(!victim) {
			return
		}

		// check if victim is the session (sender)
		if(victim.playerId !== session.playerId) {
			return
		}

		// check if murder and victim are in the same room
		if(murder.roomId !== victim.roomId || murder.roomId !== victim.roomId) {
			return
		}

		// check if murder and victim are not in the same team
		if(murder.team === victim.team) {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		murder.score.totalPoints += 4
		murder.td.offensePoints++

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreOffenseAck, SScoreOffenseAck.serialize(packet.murderPlayerId, packet.unk1, packet.murderPeerId, packet.weaponId, packet.victimPlayerId, packet.unk2, packet.victimPeerId))
		log.debug('Packet Sent [SScoreOffenseAck]')
	},
	handleCScoreOffenseAssistReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreOffenseAssistReq]')
		var packet = CScoreOffenseAssistReq.deserialize(packet)

		log.debug('Murder Player ID: ' + packet.murderPlayerId)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Murder Peer ID: ' + packet.murderPeerId.getValue() + ' [' + packet.murderPeerId.toString() + ']')
		log.debug('Murder Assist Player ID: ' + packet.murderAssistPlayerId)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Murder Assist Peer ID: ' + packet.murderAssistPeerId.getValue() + ' [' + packet.murderAssistPeerId.toString() + ']')
		log.debug('Weapon ID: ' + packet.weaponId)
		log.debug('Victim Player ID: ' + packet.victimPlayerId)
		log.debug('Unk 3: ' + packet.unk2)
		log.debug('Victim Peer ID: ' + packet.victimPeerId.getValue() + ' [' + packet.victimPeerId.toString() + ']')

		var murder = this.data.getPlayerByID(packet.murderPlayerId)

		if(!murder) {
			return
		}

		// check if murder is with the session in the same room
		if(session.roomId !== murder.roomId || session.channelId !== murder.channelId) {
			return
		}

		var assist = this.data.getPlayerByID(packet.murderAssistPlayerId)

		if(!assist) {
			return
		}

		// check if murder and assist are in the same room
		if(murder.roomId !== assist.roomId || murder.channelId !== assist.channelId) {
			return
		}

		// check if murder and assist are in the same team
		if(murder.team !== assist.team) {
			return
		}

		var victim = this.data.getPlayerByID(packet.victimPlayerId)

		if(!victim) {
			return
		}

		// check if victim is the session (sender)
		if(victim.playerId !== session.playerId) {
			return
		}

		// check if murder and victim are in the same room
		if(murder.roomId !== victim.roomId || murder.channelId !== victim.channelId) {
			return
		}

		// check if murder and victim are not in the same team
		if(murder.team === victim.team) {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		murder.score.totalPoints += 4
		murder.td.offensePoints++

        assist.score.totalPoints += 2
		assist.td.offenseAssistPoints++

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreOffenseAssistAck, SScoreOffenseAssistAck.serialize(packet.murderPlayerId, packet.unk1, packet.murderPeerId, packet.murderAssistPlayerId, packet.unk2, packet.murderAssistPeerId, packet.weaponId, packet.victimPlayerId, packet.unk3, packet.victimPeerId))
		log.debug('Packet Sent [SScoreOffenseAssistAck]')
	},
	handleCScoreDefenseReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreDefenseReq]')
		var packet = CScoreDefenseReq.deserialize(packet)

		log.debug('Murder Player ID: ' + packet.murderPlayerId)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Murder Peer ID: ' + packet.murderPeerId.getValue() + ' [' + packet.murderPeerId.toString() + ']')
		log.debug('Weapon ID: ' + packet.weaponId)
		log.debug('Victim Player ID: ' + packet.victimPlayerId)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Victim Peer ID: ' + packet.victimPeerId.getValue() + ' [' + packet.victimPeerId.toString() + ']')

		var murder = this.data.getPlayerByID(packet.murderPlayerId)

		if(!murder) {
			return
		}

		// check if murder is with the session in the same room
		if(session.roomId !== murder.roomId || session.channelId !== murder.channelId) {
			return
		}

		var victim = this.data.getPlayerByID(packet.victimPlayerId)

		if(!victim) {
			return
		}

		// check if victim is the session (sender)
		if(victim.playerId !== session.playerId) {
			return
		}

		// check if murder and victim are in the same room
		if(murder.roomId !== victim.roomId || murder.roomId !== victim.roomId) {
			return
		}

		// check if murder and victim are not in the same team
		if(murder.team === victim.team) {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		murder.score.totalPoints += 4
		murder.td.defensePoints++

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreDefenseAck, SScoreDefenseAck.serialize(packet.murderPlayerId, packet.unk1, packet.murderPeerId, packet.weaponId, packet.victimPlayerId, packet.unk2, packet.victimPeerId))
		log.debug('Packet Sent [SScoreDefenseAck]')
	},
	handleCScoreDefenseAssistReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreDefenseAssistReq]')
		var packet = CScoreDefenseAssistReq.deserialize(packet)

		log.debug('Murder Player ID: ' + packet.murderPlayerId)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Murder Peer ID: ' + packet.murderPeerId.getValue() + ' [' + packet.murderPeerId.toString() + ']')
		log.debug('Murder Assist Player ID: ' + packet.murderAssistPlayerId)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Murder Assist Peer ID: ' + packet.murderAssistPeerId.getValue() + ' [' + packet.murderAssistPeerId.toString() + ']')
		log.debug('Weapon ID: ' + packet.weaponId)
		log.debug('Victim Player ID: ' + packet.victimPlayerId)
		log.debug('Unk 3: ' + packet.unk2)
		log.debug('Victim Peer ID: ' + packet.victimPeerId.getValue() + ' [' + packet.victimPeerId.toString() + ']')

		var murder = this.data.getPlayerByID(packet.murderPlayerId)

		if(!murder) {
			return
		}

		// check if murder is with the session in the same room
		if(session.roomId !== murder.roomId || session.channelId !== murder.channelId) {
			return
		}

		var assist = this.data.getPlayerByID(packet.murderAssistPlayerId)

		if(!assist) {
			return
		}

		// check if murder and assist are in the same room
		if(murder.roomId !== assist.roomId || murder.channelId !== assist.channelId) {
			return
		}

		// check if murder and assist are in the same team
		if(murder.team !== assist.team) {
			return
		}

		var victim = this.data.getPlayerByID(packet.victimPlayerId)

		if(!victim) {
			return
		}

		// check if victim is the session (sender)
		if(victim.playerId !== session.playerId) {
			return
		}

		// check if murder and victim are in the same room
		if(murder.roomId !== victim.roomId || murder.channelId !== victim.channelId) {
			return
		}

		// check if murder and victim are not in the same team
		if(murder.team === victim.team) {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		murder.score.totalPoints += 4
		murder.td.defensePoints++

        assist.score.totalPoints += 2
		assist.td.defenseAssistPoints++

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreDefenseAssistAck, SScoreDefenseAssistAck.serialize(packet.murderPlayerId, packet.unk1, packet.murderPeerId, packet.murderAssistPlayerId, packet.unk2, packet.murderAssistPeerId, packet.weaponId, packet.victimPlayerId, packet.unk3, packet.victimPeerId))
		log.debug('Packet Sent [SScoreDefenseAssistAck]')
	},
	handleCScoreHealAssistReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreHealAssistReq]')
		var packet = CScoreHealAssistReq.deserialize(packet)

		log.debug('Player ID: ' + packet.playerId)
		log.debug('Unk: ' + packet.unk)
		log.debug('Peer ID: ' + packet.peerId.getValue() + ' [' + packet.peerId.toString() + ']')

		var healer = this.data.getPlayerByID(packet.playerId)

		if(!healer) {
			return
		}

		// check if healer is with the session in the same room
		if(session.roomId !== healer.roomId || session.channelId !== healer.channelId) {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		switch (room.rule) {
    		case GameRule.Touchdown:
				healer.td.healPoints++
                break
            case GameRule.Deathmatch:
				healer.dm.healPoints++
                break
			default:
				return
				break
        }

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreHealAssistAck, SScoreHealAssistAck.serialize(packet.playerId, packet.unk, packet.peerId))
		log.debug('Packet Sent [SScoreHealAssistAck]')
	},
	handleCScoreGoalReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreGoalReq]')
		var packet = CScoreGoalReq.deserialize(packet)

		log.debug('Player ID: ' + packet.playerId)
		log.debug('Unk: ' + packet.unk)
		log.debug('Peer ID: ' + packet.peerId.getValue() + ' [' + packet.peerId.toString() + ']')

		var player = this.data.getPlayerByID(packet.playerId)

		if(!player) {
			return
		}

		// check if player is with the session in the same room
		if(session.roomId !== player.roomId || session.channelId !== player.channelId) {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		var allowedModes = [
			GameRule.Touchdown,
			GameRule.TouchdownPass
		]
		// check if room is TD
		if(allowedModes.indexOf(room.rule) === -1) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		room.TDWaiting = true

		// TODO: TD Assist  berücksichtigen

		player.score.totalPoints += 10
		player.td.TDScore++

		switch(player.team) {
			case Team.Alpha:
				room.scoreAlpha++
				break
			case Team.Beta:
				room.scoreBeta++
				break
			default:
				return
				break
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreGoalAck, SScoreGoalAck.serialize(player.playerId, packet.unk, packet.peerId))
		log.debug('Packet Sent [SScoreGoalAck]')

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SGameEventMessageAck, SGameEventMessageAck.serialize(new Buffer([0x10, 0xe0, 0x2e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00])))
		log.debug('Packet Sent [SGameEventMessageAck]')

		setTimeout(function() {
			room.TDWaiting = false
			if(room.subState === GameRuleSubState.HalfTime || room.state !== GameRuleState.Playing || room.beforeResult) {
				return
			}

			this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SGameEventMessageAck, SGameEventMessageAck.serialize(new Buffer([0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00])))
			log.debug('Packet Sent [SGameEventMessageAck]')
		}.bind(this), 12000)
	},
	handleCScoreReboundReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreReboundReq]')
		var packet = CScoreReboundReq.deserialize(packet)

 		log.debug('New Player ID: ' + packet.newPlayerId)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('New Player Peer ID: ' + packet.newPlayerPeerId.getValue() + ' [' + packet.newPlayerPeerId.toString() + ']')
		log.debug('Old Player ID: ' + packet.oldPlayerId)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Old Player Peer ID: ' + packet.oldPlayerPeerId.getValue() + ' [' + packet.oldPlayerPeerId.toString() + ']')

		var newPlayer = this.data.getPlayerByID(packet.newPlayerId)

		if(newPlayer) {
			// check if player is with the session in the same room
			if(session.roomId !== newPlayer.roomId || session.channelId !== newPlayer.channelId) {
				return
			}
		}

		var oldPlayer = this.data.getPlayerByID(packet.oldPlayerId)

		if(oldPlayer) {
			// check if player is with the session in the same room
			if(session.roomId !== oldPlayer.roomId || session.channelId !== oldPlayer.channelId) {
				return
			}

			// TODO: Müssen OldPlayer und NewPlayer im gleichen Team sein?
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if the user is room master
		if(session.playerId !== room.master.playerId) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		if(oldPlayer) {
			switch(oldPlayer.team) {
				case Team.Alpha:
					room.lastAlphaFumbi = new Date().getTime()
					room.lastAlphaFumbiID = oldPlayer.playerId
					break
				case Team.Beta:
					room.lastBetaFumbi = new Date().getTime()
        			room.lastBetaFumbiID = oldPlayer.playerId
					break
				default:
					return
					break
			}
		}

		if(newPlayer) {
			newPlayer.score.totalPoints += 2
			newPlayer.td.fumbi++
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreReboundAck, SScoreReboundAck.serialize(packet.newPlayerId, packet.unk1, packet.newPlayerPeerId, packet.oldPlayerId, packet.unk2, packet.oldPlayerPeerId))
		log.debug('Packet Sent [SScoreReboundAck]')
	},
	handleCScoreSuicideReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreSuicideReq]')
		var packet = CScoreSuicideReq.deserialize(packet)

		log.debug('Player ID: ' + packet.playerId)
		log.debug('Unk: ' + packet.unk)
		log.debug('Peer ID: ' + packet.peerId.getValue() + ' [' + packet.peerId.toString() + ']')
		log.debug('Weapon ID: ' + packet.weaponId)

		var player = this.data.getPlayerByID(packet.playerId)

		if(!player) {
			return
		}

		if(session.playerId !== player.playerId) {
			return
		}

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		switch (room.rule) {
    		case GameRule.Touchdown:
				player.td.deaths++
                break
            case GameRule.Deathmatch:
				player.dm.deaths++
				if(player.score.totalPoints > 0) {
					player.score.totalPoints--
				}
                break
			default:
				return
				break
        }

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreSuicideAck, SScoreSuicideAck.serialize(packet.playerId, packet.unk, packet.peerId, packet.weaponId))
		log.debug('Packet Sent [SScoreSuicideAck]')
	},
	handleCScoreTeamKillReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		if(!session.channelId) {
			return
		}

		if(!session.roomId) {
			return
		}

		log.debug('Packet Received [CScoreTeamKillReq]')
		var packet = CScoreTeamKillReq.deserialize(packet)

		log.debug('Murder Player ID: ' + packet.murderPlayerId)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Murder Peer ID: ' + packet.murderPeerId.getValue() + ' [' + packet.murderPeerId.toString() + ']')
		log.debug('Weapon ID: ' + packet.weaponId)
		log.debug('Victim Player ID: ' + packet.victimPlayerId)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Victim Peer ID: ' + packet.victimPeerId.getValue() + ' [' + packet.victimPeerId.toString() + ']')

		// TODO: Später machen

		var room = this.data.getRoomByIDAndChannelID(session.roomId, session.channelId)

		if(!room) {
			return
		}

		// check if room is not waiting or in half time
		if(room.state !== GameRuleState.Playing || room.timeState === GameRuleSubState.HalfTime) {
			return
		}

		// check if room is TDWaiting
		if(room.TDWaiting) {
			return
		}

		// check if room is beforeResult
		if(room.beforeResult) {
			return
		}

		this.data.broadcastToRoom(session.channelId, session.roomId, GameOPCode.SScoreTeamKillAck, SScoreTeamKillAck.serialize(packet.murderPlayerId, packet.unk1, packet.murderPeerId, packet.weaponId, packet.victimPlayerId, packet.unk2, packet.victimPeerId))
		log.debug('Packet Sent [SScoreTeamKillAck]')
	}
}

module.exports = ScoreService