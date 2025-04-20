var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')

// C2S
var CClubNoticePointRefreshReq = require('../../Core/S4League/Game/C2S/CClubNoticePointRefreshReq')
var CClubNoticeRecordRefreshReq = require('../../Core/S4League/Game/C2S/CClubNoticeRecordRefreshReq')
var CClubOtherClubinfoReq = require('../../Core/S4League/Game/C2S/CClubCreateReq2')

var CClubCreateReq2 = require('../../Core/S4League/Game/C2S/CClubCreateReq2')
var CClubClubInfoReq2 = require('../../Core/S4League/Game/C2S/CClubClubInfoReq2')
var CClubSearchReq2 = require('../../Core/S4League/Game/C2S/CClubSearchReq2')
var CClubRankListReq = require('../../Core/S4League/Game/C2S/CClubRankListReq')

// S2C
var SClubNoticePointRefreshAck = require('../../Core/S4League/Game/S2C/SClubNoticePointRefreshAck')
var SClubNoticeRecordRefreshAck = require('../../Core/S4League/Game/S2C/SClubNoticeRecordRefreshAck')
var SClubOtherClubinfoAck = require('../../Core/S4League/Game/S2C/SClubOtherClubinfoAck')

var SClubCreateAck2 = require('../../Core/S4League/Game/S2C/SClubCreateAck2')
var SClubClubInfoAck2 = require('../../Core/S4League/Game/S2C/SClubClubInfoAck2')
var SClubSearchAck2 = require('../../Core/S4League/Game/S2C/SClubSearchAck2')
var SClubRankListAck = require('../../Core/S4League/Game/S2C/SClubRankListAck')

var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')

var log = new Logger('Club2Service', true)

var Club2Service = function(server) {
	this.server = server
}

Club2Service.prototype = {
	// C2S Lobby
	handleCClubNoticePointRefreshReq: function(session, packet) {
		log.debug('Packet Received [CClubNoticePointRefreshReq]')
		var packet = CClubNoticePointRefreshReq.deserialize(packet)

		this.server.send(session, GameOPCode.SClubNoticePointRefreshAck, SClubNoticePointRefreshAck.serialize())
		log.debug('Packet Sent [SClubNoticePointRefreshAck]')
	},
	handleCClubNoticeRecordRefreshReq: function(session, packet) {
		log.debug('Packet Received [CClubNoticeRecordRefreshReq]')
		var packet = CClubNoticeRecordRefreshReq.deserialize(packet)

		this.server.send(session, GameOPCode.SClubNoticeRecordRefreshAck, SClubNoticeRecordRefreshAck.serialize())
		log.debug('Packet Sent [SClubNoticeRecordRefreshAck]')
	},
	handleCClubSearchRoomReq: function(session, packet) {
		log.debug('Packet Received [CClubSearchRoomReq]')
		//var packet = CClubSearchRoomReq.deserialize(packet)

		// TODO
	},
	handleCClubOtherClubinfoReq: function(session, packet) {
		log.debug('Packet Received [CClubOtherClubinfoReq]')
		var packet = CClubOtherClubinfoReq.deserialize(packet)

		log.debug('Name: ' + packet.name)

		this.server.send(session, GameOPCode.SClubOtherClubinfoAck, SClubOtherClubinfoAck.serialize())
		log.debug('Packet Sent [SClubOtherClubinfoAck]')

		this.server.send(session, GameOPCode.SClubNoticeRecordRefreshAck, SClubNoticeRecordRefreshAck.serialize())
		log.debug('Packet Sent [SClubNoticeRecordRefreshAck]')
	},
	// C2S Club
	handleCClubCreateReq2: function(session, packet) {
		log.debug('Packet Received [CClubCreateReq2]')
		var packet = CClubCreateReq2.deserialize(packet)

		log.debug('Name: ' + packet.name + ' String 1: ' + packet.string1 + ' String 2: ' + packet.string2)

		this.server.send(session, GameOPCode.SClubCreateAck2, SClubCreateAck2.serialize(0))
		log.debug('Packet Sent [SClubCreateAck2]')
	},
	handleCClubUnjoinReq2: function(session, packet) {
		log.debug('Packet Received [CClubUnjoinReq2]')
		//var packet = CClubUnjoinReq2.deserialize(packet)

		// TODO

		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedToRequestTask))
		log.debug('Packet Sent [SServerResultAck]')
	},
	handleCClubClubInfoReq2: function(session, packet) {
		log.debug('Packet Received [CClubClubInfoReq2]')
		var packet = CClubClubInfoReq2.deserialize(packet)

		log.debug('Clan ID: ' + packet.clanId)

		this.server.send(session, GameOPCode.SClubClubInfoAck2, SClubClubInfoAck2.serialize(session.clan.id, session.clan.name, session.clan.markId, session.clan.class, session.clan.master.accountId, session.clan.master.name, session.clan.creationDate))
		log.debug('Packet Sent [SClubClubInfoAck2]')
	},
	handleCClubSearchReq2: function(session, packet) {
		log.debug('Packet Received [CClubSearchReq2]')
		var packet = CClubSearchReq2.deserialize(packet)

		log.debug('Unk 1: ' + packet.unk1 + ' Name: ' + packet.name + ' Unk 2: ' + packet.unk2 + ' Unk 3: ' + packet.unk3 + ' Unk 4: ' + packet.unk4)

		this.server.send(session, GameOPCode.SClubSearchAck2, SClubSearchAck2.serialize())
		log.debug('Packet Sent [SClubSearchAck2]')
	},
	handleCClubRankListReq: function(session, packet) {
		log.debug('Packet Received [CClubRankListReq]')
		var packet = CClubRankListReq.deserialize(packet)

		log.debug('From: ' + packet.from + ' To: ' + packet.to)

		this.server.send(session, GameOPCode.SClubRankListAck, SClubRankListAck.serialize())
		log.debug('Packet Sent [SClubRankListAck]')
	}
}

module.exports = Club2Service