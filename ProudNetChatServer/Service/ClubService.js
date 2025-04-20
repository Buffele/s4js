var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ClubNoteSendResult = require('../../Core/S4League/Chat/Constants/ClubNoteSendResult')

// C2S
var CClubNoteSendReq = require('../../Core/S4League/Chat/C2S/CClubNoteSendReq')
var CClubMemberListReq = require('../../Core/S4League/Chat/C2S/CClubMemberListReq')

// S2C
var SClubNoteSendAck = require('../../Core/S4League/Chat/S2C/SClubNoteSendAck')
var SClubMemberListAck = require('../../Core/S4League/Chat/S2C/SClubMemberListAck')

var log = new Logger('ClubService', true)

var ClubService = function(server) {
	this.server = server
}

ClubService.prototype = {
	handleCClubNoteSendReq: function(session, packet) {
		log.debug('Packet Received [CClubNoteSendReq]')
		var packet = CClubNoteSendReq.deserialize(packet)

		log.debug(Packet.dump(packet.unk)) // TODO

		log.debug('Subject: ' + packet.subject + ' Text: ' + packet.text)

		this.server.send(session, ChatOPCode.SClubNoteSendAck, SClubNoteSendAck.serialize(ClubNoteSendResult.OK))
		log.debug('Packet Sent [SClubNoteSendAck]')
	},
	handleCClubMemberListReq: function(session, packet) {
		log.debug('Packet Received [CClubMemberListReq]')
		var packet = CClubMemberListReq.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		var members = [
			/*
			{
				accountId: 10001,
				name: 'Test10001',
				memberId: 1,
				class: 5,
				rank: 0,
				visits: 2,
				signIn: '20130508064636',
				lastVisit: '20130510013756',
				state: 0
			},
			{
				accountId: 10002,
				name: 'Test10002',
				memberId: 2,
				class: 5,
				rank: 1,
				visits: 1,
				signIn: '20130507012108',
				lastVisit: '20130507013534',
				state: 1
			},
			{
				accountId: 10003,
				name: 'Test10003',
				memberId: 3,
				class: 5,
				rank: 2,
				visits: 6,
				signIn: '20130510222404',
				lastVisit: '20140627141311',
				state: 2
			}
			*/
		]

		this.server.send(session, ChatOPCode.SClubMemberListAck, SClubMemberListAck.serialize(members))
		log.debug('Packet Sent [SClubMemberListAck]')
	}
}

module.exports = ClubService