var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')

// C2S
var CDailyMissionInitReq = require('../../Core/S4League/Game/C2S/CDailyMissionInitReq')
var CAchieveMissionReq = require('../../Core/S4League/Game/C2S/CAchieveMissionReq')
var CScoreMissionScoreReq = require('../../Core/S4League/Game/C2S/CScoreMissionScoreReq')

// S2C
var SDailyMissionNotice = require('../../Core/S4League/Game/S2C/SDailyMissionNotice')
var SAchieveMissionAck = require('../../Core/S4League/Game/S2C/SAchieveMissionAck')
var SScoreMissionScoreAck = require('../../Core/S4League/Game/S2C/SScoreMissionScoreAck')
var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')

var log = new Logger('MissionService', true)

var MissionService = function(server) {
	this.server = server
}

MissionService.prototype = {
	handleCDailyMissionInitReq: function(session, packet) {
		log.debug('Packet Received [CDailyMissionInitReq]')
		var packet = CDailyMissionInitReq.deserialize(packet)

		log.debug('Unk: ' + packet.unk)

		this.server.send(session, GameOPCode.SDailyMissionNotice, SDailyMissionNotice.serialize(true))
		log.debug('Packet Sent [SDailyMissionNotice]')
	},
	handleCAchieveMissionReq: function(session, packet) {
		log.debug('Packet Received [CAchieveMissionReq]')
		var packet = CAchieveMissionReq.deserialize(packet)

		this.server.send(session, GameOPCode.SAchieveMissionAck, SAchieveMissionAck.serialize())
		log.debug('Packet Sent [SAchieveMissionAck]')
	},
	handleCAchieveMissionRewardReq: function(session, packet) {
		log.debug('Packet Received [CAchieveMissionRewardReq]')
		//var packet = CAchieveMissionRewardReq.deserialize(packet)

		// TODO

		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedToRequestTask))
		log.debug('Packet Sent [SServerResultAck]')
	},
	handleCScoreMissionScoreReq: function(session, packet) {
		log.debug('Packet Received [CScoreMissionScoreReq]')
		var packet = CScoreMissionScoreReq.deserialize(packet)

		log.debug('Unk: ' + packet.unk)

		this.server.send(session, GameOPCode.SScoreMissionScoreAck, SScoreMissionScoreAck.serialize(session.playerId, packet.unk))
		log.debug('Packet Sent [SScoreMissionScoreAck]')
	}
}

module.exports = MissionService