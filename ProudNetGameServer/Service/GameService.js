var Common = require('../../Core/S4League/Constants/Common')
var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var HashUtil = require('../../Core/S4League/HashUtil')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')
var CompressMode = require('../../Core/ProudNet/Constants/CompressMode')

var ConfigManager = require('../Manager/ConfigManager')

var ChannelInfoType = require('../../Core/S4League/Game/Constants/ChannelInfoType')
var LoginResult = require('../../Core/S4League/Game/Constants/LoginResult')
var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')

// C2S
var CLoginRequestReq = require('../../Core/S4League/Game/C2S/CLoginRequestReq')
var CTimeSyncReq = require('../../Core/S4League/Game/C2S/CTimeSyncReq')
var CChannelInfoReq = require('../../Core/S4League/Game/C2S/CChannelInfoReq')

// S2C
var SLoginRequestAck = require('../../Core/S4League/Game/S2C/SLoginRequestAck')
var SDefaultNickAck = require('../../Core/S4League/Game/S2C/SDefaultNickAck')
var SMoneyRefreshCashInfoAck = require('../../Core/S4League/Game/S2C/SMoneyRefreshCashInfoAck')
var SCharacterCurrentSlotInfoAck = require('../../Core/S4League/Game/S2C/SCharacterCurrentSlotInfoAck')
var SBtcSyncNotice = require('../../Core/S4League/Game/S2C/SBtcSyncNotice')
var SMoneyRefreshCoinInfoAck = require('../../Core/S4League/Game/S2C/SMoneyRefreshCoinInfoAck')
var SClubFASystemFARegisterConfirmAck = require('../../Core/S4League/Game/S2C/SClubFASystemFARegisterConfirmAck')
var SClubUnionSystemUserInfo = require('../../Core/S4League/Game/S2C/SClubUnionSystemUserInfo')
var SShoppingBasketListInfoAck = require('../../Core/S4League/Game/S2C/SShoppingBasketListInfoAck')
var SPlayerArcadeMapInfoAck = require('../../Core/S4League/Game/S2C/SPlayerArcadeMapInfoAck')
var SPlayerArcadeStageInfoAck = require('../../Core/S4League/Game/S2C/SPlayerArcadeStageInfoAck')
var SClubMyInfoAck = require('../../Core/S4League/Game/S2C/SClubMyInfoAck')
var SDailyMissionNotice = require('../../Core/S4League/Game/S2C/SDailyMissionNotice')
var SPlayerAccountInfoAck = require('../../Core/S4League/Game/S2C/SPlayerAccountInfoAck')
var SCharacterCurrentInfoAck = require('../../Core/S4League/Game/S2C/SCharacterCurrentInfoAck')
var SCharacterCurrentItemInfoAck = require('../../Core/S4League/Game/S2C/SCharacterCurrentItemInfoAck')
var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')
var SItemClearInvalidEquipItemAck = require('../../Core/S4League/Game/S2C/SItemClearInvalidEquipItemAck')
var SItemClearEsperChipAck = require('../../Core/S4League/Game/S2C/SItemClearEsperChipAck')
var SMapOpenInfosAck = require('../../Core/S4League/Game/S2C/SMapOpenInfosAck')
var SItemEquipBoostItemInfoAck = require('../../Core/S4League/Game/S2C/SItemEquipBoostItemInfoAck')
var SChallengeMyInfoAck = require('../../Core/S4League/Game/S2C/SChallengeMyInfoAck')
var STimeSyncAck = require('../../Core/S4League/Game/S2C/STimeSyncAck')
var SItemInventoryInfoAck = require('../../Core/S4League/Game/S2C/SItemInventoryInfoAck')
var SCollectBookUpdateCheckAck = require('../../Core/S4League/Game/S2C/SCollectBookUpdateCheckAck') // TODO
var SEspherChipLv5 = require('../../Core/S4League/Game/S2C/SEspherChipLv5')
var SXignCodeAliveAck = require('../../Core/S4League/Game/S2C/SXignCodeAliveAck')
var SServerkeyAck = require('../../Core/S4League/Game/S2C/SServerkeyAck')

var SCollectBookInventoryInfoAck = require('../../Core/S4League/Game/S2C/SCollectBookInventoryInfoAck')
var SCollectBookInvenEffectInfoAck = require('../../Core/S4League/Game/S2C/SCollectBookInvenEffectInfoAck')

var log = new Logger('GameService', true)

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var GameService = function (server, data, channelService, roomService, channelManager, roomManager) {
	this.server = server
	this.data = data
	this.channelService = channelService
	this.roomService = roomService
	this.channelManager = channelManager
	this.roomManager = roomManager
}

GameService.prototype = {
	close: function (session) {
		this.closed(session)
		session.destroy()
	},
	closed: function (session) {
		if (!session.playerId) {
			return
		}

		if (session.roomId) {
			this.roomManager.leave(session, session.roomId, 6)
		}

		if (session.channelId) {
			this.channelManager.leave(session, session.channelId, 1)
		}

		this.data.removePlayer(session)
	},
	handleCLoginRequestReq: function (session, packet) {
		if (session.playerId) {
			return
		}

		log.debug('Packet Received [CLoginRequestReq]')
		var packet = CLoginRequestReq.deserialize(packet)

		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Name: ' + packet.name)
		log.debug('Unk 2: ' + Packet.dump(packet.unk2))
		log.debug('Version [major=' + packet.version.major + ',minor=' + packet.version.minor + ',build=' + packet.version.build + ',revision=' + packet.version.revision + ']')
		log.debug('Account ID: ' + packet.accountId)
		log.debug('Session ID: ' + packet.sessionId)
		log.debug('Unk 3: ' + packet.unk3)
		log.debug('Force: ' + packet.force)
		log.debug('Unk 4: ' + packet.unk4)
		log.debug('Unk 5: ' + packet.unk5)
		log.debug('Unk 6: ' + packet.unk6)
		log.debug('Token 1: ' + packet.token1)
		log.debug('Token 2: ' + packet.token2)
		log.debug('Token 3: ' + packet.token3)

		// Version Check
		if(packet.version.major !== Common.EuGameVersion.major || packet.version.minor !== Common.EuGameVersion.minor || packet.version.build !== Common.EuGameVersion.build || packet.version.revision !== Common.EuGameVersion.revision) {
			log.info('Wrong Version received.')
			/*
			log.error('Wrong Version received. Closing Session!')
			this.server.send(session, GameOPCode.SLoginRequestAck, SLoginRequestAck.serialize(0, LoginResult.WrongVersion, 0, 0, '', ''))
			log.debug('Packet Sent [SLoginRequestAck]')
			session.destroy()
			return
			*/
		}

		// Session Hash Check
		var expectedSessionHash = HashUtil.calculateSessionHash(packet.accountId, '1234', 3, 0)
		log.debug('Expected Session Hash: ' + expectedSessionHash)
		if(packet.sessionId === expectedSessionHash) {
			log.info('Session Hash is valid!')
		} else {
			log.info('Session Hash not valid!')
		}

		// TODO: When authentication failed:
		//this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.AuthenticationFailed))
		//log.debug('Packet Sent [SServerResultAck]')
		//return

		session.playerId = packet.accountId
		session.name = 'Test' + session.playerId
		session.exp = 6000000
		session.level = 80
		session.isGM = 1
		session.nametagId = 0
		session.matches = 7
		session.wins = 2
		session.loses = 5
		session.playtime = 120
		session.pen = 1000000000
		session.clan = {
			id: 1,
			name: 'TestClub001',
			markId: '0-0-0',
			class: 'C',
			master: {
				accountId: session.playerId,
				name: session.name
			},
			creationDate: '20150924175756'
		}

		session.team = 0
		session.state = 0
		session.isReady = 0
		session.gameMode = 0
		session.isConnecting = false

		this.data.addPlayer(session)

		this.server.send(session, GameOPCode.SLoginRequestAck, SLoginRequestAck.serialize(session.playerId, LoginResult.OK, 1430499234, 0, '', ''))
		log.debug('Packet Sent [SLoginRequestAck]')

		this.server.send(session, GameOPCode.SMoneyRefreshCashInfoAck, SMoneyRefreshCashInfoAck.serialize())
		log.debug('Packet Sent [SMoneyRefreshCashInfoAck]')

		this.server.send(session, GameOPCode.SCharacterCurrentSlotInfoAck, SCharacterCurrentSlotInfoAck.serialize())
		log.debug('Packet Sent [SCharacterCurrentSlotInfoAck]')

		// TODO: Can this be safely removed?
		//this.server.send(session, GameOPCode.SCollectBookUpdateCheckAck, SCollectBookUpdateCheckAck.serialize())
		//log.debug('Packet Sent [SCollectBookUpdateCheckAck]')

		this.server.send(session, GameOPCode.SBtcSyncNotice, SBtcSyncNotice.serialize())
		log.debug('Packet Sent [SBtcSyncNotice]')

		this.server.send(session, GameOPCode.SMoneyRefreshCoinInfoAck, SMoneyRefreshCoinInfoAck.serialize())
		log.debug('Packet Sent [SMoneyRefreshCoinInfoAck]')

		this.server.send(session, GameOPCode.SClubFASystemFARegisterConfirmAck, SClubFASystemFARegisterConfirmAck.serialize(0))
		log.debug('Packet Sent [SClubFASystemFARegisterConfirmAck]')

		this.server.send(session, GameOPCode.SClubUnionSystemUserInfo, SClubUnionSystemUserInfo.serialize(0, 0, 2, 1))
		log.debug('Packet Sent [SClubUnionSystemUserInfo]')

		this.server.send(session, GameOPCode.SShoppingBasketListInfoAck, SShoppingBasketListInfoAck.serialize())
		log.debug('Packet Sent [SShoppingBasketListInfoAck]')

		this.server.send(session, GameOPCode.SPlayerArcadeMapInfoAck, SPlayerArcadeMapInfoAck.serialize())
		log.debug('Packet Sent [SPlayerArcadeMapInfoAck]')

		this.server.send(session, GameOPCode.SPlayerArcadeStageInfoAck, SPlayerArcadeStageInfoAck.serialize())
		log.debug('Packet Sent [SPlayerArcadeStageInfoAck]')

		this.server.send(session, GameOPCode.SItemInventoryInfoAck, SItemInventoryInfoAck.serialize(ConfigManager.items), CompressMode.Zip)
		log.debug('Packet Sent [SItemInventoryInfoAck]')

		this.server.send(session, GameOPCode.SClubMyInfoAck, SClubMyInfoAck.serialize(session.clan))
		log.debug('Packet Sent [SClubMyInfoAck]')

		this.server.send(session, GameOPCode.SDailyMissionNotice, SDailyMissionNotice.serialize())
		log.debug('Packet Sent [SDailyMissionNotice]')

		//this.server.send(session, GameOPCode.SCollectBookInventoryInfoAck, SCollectBookInventoryInfoAck.serialize())
		//log.debug('Packet Sent [SCollectBookInventoryInfoAck]')

		this.server.send(session, GameOPCode.SCollectBookInvenEffectInfoAck, SCollectBookInvenEffectInfoAck.serialize())
		log.debug('Packet Sent [SCollectBookInvenEffectInfoAck]')

		this.server.send(session, GameOPCode.SPlayerAccountInfoAck, SPlayerAccountInfoAck.serialize(session))
		log.debug('Packet Sent [SPlayerAccountInfoAck]')

		session.key = getRandomInt(1, 2000000000)
		this.server.send(session, GameOPCode.SServerkeyAck, SServerkeyAck.serialize(session.key))
		log.debug('Packet Sent [SServerkeyAck]')

		this.server.send(session, GameOPCode.SEspherChipLv5, SEspherChipLv5.serialize(-1))
		log.debug('Packet Sent [SEspherChipLv5]')

		////
		this.server.send(session, GameOPCode.SCharacterCurrentInfoAck, SCharacterCurrentInfoAck.serialize(0, 1))
		log.debug('Packet Sent [SCharacterCurrentInfoAck]')

		this.server.send(session, GameOPCode.SCharacterCurrentItemInfoAck, SCharacterCurrentItemInfoAck.serialize(0))
		log.debug('Packet Sent [SCharacterCurrentItemInfoAck]')

		this.server.send(session, GameOPCode.SCharacterCurrentInfoAck, SCharacterCurrentInfoAck.serialize(1, 1))
		log.debug('Packet Sent [SCharacterCurrentInfoAck]')

		this.server.send(session, GameOPCode.SCharacterCurrentItemInfoAck, SCharacterCurrentItemInfoAck.serialize(1))
		log.debug('Packet Sent [SCharacterCurrentItemInfoAck]')

		this.server.send(session, GameOPCode.SCharacterCurrentInfoAck, SCharacterCurrentInfoAck.serialize(2, 0))
		log.debug('Packet Sent [SCharacterCurrentInfoAck]')

		this.server.send(session, GameOPCode.SCharacterCurrentItemInfoAck, SCharacterCurrentItemInfoAck.serialize(2))
		log.debug('Packet Sent [SCharacterCurrentItemInfoAck]')
		////

		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.LoginSuccess))
		log.debug('Packet Sent [SServerResultAck]')

		this.server.send(session, GameOPCode.SItemClearInvalidEquipItemAck, SItemClearInvalidEquipItemAck.serialize())
		log.debug('Packet Sent [SItemClearInvalidEquipItemAck]')

		this.server.send(session, GameOPCode.SItemClearEsperChipAck, SItemClearEsperChipAck.serialize())
		log.debug('Packet Sent [SItemClearEsperChipAck]')

		this.server.send(session, GameOPCode.SMapOpenInfosAck, SMapOpenInfosAck.serialize())
		log.debug('Packet Sent [SMapOpenInfosAck]')

		this.server.send(session, GameOPCode.SItemEquipBoostItemInfoAck, SItemEquipBoostItemInfoAck.serialize())
		log.debug('Packet Sent [SItemEquipBoostItemInfoAck]')

		this.server.send(session, GameOPCode.SChallengeMyInfoAck, SChallengeMyInfoAck.serialize())
		log.debug('Packet Sent [SChallengeMyInfoAck]')
		
		this.server.send(session, GameOPCode.SNickDefaultAck, SDefaultNickAck.serialize(session.name))
		log.debug('Packet Sent [SDefaultNickAck]')
	},
	handleCTimeSyncReq: function (session, packet) {
		if (!session.playerId) {
			return
		}

		//log.debug('Packet Received [CTimeSyncReq]')
		var packet = CTimeSyncReq.deserialize(packet)

		//log.debug('Time: ' + packet.time)

		this.server.send(session, GameOPCode.STimeSyncAck, STimeSyncAck.serialize(packet.time, this.data.getProcessUptime()))
		//log.debug('Packet Sent [STimeSyncAck]')

		session.ping = packet.time - session.lastSyncTime - 5000
		session.lastSyncTime = packet.time
	},
	handleCChannelInfoReq: function (session, packet) {
		if (!session.playerId) {
			return
		}

		log.debug('Packet Received [CChannelInfoReq]')
		var packet = CChannelInfoReq.deserialize(packet)

		log.debug('Type: ' + packet.type + ' Key: ' + packet.key)

		// TODO: Latest client removes this...
		/*
		if (session.key !== packet.key) {
			log.error('Wrong Key received. Hacking Trial Detected!')
			session.destroy()
			return
		}
		*/

		if (ConfigManager.resourceHashKeyCheck && !session.hashKeyCheckSuccess) {
			log.debug('No Hash Key sent. Hacking Trial Detected!')
			session.destroy()
			return
		}

		if (packet.type === ChannelInfoType.Room) {
			this.roomService.sendRoomList(session)
		} else if (packet.type === ChannelInfoType.Channel) {
			this.channelService.sendChannelList(session)
		}
	},
	handleCPlayerBadUserReq: function (session, packet) {
		log.debug('Packet Received [CPlayerBadUserReq]')
		//var packet = CPlayerBadUserReq.deserialize(packet)

		// TODO
	}
}

module.exports = GameService
