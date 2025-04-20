var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ClubAdminBoardModifyResult = require('../../Core/S4League/Game/Constants/ClubAdminBoardModifyResult')
var ClubAdminGradeChangeResult = require('../../Core/S4League/Game/Constants/ClubAdminGradeChangeResult')
var ClubAdminInfoModifyResult = require('../../Core/S4League/Game/Constants/ClubAdminInfoModifyResult')
var ClubAdminInviteResult = require('../../Core/S4League/Game/Constants/ClubAdminInviteResult')
var ClubAdminJoinCommandResult = require('../../Core/S4League/Game/Constants/ClubAdminJoinCommandResult')
var ClubAdminJoinConditionModifyResult = require('../../Core/S4League/Game/Constants/ClubAdminJoinConditionModifyResult')
var ClubAdminMasterChangeResult = require('../../Core/S4League/Game/Constants/ClubAdminMasterChangeResult')
var ClubAdminNoticeChangeResult = require('../../Core/S4League/Game/Constants/ClubAdminNoticeChangeResult')
var ClubAdminSubMasterResult = require('../../Core/S4League/Game/Constants/ClubAdminSubMasterResult')
var ClubBoardDeleteAllResult = require('../../Core/S4League/Game/Constants/ClubBoardDeleteAllResult')
var ClubBoardDeleteResult = require('../../Core/S4League/Game/Constants/ClubBoardDeleteResult')
var ClubBoardModifyResult = require('../../Core/S4League/Game/Constants/ClubBoardModifyResult')
var ClubBoardWriteResult = require('../../Core/S4League/Game/Constants/ClubBoardWriteResult')
var ClubCloseResult = require('../../Core/S4League/Game/Constants/ClubCloseResult')
var ClubCreateResult = require('../../Core/S4League/Game/Constants/ClubCreateResult')
var ClubNameCheckResult = require('../../Core/S4League/Game/Constants/ClubNameCheckResult')
var ClubRestoreResult = require('../../Core/S4League/Game/Constants/ClubRestoreResult')
var ClubUnjoinResult = require('../../Core/S4League/Game/Constants/ClubUnjoinResult')

// C2S
var CClubCreateReq = require('../../Core/S4League/Game/C2S/CClubCreateReq')
var CClubCloseReq = require('../../Core/S4League/Game/C2S/CClubCloseReq')
var CClubUnjoinReq = require('../../Core/S4League/Game/C2S/CClubUnjoinReq')
var CClubNameCheckReq = require('../../Core/S4League/Game/C2S/CClubNameCheckReq')
var CClubRestoreReq = require('../../Core/S4League/Game/C2S/CClubRestoreReq')
var CClubAdminInviteReq = require('../../Core/S4League/Game/C2S/CClubAdminInviteReq')
var CClubAdminJoinCommandReq = require('../../Core/S4League/Game/C2S/CClubAdminJoinCommandReq')
var CClubAdminGradeChangeReq = require('../../Core/S4League/Game/C2S/CClubAdminGradeChangeReq')
var CClubAdminNoticeChangeReq = require('../../Core/S4League/Game/C2S/CClubAdminNoticeChangeReq')
var CClubAdminInfoModifyReq = require('../../Core/S4League/Game/C2S/CClubAdminInfoModifyReq')
var CClubAdminSubMasterReq = require('../../Core/S4League/Game/C2S/CClubAdminSubMasterReq')
var CClubAdminMasterChangeReq = require('../../Core/S4League/Game/C2S/CClubAdminMasterChangeReq')
var CClubAdminJoinConditionModifyReq = require('../../Core/S4League/Game/C2S/CClubAdminJoinConditionModifyReq')
var CClubAdminBoardModifyReq = require('../../Core/S4League/Game/C2S/CClubAdminBoardModifyReq')
var CClubSearchReq = require('../../Core/S4League/Game/C2S/CClubSearchReq')
var CClubInfoReq = require('../../Core/S4League/Game/C2S/CClubInfoReq')
var CClubJoinWaiterInfoReq = require('../../Core/S4League/Game/C2S/CClubJoinWaiterInfoReq')
var CClubNewJoinMemberInfoReq = require('../../Core/S4League/Game/C2S/CClubNewJoinMemberInfoReq')
var CClubJoinConditionInfoReq = require('../../Core/S4League/Game/C2S/CClubJoinConditionInfoReq')
var CClubUnjoinerListReq = require('../../Core/S4League/Game/C2S/CClubUnjoinerListReq')
var CClubStuffListReq = require('../../Core/S4League/Game/C2S/CClubStuffListReq')
var CClubNewsInfoReq = require('../../Core/S4League/Game/C2S/CClubNewsInfoReq')
var CClubBoardWriteReq = require('../../Core/S4League/Game/C2S/CClubBoardWriteReq')
var CClubBoardReadReq = require('../../Core/S4League/Game/C2S/CClubBoardReadReq')
var CClubBoardModifyReq = require('../../Core/S4League/Game/C2S/CClubBoardModifyReq')
var CClubBoardDeleteReq = require('../../Core/S4League/Game/C2S/CClubBoardDeleteReq')
var CClubBoardDeleteAllReq = require('../../Core/S4League/Game/C2S/CClubBoardDeleteAllReq')
var CClubBoardSearchNickReq = require('../../Core/S4League/Game/C2S/CClubBoardSearchNickReq')
var CClubBoardReadOtherClubReq = require('../../Core/S4League/Game/C2S/CClubBoardReadOtherClubReq')

// S2C
var SClubCreateAck = require('../../Core/S4League/Game/S2C/SClubCreateAck')
var SClubCloseAck = require('../../Core/S4League/Game/S2C/SClubCloseAck')
var SClubUnjoinAck = require('../../Core/S4League/Game/S2C/SClubUnjoinAck')
var SClubNameCheckAck = require('../../Core/S4League/Game/S2C/SClubNameCheckAck')
var SClubRestoreAck = require('../../Core/S4League/Game/S2C/SClubRestoreAck')
var SClubAdminInviteAck = require('../../Core/S4League/Game/S2C/SClubAdminInviteAck')
var SClubAdminJoinCommandAck = require('../../Core/S4League/Game/S2C/SClubAdminJoinCommandAck')
var SClubAdminGradeChangeAck = require('../../Core/S4League/Game/S2C/SClubAdminGradeChangeAck')
var SClubAdminNoticeChangeAck = require('../../Core/S4League/Game/S2C/SClubAdminNoticeChangeAck')
var SClubAdminInfoModifyAck = require('../../Core/S4League/Game/S2C/SClubAdminInfoModifyAck')
var SClubAdminSubMasterAck = require('../../Core/S4League/Game/S2C/SClubAdminSubMasterAck')
var SClubAdminMasterChangeAck = require('../../Core/S4League/Game/S2C/SClubAdminMasterChangeAck')
var SClubAdminJoinConditionModifyAck = require('../../Core/S4League/Game/S2C/SClubAdminJoinConditionModifyAck')
var SClubAdminBoardModifyAck = require('../../Core/S4League/Game/S2C/SClubAdminBoardModifyAck')
var SClubSearchAck = require('../../Core/S4League/Game/S2C/SClubSearchAck')
var SClubInfoAck = require('../../Core/S4League/Game/S2C/SClubInfoAck')
var SClubJoinWaiterInfoAck = require('../../Core/S4League/Game/S2C/SClubJoinWaiterInfoAck')
var SClubNewJoinMemberInfoAck = require('../../Core/S4League/Game/S2C/SClubNewJoinMemberInfoAck')
var SClubJoinConditionInfoAck = require('../../Core/S4League/Game/S2C/SClubJoinConditionInfoAck')
var SClubUnjoinerListAck = require('../../Core/S4League/Game/S2C/SClubUnjoinerListAck')
var SClubStuffListAck = require('../../Core/S4League/Game/S2C/SClubStuffListAck')
var SClubNewsInfoAck = require('../../Core/S4League/Game/S2C/SClubNewsInfoAck')
var SClubBoardReadAck = require('../../Core/S4League/Game/S2C/SClubBoardReadAck')
var SClubBoardWriteAck = require('../../Core/S4League/Game/S2C/SClubBoardWriteAck')
var SClubBoardModifyAck = require('../../Core/S4League/Game/S2C/SClubBoardModifyAck')
var SClubBoardDeleteAck = require('../../Core/S4League/Game/S2C/SClubBoardDeleteAck')
var SClubBoardDeleteAllAck = require('../../Core/S4League/Game/S2C/SClubBoardDeleteAllAck')

var log = new Logger('ClubService', true)

var ClubService = function(server) {
	this.server = server
}

ClubService.prototype = {
	/*
	handleCClubInfoReq: function(session, packet) {
		log.debug('Packet Received [CClubInfoReq]')

		log.debug(Packet.dump(packet.readRemaining()))

		// TODO
	},
	*/
	handleCClubCreateReq: function(session, packet) {
		log.debug('Packet Received [CClubCreateReq]')
		var packet = CClubCreateReq.deserialize(packet)

		log.debug('Mark ID: ' + packet.markId + ' Name: ' + packet.name + ' Description: ' + packet.description + ' Activity Area: ' + packet.activityArea + ' Activity Purpose: ' + packet.activityPurpose +
				  ' Question1: ' + packet.question1 + ' Question2: ' + packet.question2 + ' Question3: ' + packet.question3 + ' Question4: ' + packet.question4 + ' Question5: ' + packet.question5)

		this.server.send(session, GameOPCode.SClubCreateAck, SClubCreateAck.serialize(ClubCreateResult.OK))
		log.debug('Packet Sent [SClubCreateAck]')
	},
	handleCClubCloseReq: function(session, packet) {
		log.debug('Packet Received [CClubCloseReq]')
		var packet = CClubCloseReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubCloseAck, SClubCloseAck.serialize(ClubCloseResult.OK))
		log.debug('Packet Sent [SClubCloseAck]')
	},
	handleCClubUnjoinReq: function(session, packet) {
		log.debug('Packet Received [CClubUnjoinReq]')
		var packet = CClubUnjoinReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubUnjoinAck, SClubUnjoinAck.serialize(ClubUnjoinResult.OK))
		log.debug('Packet Sent [SClubUnjoinAck]')
	},
	handleCClubNameCheckReq: function(session, packet) {
		log.debug('Packet Received [CClubNameCheckReq]')
		var packet = CClubNameCheckReq.deserialize(packet)

		log.debug('Name: ' + packet.name)

		this.server.send(session, GameOPCode.SClubNameCheckAck, SClubNameCheckAck.serialize(ClubNameCheckResult.OK))
		log.debug('Packet Sent [SClubNameCheckAck]')
	},
	handleCClubRestoreReq: function(session, packet) {
		log.debug('Packet Received [CClubRestoreReq]')
		var packet = CClubRestoreReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubRestoreAck, SClubRestoreAck.serialize(ClubRestoreResult.OK))
		log.debug('Packet Sent [SClubRestoreAck]')
	},
	handleCClubAdminInviteReq: function(session, packet) {
		log.debug('Packet Received [CClubAdminInviteReq]')
		var packet = CClubAdminInviteReq.deserialize(packet)

		log.debug('Player ID: ' + packet.playerId)

		this.server.send(session, GameOPCode.SClubAdminInviteAck, SClubAdminInviteAck.serialize(ClubAdminInviteResult.OK))
		log.debug('Packet Sent [SClubAdminInviteAck]')
	},
	handleCClubAdminJoinCommandReq: function(session, packet) {
		log.debug('Packet Received [CClubAdminJoinCommandReq]')
		var packet = CClubAdminJoinCommandReq.deserialize(packet)

		log.debug('Type: ' + packet.type)

		for (var i = 0; i < packet.playerIds.length; i++) {
			log.debug('#' + i + ' Player ID: ' + packet.playerIds[i])
		}

		this.server.send(session, GameOPCode.SClubAdminJoinCommandAck, SClubAdminJoinCommandAck.serialize(ClubAdminJoinCommandResult.OK))
		log.debug('Packet Sent [SClubAdminJoinCommandAck]')
	},
	handleCClubAdminGradeChangeReq: function(session, packet) {
		log.debug('Packet Received [CClubAdminGradeChangeReq]')
		var packet = CClubAdminGradeChangeReq.deserialize(packet)

		for (var i = 0; i < packet.players.length; i++) {
			var player = packet.players[i]
			log.debug('#' + i + ' Player ID: ' + player.playerId + ' Class: ' + player.class)
		}

		this.server.send(session, GameOPCode.SClubAdminGradeChangeAck, SClubAdminGradeChangeAck.serialize(ClubAdminGradeChangeResult.OK))
		log.debug('Packet Sent [SClubAdminGradeChangeAck]')
	},
	handleCClubAdminNoticeChangeReq: function(session, packet) {
		log.debug('Packet Received [CClubAdminNoticeChangeReq]')
		var packet = CClubAdminNoticeChangeReq.deserialize(packet)

		log.debug('Text: ' + packet.text)

		this.server.send(session, GameOPCode.SClubAdminNoticeChangeAck, SClubAdminNoticeChangeAck.serialize(ClubAdminNoticeChangeResult.OK))
		log.debug('Packet Sent [SClubAdminNoticeChangeAck]')
	},
	handleCClubAdminInfoModifyReq: function(session, packet) {
		log.debug('Packet Received [CClubAdminInfoModifyReq]')
		var packet = CClubAdminInfoModifyReq.deserialize(packet)

		log.debug('Activity Area: ' + packet.activityArea + ' Activity Purpose: ' + packet.activityPurpose + ' Introduction: ' + packet.introduction)

		this.server.send(session, GameOPCode.SClubAdminInfoModifyAck, SClubAdminInfoModifyAck.serialize(ClubAdminInfoModifyResult.OK))
		log.debug('Packet Sent [SClubAdminInfoModifyAck]')
	},
	handleCClubAdminSubMasterReq: function(session, packet) {
		log.debug('Packet Received [CClubAdminSubMasterReq]')
		var packet = CClubAdminSubMasterReq.deserialize(packet)

		log.debug('Player ID: ' + packet.playerId + ' Duration: ' + packet.duration)

		this.server.send(session, GameOPCode.SClubAdminSubMasterAck, SClubAdminSubMasterAck.serialize(ClubAdminSubMasterResult.OK))
		log.debug('Packet Sent [SClubAdminSubMasterAck]')
	},
	handleCClubAdminMasterChangeReq: function(session, packet) {
		log.debug('Packet Received [CClubAdminMasterChangeReq]')
		var packet = CClubAdminMasterChangeReq.deserialize(packet)

		log.debug('Player ID: ' + packet.playerId)

		this.server.send(session, GameOPCode.SClubAdminMasterChangeAck, SClubAdminMasterChangeAck.serialize(ClubAdminMasterChangeResult.OK))
		log.debug('Packet Sent [SClubAdminMasterChangeAck]')
	},
	handleCClubAdminJoinConditionModifyReq: function(session, packet) {
		log.debug('Packet Received [CClubAdminJoinConditionModifyReq]')
		var packet = CClubAdminJoinConditionModifyReq.deserialize(packet)

		log.debug('Join Type: ' + packet.joinType + ' Minimum Join Level: ' + packet.minimumJoinLevel + ' Question1: ' + packet.question1 + ' Question2: ' + packet.question2 +
				  ' Question3: ' + packet.question3 + ' Question4: ' + packet.question4 + ' Question5: ' + packet.question5)

		this.server.send(session, GameOPCode.SClubAdminJoinConditionModifyAck, SClubAdminJoinConditionModifyAck.serialize(ClubAdminJoinConditionModifyResult.OK))
		log.debug('Packet Sent [SClubAdminJoinConditionModifyAck]')
	},
	handleCClubAdminBoardModifyReq: function(session, packet) {
		log.debug('Packet Received [CClubAdminBoardModifyReq]')
		var packet = CClubAdminBoardModifyReq.deserialize(packet)

		log.debug('Access: ' + packet.access + ' PostRight: ' + packet.postRight + ' BadMannerRejectedAccess: ' + packet.badMannerRejectedAccess + ' BadMannerRejectedPost: ' + packet.badMannerRejectedPost)

		this.server.send(session, GameOPCode.SClubAdminBoardModifyAck, SClubAdminBoardModifyAck.serialize(ClubAdminBoardModifyResult.OK))
		log.debug('Packet Sent [SClubAdminBoardModifyAck]')
	},
	handleCClubSearchReq: function(session, packet) {
		log.debug('Packet Received [CClubSearchReq]')
		var packet = CClubSearchReq.deserialize(packet)

		log.debug('Search By: ' + packet.searchBy + ' Search: ' + packet.search + ' Page: ' + packet.page + ' Sort By: ' + packet.sortBy + ' Sort: ' + packet.sort)

		/*
		if(searchBy === 1) {
			searchBy = 'Clan Name'
		} else if(searchBy === 3) {
			searchBy = 'Clan Master'
		} else {
			searchBy = 'Nothing'
		}

		if(sortBy === 1) {
			sortBy = 'Members'
		} else if(sortBy === 2) {
			sortBy = 'Class'
		} else if(sortBy === 3) {
			sortBy = 'Clan Point'
		} else {
			sortBy = 'Nothing'
		}

		sort = sort ? 'ASC' : 'DESC'
		*/

		this.server.send(session, GameOPCode.SClubSearchAck, SClubSearchAck.serialize())
		log.debug('Packet Sent [SClubSearchAck]')
	},
	handleCClubInfoReq: function(session, packet) {
		log.debug('Packet Received [CClubInfoReq]')
		var packet = CClubInfoReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubInfoAck, SClubInfoAck.serialize())
		log.debug('Packet Sent [SClubInfoAck]')
	},
	handleCClubJoinWaiterInfoReq: function(session, packet) {
		log.debug('Packet Received [CClubJoinWaiterInfoReq]')
		var packet = CClubJoinWaiterInfoReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubJoinWaiterInfoAck, SClubJoinWaiterInfoAck.serialize())
		log.debug('Packet Sent [SClubJoinWaiterInfoAck]')
	},
	handleCClubNewJoinMemberInfoReq: function(session, packet) {
		log.debug('Packet Received [CClubNewJoinMemberInfoReq]')
		var packet = CClubNewJoinMemberInfoReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubNewJoinMemberInfoAck, SClubNewJoinMemberInfoAck.serialize())
		log.debug('Packet Sent [SClubNewJoinMemberInfoAck]')
	},
	handleCClubJoinConditionInfoReq: function(session, packet) {
		log.debug('Packet Received [CClubJoinConditionInfoReq]')
		var packet = CClubJoinConditionInfoReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubJoinConditionInfoAck, SClubJoinConditionInfoAck.serialize())
		log.debug('Packet Sent [SClubJoinConditionInfoAck]')
	},
	handleCClubUnjoinerListReq: function(session, packet) {
		log.debug('Packet Received [CClubUnjoinerListReq]')
		var packet = CClubUnjoinerListReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubUnjoinerListAck, SClubUnjoinerListAck.serialize())
		log.debug('Packet Sent [SClubUnjoinerListAck]')
	},
	handleCClubStuffListReq: function(session, packet) {
		log.debug('Packet Received [CClubStuffListReq]')
		var packet = CClubStuffListReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubStuffListAck, SClubStuffListAck.serialize())
		log.debug('Packet Sent [SClubStuffListAck]')
	},
	handleCClubNewsInfoReq: function(session, packet) {
		log.debug('Packet Received [CClubNewsInfoReq]')
		var packet = CClubNewsInfoReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubNewsInfoAck, SClubNewsInfoAck.serialize())
		log.debug('Packet Sent [SClubNewsInfoAck]')
	},
	handleCClubBoardWriteReq: function(session, packet) {
		log.debug('Packet Received [CClubBoardWriteReq]')
		var packet = CClubBoardWriteReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId + ' Parent Post ID: ' + packet.parentPostId + ' Internal: ' + packet.internal + ' Text: ' + packet.text)

		this.server.send(session, GameOPCode.SClubBoardWriteAck, SClubBoardWriteAck.serialize(ClubBoardWriteResult.OK))
		log.debug('Packet Sent [SClubBoardWriteAck]')
	},
	handleCClubBoardReadReq: function(session, packet) {
		log.debug('Packet Received [CClubBoardReadReq]')
		var packet = CClubBoardReadReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId + ' Page: ' + packet.page + ' Unk1: ' + packet.unk1 + ' Unk2: ' + packet.unk2 + ' Unk3: ' + packet.unk3)

		this.server.send(session, GameOPCode.SClubBoardReadAck, SClubBoardReadAck.serialize())
		log.debug('Packet Sent [SClubBoardReadAck]')
	},
	handleCClubBoardModifyReq: function(session, packet) {
		log.debug('Packet Received [CClubBoardModifyReq]')
		var packet = CClubBoardModifyReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId + ' Post ID: ' + packet.postId + ' Internal: ' + packet.internal + ' Text: ' + packet.text)

		this.server.send(session, GameOPCode.SClubBoardModifyAck, SClubBoardModifyAck.serialize(ClubBoardModifyResult.OK))
		log.debug('Packet Sent [SClubBoardModifyAck]')
	},
	handleCClubBoardDeleteReq: function(session, packet) {
		log.debug('Packet Received [CClubBoardDeleteReq]')
		var packet = CClubBoardDeleteReq.deserialize(packet)

		log.debug('Post ID: ' + packet.postId)

		this.server.send(session, GameOPCode.SClubBoardDeleteAck, SClubBoardDeleteAck.serialize(ClubBoardDeleteResult.OK))
		log.debug('Packet Sent [SClubBoardDeleteAck]')
	},
	handleCClubBoardDeleteAllReq: function(session, packet) {
		log.debug('Packet Received [CClubBoardDeleteAllReq]')
		var packet = CClubBoardDeleteAllReq.deserialize(packet)

		log.debug('Type: ' + packet.type)

		this.server.send(session, GameOPCode.SClubBoardDeleteAllAck, SClubBoardDeleteAllAck.serialize(ClubBoardDeleteAllResult.OK))
		log.debug('Packet Sent [SClubBoardDeleteAllAck]')
	},
	handleCClubBoardSearchNickReq: function(session, packet) {
		log.debug('Packet Received [CClubBoardSearchNickReq]')
		var packet = CClubBoardSearchNickReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId + ' Name: ' + packet.name + ' Unk: ' + packet.unk)

		this.server.send(session, GameOPCode.SClubBoardReadAck, SClubBoardReadAck.serialize())
		log.debug('Packet Sent [SClubBoardReadAck]')
	},
	handleCClubBoardReadOtherClubReq: function(session, packet) {
		log.debug('Packet Received [CClubBoardReadOtherClubReq]')
		var packet = CClubBoardReadOtherClubReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId + ' Unk: ' + packet.unk)

		this.server.send(session, GameOPCode.SClubBoardReadAck, SClubBoardReadAck.serialize())
		log.debug('Packet Sent [SClubBoardReadAck]')
	}
}

module.exports = ClubService