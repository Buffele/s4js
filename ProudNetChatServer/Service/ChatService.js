var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var HashUtil = require('../../Core/S4League/HashUtil')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var LoginResult = require('../../Core/S4League/Chat/Constants/LoginResult')

// C2S
var CLoginReq = require('../../Core/S4League/Chat/C2S/CLoginReq')

// S2C
var SLoginAck = require('../../Core/S4League/Chat/S2C/SLoginAck')
var SChannelPlayerListAck = require('../../Core/S4League/Chat/S2C/SChannelPlayerListAck')
var SChannelPlayerNameTagListAck = require('../../Core/S4League/Chat/S2C/SChannelPlayerNameTagListAck')
var SChannelLeavePlayerAck = require('../../Core/S4League/Chat/S2C/SChannelLeavePlayerAck')
var SNoteCountAck = require('../../Core/S4League/Chat/S2C/SNoteCountAck')
var SPlayerInfoAck = require('../../Core/S4League/Chat/S2C/SPlayerInfoAck')
var SChannelEnterPlayerAck = require('../../Core/S4League/Chat/S2C/SChannelEnterPlayerAck')
var SClanMemberListAck = require('../../Core/S4League/Chat/S2C/SClanMemberListAck')
var SClubSystemMessage = require('../../Core/S4League/Chat/S2C/SClubSystemMessage')
var SClubNewsRemind = require('../../Core/S4League/Chat/S2C/SClubNewsRemind')
var SClubMemberLoginStateAck = require('../../Core/S4League/Chat/S2C/SClubMemberLoginStateAck')
var SFriendListAck = require('../../Core/S4League/Chat/S2C/SFriendListAck')
var SCombiListAck = require('../../Core/S4League/Chat/S2C/SCombiListAck')
var SDenyListAck = require('../../Core/S4League/Chat/S2C/SDenyListAck')
var SPlayerPositionAck = require('../../Core/S4League/Chat/S2C/SPlayerPositionAck')
var SPlayerPlayerInfoListAck = require('../../Core/S4League/Chat/S2C/SPlayerPlayerInfoListAck')

var log = new Logger('ChatService', true)

var ChatService = function(server, data) {
	this.server = server
	this.data = data
}

ChatService.prototype = {
	close: function(session) {
		this.closed(session)
		session.destroy()
	},
	closed: function(session) {
		if(!session.accountId) {
			return
		}

		this.data.removePlayer(session)
	},
	handleCLoginReq: function(session, packet) {
		log.debug('Packet Received [CLoginReq]')
		var packet = CLoginReq.deserialize(packet)

		log.debug('Account ID: ' + packet.accountId + ' Name: ' + packet.name + ' Session ID: ' + packet.sessionId)

		// Session Hash Check
		var expectedSessionHash = HashUtil.calculateSessionHash(packet.accountId, '1234', 5, 0)
		log.debug('Expected Session Hash: ' + expectedSessionHash)
		if(packet.sessionId === expectedSessionHash) {
			log.info('Session Hash is valid!')
		} else {
			log.error('Session Hash not valid!')
		}

		session.accountId = packet.accountId
		session.name = packet.name
		session.exp = 6000000
		session.isGM = 0
		session.nametagId = 4000000002//1

		this.data.addPlayer(session)

		this.server.send(session, ChatOPCode.SLoginAck, SLoginAck.serialize(LoginResult.OK))
		log.debug('Packet Sent [SLoginAck]')

		var players = [
			{
				accountId: session.accountId,
				name: session.name,
				unk: 0,
				exp: session.exp,
				isGM: session.isGM
			},
			{
				accountId: 1337,
				name: '1337',
				unk: 0,
				exp: 1337,
				isGM: 0
			}
		]
		this.server.send(session, ChatOPCode.SChannelPlayerListAck, SChannelPlayerListAck.serialize(players))
		log.debug('Packet Sent [SChannelPlayerListAck]')

		var playersI = [
			{
				accountId: 1337,
				nametagId: 0
			},
			{
				accountId: session.accountId,
				nametagId: 0
			}
		]
		this.server.send(session, ChatOPCode.SChannelPlayerNameTagListAck, SChannelPlayerNameTagListAck.serialize(playersI))
		log.debug('Packet Sent [SChannelPlayerNameTagListAck]')

		var playersI = [
			{
				accountId: 1337,
				nametagId: 4000000002
			},
			{
				accountId: session.accountId,
				nametagId: session.nametagId
			}
		]
		this.server.send(session, ChatOPCode.SChannelPlayerNameTagListAck, SChannelPlayerNameTagListAck.serialize(playersI))
		log.debug('Packet Sent [SChannelPlayerNameTagListAck]')

		//this.server.send(session, ChatOPCode.SChannelPlayerListAck, SChannelPlayerListAck.serialize(this.data.players))
		//log.debug('Packet Sent [SChannelPlayerListAck]')


		//this.server.send(session, ChatOPCode.SChannelPlayerNameTagListAck, SChannelPlayerNameTagListAck.serialize(this.data.players))
		//log.debug('Packet Sent [SChannelPlayerNameTagListAck]')

		//this.data.broadcast(ChatOPCode.SChannelEnterPlayerAck, SChannelEnterPlayerAck.serialize(session.accountId, session.name, session.exp, session.isGM), session)
		//log.debug('Packet Sent [SChannelEnterPlayerAck]')

		var denies = [
			/*
			{
				accountId: 200,
				name: 'Test200'
			},
			{
				accountId: 201,
				name: 'Test201'
			}
			*/
		]

		this.server.send(session, ChatOPCode.SDenyListAck, SDenyListAck.serialize(denies))
		log.debug('Packet Sent [SDenyListAck]')

		var friends = [
			/*
			{
				accountId: 100,
				name: '[GS] Gayneas',
				type: 2
			},
			{
				accountId: 101,
				name: 'Kimx7',
				type: 2,
				unk: 0
			},
			{
				accountId: 102,
				name: 'Jasmin',
				type: 2,
				unk: 0
			},
			{
				accountId: 103,
				name: 'Fipp',
				type: 2,
				unk: 0
			},
			{
				accountId: 104,
				name: 'Fapp',
				type: 2,
				unk: 0
			}
			*/
		]

		this.server.send(session, ChatOPCode.SFriendListAck, SFriendListAck.serialize(friends))
		log.debug('Packet Sent [SFriendListAck]')

		var combis = [
			/*
			{
				accountId: 1,
				type: 2,
				matches: 10,
				win: 6,
				lose: 4,
				unkString: '77',
				playerName: 'Test 1',
				name: 'Combi1',
				creationDate: '20150509214922'
			},
			{
				accountId: 2,
				type: 2,
				matches: 10,
				win: 7,
				lose: 3,
				unkString: '77',
				playerName: 'Test 2',
				name: 'Combi2',
				creationDate: '20150509214922'
			}
			*/
		]

		this.server.send(session, ChatOPCode.SCombiListAck, SCombiListAck.serialize(combis))
		log.debug('Packet Sent [SCombiListAck]')

		var players = [
			/*
			{
				accountId: 100,
				name: '[GS] Gayneas',
				unk1: 0,
				exp: 6000000,
				isGM: 0,
				server: 1,
				channel: 2,
				room: 3,
				clanId: 0,
				unk2: 20,
				unk3: 18
			},
			{
				accountId: 101,
				name: 'Kimx7',
				unk1: 0,
				exp: 5000000,
				isGM: 0,
				server: 1,
				channel: 2,
				room: 3,
				clanId: 0,
				unk2: 20,
				unk3: 18
			},
			{
				accountId: 102,
				name: 'Jasmin',
				unk1: 0,
				exp: 4000000,
				isGM: 0,
				server: 1,
				channel: 2,
				room: 3,
				clanId: 0,
				unk2: 20,
				unk3: 18
			},
			{
				accountId: 103,
				name: 'Fipp',
				unk1: 0,
				exp: 3000000,
				isGM: 0,
				server: 1,
				channel: 2,
				room: 3,
				clanId: 0,
				unk2: 20,
				unk3: 18
			},
			{
				accountId: 104,
				name: 'Fapp',
				unk1: 0,
				exp: 2000000,
				isGM: 0,
				server: 1,
				channel: 2,
				room: 3,
				clanId: 0,
				unk2: 20,
				unk3: 18
			}
			*/
		]

		// Will be send after the friend and combi list to set the status :o... 2 packets. 1 for friend. And for Combi
		//this.server.send(session, ChatOPCode.SPlayerPlayerInfoListAck, SPlayerPlayerInfoListAck.serialize(players))
		//log.debug('Packet Sent [SPlayerPlayerInfoListAck]')

		var members = [
			/*
			{
				accountId: 1,
				name: 'Test 1',
				unk1: 0,
				exp: 6000000,
				isGM: 0,
				server: 1,
				channel: 2,
				room: 3,
				clanId: 728860,
				unk2: 20,
				unk3: 18
			},
			{
				accountId: 2,
				name: 'Test 2',
				unk1: 0,
				exp: 3000000,
				isGM: 0,
				server: 1,
				channel: 2,
				room: 3,
				clanId: 728860,
				unk2: 20,
				unk3: 18
			}
			*/
		]

		this.server.send(session, ChatOPCode.SClanMemberListAck, SClanMemberListAck.serialize(members))
		log.debug('Packet Sent [SClanMemberListAck]')

		this.server.send(session, ChatOPCode.SClubNewsRemind, SClubNewsRemind.serialize(-1, -1))
		log.debug('Packet Sent [SClubNewsRemind]')

		//this.server.send(session, ChatOPCode.SClubMemberLoginStateAck, SClubMemberLoginStateAck.serialize(1, 10001))
		//log.debug('Packet Sent [SClubMemberLoginStateAck]')

		//this.server.send(session, ChatOPCode.SClubSystemMessage, SClubSystemMessage.serialize(10001, 1, 'Test10001', 1))
		//log.debug('Packet Sent [SClubSystemMessage]')

		this.server.send(session, ChatOPCode.SNoteCountAck, SNoteCountAck.serialize(0, 0, 0))
		log.debug('Packet Sent [SNoteCountAck]')

		//this.server.send(session, ChatOPCode.SPlayerInfoAck, SPlayerInfoAck.serialize())
		//log.debug('Packet Sent [SPlayerInfoAck]')
	}
}

module.exports = ChatService