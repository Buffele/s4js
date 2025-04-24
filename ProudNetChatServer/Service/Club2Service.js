var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
var CClubClubMemberInfoReq2 = require('../../Core/S4League/Chat/C2S/CClubClubMemberInfoReq2')
var CClubMemberListReq2 = require('../../Core/S4League/Chat/C2S/CClubMemberListReq2')
var CClubNoteSendReq2 = require('../../Core/S4League/Chat/C2S/CClubNoteSendReq2')

// S2C
var SClubClubMemberInfoAck2 = require('../../Core/S4League/Chat/S2C/SClubClubMemberInfoAck2')
var SClubMemberListAck2 = require('../../Core/S4League/Chat/S2C/SClubMemberListAck2')
var SBroadCastClubClose = require('../../Core/S4League/Chat/S2C/SBroadCastClubClose')

var log = new Logger('Club2Service', true)

var Club2Service = function(server) {
	this.server = server
}

Club2Service.prototype = {
	handleCClubClubMemberInfoReq2: function(session, packet) {
		log.debug('Packet Received [CClubClubMemberInfoReq2]')
		var packet = CClubClubMemberInfoReq2.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId + ' Type: ' + packet.type + ' Unk: ' + packet.unk)

		var data = Buffer.from([
			0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00, 0x00,
			0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
			0x00, 0x00, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00, 0xff, 0xff, 0xff,
			0xff, 0x7e, 0xd6, 0xf9, 0x00, 0xd0, 0x07, 0x78, 0x07, 0xc8, 0x07, 0x78, 0x07, 0x08, 0x08, 0xe1,
			0x02
		])

		this.server.send(session, ChatOPCode.SClubClubMemberInfoAck2, SClubClubMemberInfoAck2.serialize(data))
		log.debug('Packet Sent [SClubClubMemberInfoAck2]')
	},
	handleCClubMemberListReq2: function(session, packet) {
		log.debug('Packet Received [CClubMemberListReq2]')
		var packet = CClubMemberListReq2.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		var members = [
			/*
			{
				accountId: 10001,
				name: 'Test10001',
				memberId: 1,
				unk1: 0,
				class: 1,
				points: 69,
				unk2: 0,
				signIn: '20150924175756',
				unk3: 1,
				lastVisit: '20150924223118',
				unk4: 0,
				unk5: 0,
				unk6: -1,
				unk7: 41,
				unk8: 8
			},
			{
				accountId: 10002,
				name: 'Test10002',
				memberId: 2,
				unk1: 0,
				class: 2,
				points: 100,
				unk2: 0,
				signIn: '20150924175756',
				unk3: 1,
				lastVisit: '20150924223118',
				unk4: 0,
				unk5: 0,
				unk6: -1,
				unk7: 41,
				unk8: 8
			},
			{
				accountId: 10003,
				name: 'Test10003',
				memberId: 3,
				unk1: 0,
				class: 3,
				points: 1000,
				unk2: 0,
				signIn: '20150924175756',
				unk3: 1,
				lastVisit: '20150924223118',
				unk4: 0,
				unk5: 0,
				unk6: -1,
				unk7: 41,
				unk8: 8
			}
			*/
		]

		this.server.send(session, ChatOPCode.SClubMemberListAck2, SClubMemberListAck2.serialize(packet.clanId, members))
		log.debug('Packet Sent [SClubMemberListAck2]')
	},
	handleCClubNoteSendReq2: function(session, packet) {
		log.debug('Packet Received [CClubNoteSendReq2]')
		var packet = CClubNoteSendReq2.deserialize(packet)

		log.warning('Remaining: ' + Packet.dump(packet.remaining))
	}
}

module.exports = Club2Service