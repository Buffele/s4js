var util = require('util')

var AeriaGamesUtils = require('../Core/AeriaGames/Utils')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetClient = require('../Core/ProudNet/Client')

var AuthOPCode = require('../Core/S4League/Auth/Constants/OPCode')
var ChatOPCode = require('../Core/S4League/Chat/Constants/OPCode')
var GameOPCode = require('../Core/S4League/Game/Constants/OPCode')

var Config = require('./Config')

// Auth
var AuthLoginResult = require('../Core/S4League/Auth/Constants/LoginResult')
var ServerType = require('../Core/S4League/Auth/Constants/ServerType')

// Game
var ChannelInfoType = require('../Core/S4League/Game/Constants/ChannelInfoType')
var ClubCreateResult = require('../Core/S4League/Game/Constants/ClubCreateResult')
var GameLoginResult = require('../Core/S4League/Game/Constants/LoginResult')
var ServerResult = require('../Core/S4League/Game/Constants/ServerResult')

// Chat
var ChatLoginResult = require('../Core/S4League/Chat/Constants/LoginResult')
var MessageWhisperChatResult = require('../Core/S4League/Chat/Constants/MessageWhisperChatResult')

// Auth C2S
var CLoginKRReq = require('../Core/S4League/Auth/C2S/CLoginKRReq')
var CLoginEUReq = require('../Core/S4League/Auth/C2S/CLoginEUReq')

// Auth S2C
var SLoginKRAck = require('../Core/S4League/Auth/S2C/SLoginKRAck')
var SLoginEUAck = require('../Core/S4League/Auth/S2C/SLoginEUAck')

// Game C2S
var CLoginRequestReq = require('../Core/S4League/Game/C2S/CLoginRequestReq')
var CChannelEnterReq = require('../Core/S4League/Game/C2S/CChannelEnterReq')
var CChannelInfoReq = require('../Core/S4League/Game/C2S/CChannelInfoReq')
var CCharacterFirstCreateReq = require('../Core/S4League/Game/C2S/CCharacterFirstCreateReq')
var CAdminActionReq = require('../Core/S4League/Game/C2S/CAdminActionReq')
var CNickCheckReq = require('../Core/S4League/Game/C2S/CNickCheckReq')
var CPlayerInfoReq = require('../Core/S4League/Game/C2S/CPlayerInfoReq')
var CPlayerFindInfoReq = require('../Core/S4League/Game/C2S/CPlayerFindInfoReq')
var CClubOtherClubinfoReq = require('../Core/S4League/Game/C2S/CClubOtherClubinfoReq')
var CClubCreateReq = require('../Core/S4League/Game/C2S/CClubCreateReq')
var CClubClubInfoReq2 = require('../Core/S4League/Game/C2S/CClubClubInfoReq2')
var CClubRankListReq = require('../Core/S4League/Game/C2S/CClubRankListReq')
var CClubInfoReq = require('../Core/S4League/Game/C2S/CClubInfoReq')
var CMatchClubMarkReq = require('../Core/S4League/Game/C2S/CClubInfoReq')
var CCheckHashKeyValueReq = require('../Core/S4League/Game/C2S/CCheckHashKeyValueReq')
var CDummyReq = require('../Core/S4League/Game/C2S/CDummyReq')
var CBattleyeC2SDataReq = require('../Core/S4League/Game/C2S/CBattleyeC2SDataReq')
var CClubUnjoinerListReq = require('../Core/S4League/Game/C2S/CClubUnjoinerListReq')
var CClubAdminJoinCommandReq = require('../Core/S4League/Game/C2S/CClubAdminJoinCommandReq')

var CClubInfoByIDReq = require('../Core/S4League/Game/C2S/CClubInfoByIDReq')
var CClubInfoByNameReq = require('../Core/S4League/Game/C2S/CClubInfoByNameReq')
var CClubStuffListReq = require('../Core/S4League/Game/C2S/CClubStuffListReq')

// Game S2C
var SLoginRequestAck = require('../Core/S4League/Game/S2C/SLoginRequestAck')
var SRoomListInfoAck2 = require('../Core/S4League/Game/S2C/SRoomListInfoAck2')
var SServerResultAck = require('../Core/S4League/Game/S2C/SServerResultAck')
var SAdminActionAck = require('../Core/S4League/Game/S2C/SAdminActionAck')
var SClubCreateAck = require('../Core/S4League/Game/S2C/SClubCreateAck')
var SClubInfoAck = require('../Core/S4League/Game/S2C/SClubInfoAck')
var SClubClubInfoAck2 = require('../Core/S4League/Game/S2C/SClubClubInfoAck2')
var SClubOtherClubinfoAck = require('../Core/S4League/Game/S2C/SClubOtherClubinfoAck')
var SClubNoticeRecordRefreshAck = require('../Core/S4League/Game/S2C/SClubNoticeRecordRefreshAck')
var SBattleyeS2CDataAck = require('../Core/S4League/Game/S2C/SBattleyeS2CDataAck')
var SClubUnjoinerListAck = require('../Core/S4League/Game/S2C/SClubUnjoinerListAck')
var SClubAdminJoinCommandAck = require('../Core/S4League/Game/S2C/SClubAdminJoinCommandAck')
var SPlayerKickMessageAck = require('../Core/S4League/Game/S2C/SPlayerKickMessageAck')
var SEACS2CDataAck = require('../Core/S4League/Game/S2C/SEACS2CDataAck')

// Chat C2S
var CLoginReq = require('../Core/S4League/Chat/C2S/CLoginReq')
var CMessageWhisperChatReq = require('../Core/S4League/Chat/C2S/CMessageWhisperChatReq')
var CFriendActionReq = require('../Core/S4League/Chat/C2S/CFriendActionReq')
var CDenyActionReq = require('../Core/S4League/Chat/C2S/CDenyActionReq')
var CClubMemberListReq = require('../Core/S4League/Chat/C2S/CClubMemberListReq')
var CUserDataOneReq = require('../Core/S4League/Chat/C2S/CUserDataOneReq')
var CClubClubMemberInfoReq2 = require('../Core/S4League/Chat/C2S/CClubClubMemberInfoReq2')
var CClubMemberListReq2 = require('../Core/S4League/Chat/C2S/CClubMemberListReq2')

// Chat S2C
var SLoginAck = require('../Core/S4League/Chat/S2C/SLoginAck')
var SMessageChatAck = require('../Core/S4League/Chat/S2C/SMessageChatAck')
var SMessageWhisperChatAck = require('../Core/S4League/Chat/S2C/SMessageWhisperChatAck')
var SFriendListAck = require('../Core/S4League/Chat/S2C/SFriendListAck')
var SFriendActionAck = require('../Core/S4League/Chat/S2C/SFriendActionAck')
var SCombiListAck = require('../Core/S4League/Chat/S2C/SCombiListAck')
var SCombiActionAck = require('../Core/S4League/Chat/S2C/SCombiActionAck')
var SDenyListAck = require('../Core/S4League/Chat/S2C/SDenyListAck')
var SDenyActionAck = require('../Core/S4League/Chat/S2C/SDenyActionAck')
var SChannelPlayerListAck = require('../Core/S4League/Chat/S2C/SChannelPlayerListAck')
var SChannelEnterPlayerAck = require('../Core/S4League/Chat/S2C/SChannelEnterPlayerAck')
var SChannelLeavePlayerAck = require('../Core/S4League/Chat/S2C/SChannelLeavePlayerAck')
var SChannelPlayerNameTagListAck = require('../Core/S4League/Chat/S2C/SChannelPlayerNameTagListAck')
var SPlayerPositionAck = require('../Core/S4League/Chat/S2C/SPlayerPositionAck')
var SPlayerInfoAck = require('../Core/S4League/Chat/S2C/SPlayerInfoAck')
var SPlayerPlayerInfoListAck = require('../Core/S4League/Chat/S2C/SPlayerPlayerInfoListAck')
var SNoteCountAck = require('../Core/S4League/Chat/S2C/SNoteCountAck')
var SClanMemberListAck = require('../Core/S4League/Chat/S2C/SClanMemberListAck')
var SClubMemberLoginStateAck = require('../Core/S4League/Chat/S2C/SClubMemberLoginStateAck')
var SClubSystemMessage = require('../Core/S4League/Chat/S2C/SClubSystemMessage')
var SClubNewsRemind = require('../Core/S4League/Chat/S2C/SClubNewsRemind')
var UserDataTwoReq = require('../Core/S4League/Chat/S2C/UserDataTwoReq')
var SUserDataFourAck = require('../Core/S4League/Chat/S2C/SUserDataFourAck')

var log = new Logger('Client', true)

var aeriaAccToken = ''
var accountId = ''
var hourAdd = 1
var sessionId = ''
var accessToken = ''
var refreshToken = ''
var expireDate = ''
var name = '' // TODO: Do we really need it for the ChatServer?
var resourceChecksum = '54a09c9d76e4ab1dbf418cc147e98562'

process.on('StartToken', function() {
	//return process.emit('TokenDone')

	log.debug('Getting Token from AeriaGames...')

	AeriaGamesUtils.authorize(Config.user, Config.password, function(err, result) {
		if(err) {
			log.error(err)
		}

		log.debug('Token successfully generated')

		aeriaAccToken = result

		process.emit('TokenDone')
	})
})

process.on('TokenDone', function() {
	log.debug('Starting AuthClient...')

	var authClient = new ProudNetClient({
		protocolVersion: Common.AuthProtocolVersion
	})

	authClient.connect(Config.auth.port, Config.auth.ip, function() {
		log.debug('Connected to ' + Config.auth.ip + ':' + Config.auth.port)
	})

	authClient.on('connect', function() {
		log.debug('Token: ' + aeriaAccToken)
		authClient.send(AuthOPCode.CLoginEUReq, CLoginEUReq.serialize('', '', '', '', resourceChecksum, 0, 0, 0, '', 0, '', '', aeriaAccToken, '', '', ''))
		log.debug('Packet Sent [CLoginEUReq]')

		//authClient.send(AuthOPCode.CLoginKRReq, CLoginKRReq.serialize('', '', '', 0, 3, 0))
		//log.debug('Packet Sent [CLoginKRReq]')
	})

	authClient.on('packet', function(opCode, packet) {
		if(opCode === AuthOPCode.SLoginKRAck) {
			log.debug('Packet Received [SLoginKRAck]')
			var packet = SLoginKRAck.deserialize(packet)

			log.debug('Account ID: ' + packet.accountId)
			log.debug('Account ID 2: ' + packet.accountId2)
			log.debug('Unk 1: ' + packet.unk1)
			log.debug('Session ID: ' + packet.sessionId)
			log.debug('Result: ' + AuthLoginResult.getKeyByValue(packet.result))
			log.debug('Unk 2: ' + packet.unk2)
			log.debug('Unk 3: ' + packet.unk3)
			log.debug('Unk 4: ' + packet.unk4)
			log.debug('Access Token: ' + packet.accessToken)
			log.debug('Refresh Token: ' + packet.refreshToken)
			log.debug('Expire Date: ' + packet.expireDate)

			if(packet.result === AuthLoginResult.OK) {
				accountId = packet.accountId
				hourAdd = packet.unk1
				sessionId = packet.sessionId
				accessToken = packet.accessToken
				refreshToken = packet.refreshToken
				expireDate = packet.expireDate

				//log.info('Auth Login Done')

				authClient.destroy()
				process.emit('AuthDone')
			} else {
				authClient.destroy()
				process.emit('StartToken')
			}
		} else if(opCode === AuthOPCode.SLoginEUAck) {
			log.debug('Packet Received [SLoginEUAck]')
			var packet = SLoginEUAck.deserialize(packet)

			//log.debug('Account ID: ' + packet.accountId)
			//log.debug('Account ID 2: ' + packet.accountId2)
			log.debug('Hour Add: ' + packet.unk1)
			log.debug('Session ID: ' + packet.sessionId)
			log.debug('Result: ' + AuthLoginResult.getKeyByValue(packet.result))
			//log.debug('Unk 2: ' + packet.unk2)
			//log.debug('Unk 3: ' + packet.unk3)
			//log.debug('Unk 4: ' + packet.unk4)
			log.debug('Access Token: ' + packet.accessToken)
			log.debug('Refresh Token: ' + packet.refreshToken)
			log.debug('Expire Date: ' + packet.expireDate)

			if(packet.result === AuthLoginResult.OK) {
				accountId = packet.accountId
				hourAdd = packet.unk1
				sessionId = packet.sessionId
				token1 = packet.token1
				token2 = packet.token2
				token3 = packet.token3

				//log.info('Auth Login Done')

				authClient.destroy()
				process.emit('AuthDone')
			} else {
				authClient.destroy()
				process.emit('StartToken')
			}
		} else {
			//log.warning('Packet received: [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
			//log.debug(Packet.dump(packet.readRemaining()))
		}
	})

	authClient.on('error', function(e) {
		if(e.code == 'ECONNRESET') {
			log.error('Connection abnormally closed')
		} else if(e.code == 'ECONNREFUSED') {
			log.error('Connection refused. Server down?')
		} else {
			log.error('Unhandled error occured: ' + e.code)
		}
	})

	authClient.on('close', function() {
		log.info('Connection closed')
	})
})

function createAccount(gameClient, name) {
	var unk = Buffer.from([0x01, 0x00, 0x00, 0x00, 0x45, 0x42, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x68, 0x90, 0x0f, 0x00, 0x78, 0xb7, 0x0f, 0x00, 0x88, 0xde, 0x0f, 0x00, 0x96, 0x05, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
	gameClient.send(GameOPCode.CCharacterFirstCreateReq, CCharacterFirstCreateReq.serialize(name, unk))
	log.debug('Packet Sent [CCharacterFirstCreateReq]')
}

process.on('AuthDone', function() {
	log.debug('Starting GameClient...')

	var gameClient = new ProudNetClient({
		protocolVersion: Common.GameProtocolVersion
	})

	gameClient.connect(Config.game.port, Config.game.ip, function() {
		log.info('Connected to ' + Config.game.ip + ':' + Config.game.port)
	})

	gameClient.on('connect', function() {
		var version = null
		//if (Config.target === 'sa') {
		//	version = Common.LatinoGameVersion
		//}
		gameClient.send(GameOPCode.CLoginRequestReq, CLoginRequestReq.serialize(0, '', accountId, sessionId, 1593901313, true, '', 0, '', accessToken, refreshToken, expireDate, hourAdd, version))
		log.debug('Packet Sent [CLoginRequestReq]')
	})

	gameClient.on('packet', function(opCode, packet) {
		if(opCode === GameOPCode.SLoginRequestAck) {
			log.debug('Packet Received [SLoginRequestAck]')
			var packet = SLoginRequestAck.deserialize(packet)

			log.debug('Account ID: ' + packet.accountId)
			log.debug('Result: ' + GameLoginResult.getKeyByValue(packet.result))
			log.debug('Unk 1: ' + packet.unk1)
			log.debug('Unk 2: ' + packet.unk2)
			log.debug('Unk 3: ' + packet.unk3)
			log.debug('Unk 4: ' + packet.unk4)

			if(packet.result === GameLoginResult.OK) {
				//log.info('Game Login Done')

				//gameClient.send(GameOPCode.CChannelEnterReq, CChannelEnterReq.serialize(9))
				//log.debug('Packet Sent [CChannelEnterReq]')

				//var packet = new Packet()
				//packet.writeUInt32LE(928029)
				//gameClient.send(GameOPCode.CClubClubInfoReq2, packet.data.toBuffer())
				//log.info('Packet Sent [CClubClubInfoReq2]')

				//gameClient.send(GameOPCode.CClubSearchReq2, packet.data.toBuffer())
				//log.info('Packet Sent [CClubSearchReq2]')

				//gameClient.send(GameOPCode.CAdminShowWindowReq, Buffer.alloc(0))
				//log.info('Packet Sent [CAdminShowWindowReq]')

				//for (i = 0; i < 100000; i++) {
					//gameClient.send(GameOPCode.CAdminActionReq, CAdminActionReq.serialize('/whole_notice Hi'))
					//log.info('Packet Sent [CAdminActionReq]')
				//}

				setTimeout(function() {
					/*
					gameClient.send(GameOPCode.CPlayerInfoReq, CPlayerInfoReq.serialize(7561406))
					log.debug('Packet Sent [CPlayerInfoReq]')

					gameClient.send(GameOPCode.CPlayerInfoReq, CPlayerInfoReq.serialize(12364808))
					log.debug('Packet Sent [CPlayerInfoReq]')

					gameClient.send(GameOPCode.CPlayerInfoReq, CPlayerInfoReq.serialize(10170876))
					log.debug('Packet Sent [CPlayerInfoReq]')
					*/

					/*
					gameClient.send(GameOPCode.CPlayerFindInfoReq, CPlayerFindInfoReq.serialize('Mels.'))
					log.debug('Packet Sent [CPlayerFindInfoReq]')

					gameClient.send(GameOPCode.CPlayerFindInfoReq, CPlayerFindInfoReq.serialize('Erotic.Desires'))
					log.debug('Packet Sent [CPlayerFindInfoReq]')

					gameClient.send(GameOPCode.CPlayerFindInfoReq, CPlayerFindInfoReq.serialize('sametio01'))
					log.debug('Packet Sent [CPlayerFindInfoReq]')
					*/

					/*
					var markId = '8-19-35'
					var name = 'Aether---'
					var description = 'Hi.'
					var activityArea = 1
					var activityPurpose = 1
					var question1 = '1'
					var question2 = '2'
					var question3 = '3'
					var question4 = '4'
					var question5 = '5'

					gameClient.send(GameOPCode.CClubCreateReq, CClubCreateReq.serialize(markId, name, description, activityArea, activityPurpose, question1, question2, question3, question4, question5))
					log.debug('Packet Sent [CClubCreateReq]')
					*/

					//gameClient.send(GameOPCode.CClubRankListReq, CClubRankListReq.serialize(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x96, 0x00, 0x00, 0x00])))
					//log.debug('Packet Sent [CClubRankListReq]')

					//gameClient.send(GameOPCode.CClubOtherClubinfoReq, CClubOtherClubinfoReq.serialize('HITnRUN'))
					//log.debug('Packet Sent [CClubOtherClubinfoReq]')

					//gameClient.send(GameOPCode.CClubClubInfoReq2, CClubClubInfoReq2.serialize(1))
					//log.debug('Packet Sent [CClubClubInfoReq2]')

					//gameClient.send(GameOPCode.CNickCheckReq, CNickCheckReq.serialize('Aiyshi'))
					//log.debug('Packet Sent [CNickCheckReq]')

					//gameClient.send(GameOPCode.CClubClubInfoReq2, CClubClubInfoReq2.serialize(965528))
					//log.debug('Packet Sent [CClubClubInfoReq2]')

					//gameClient.send(GameOPCode.CClubInfoReq, CClubInfoReq.serialize(965528))
					//log.debug('Packet Sent [CClubInfoReq]')

					//gameClient.send(GameOPCode.CMatchClubMarkReq, CMatchClubMarkReq.serialize(382885))
					//log.debug('Packet Sent [CMatchClubMarkReq]')

					//gameClient.send(GameOPCode.CCheckHashKeyValueReq, CCheckHashKeyValueReq.serialize('a551e092679baf80e2e54dc77112d912'))
					//log.debug('Packet Sent [CCheckHashKeyValueReq]')

					//gameClient.send(GameOPCode.CDummyReq, CDummyReq.serialize(15541176, 0))
					//log.debug('Packet Sent [CDummyReq]')

					//gameClient.send(GameOPCode.CDummyReq, CDummyReq.serialize(15541176, 0))
					//log.debug('Packet Sent [CDummyReq]')


					//gameClient.send(GameOPCode.CPlayerInfoReq, CPlayerInfoReq.serialize(15541176))
					//log.debug('Packet Sent [CPlayerInfoReq]')

					//gameClient.send(GameOPCode.CPlayerInfoReq, CPlayerInfoReq.serialize(15541176))
					//log.debug('Packet Sent [CPlayerInfoReq]')

					//gameClient.send(GameOPCode.CClubOtherClubinfoReq, CClubOtherClubinfoReq.serialize('Yeezy Season'))
					//log.debug('Packet Sent [CClubOtherClubinfoReq]')

					//gameClient.send(GameOPCode.CClubUnjoinerListReq, CClubUnjoinerListReq.serialize(808727))
					//log.debug('Packet Sent [CClubUnjoinerListReq]')

					//gameClient.send(GameOPCode.CClubInfoByIDReq, CClubInfoByIDReq.serialize("291409"))
					//log.debug('Packet Sent [CClubInfoByIDReq]')

					//gameClient.send(GameOPCode.CClubInfoByNameReq, CClubInfoByNameReq.serialize("EliteOS"))
					//log.debug('Packet Sent [CClubInfoByNameReq]')
					
					//gameClient.send(GameOPCode.CClubStuffListReq, CClubStuffListReq.serialize(291409))
					//log.debug('Packet Sent [CClubStuffListReq]')

					gameClient.send(GameOPCode.CAdminActionReq, CAdminActionReq.serialize('/chg ABCD'))
					log.debug('Packet Sent [CAdminActionReq]')
				}, 5000)

				process.emit('GameDone')
			} else if(packet.result === GameLoginResult.NewAccount) {
				var name = 'TestXYZ'
				createAccount(gameClient, name)
			} else {
				gameClient.destroy()
				process.emit('StartToken')
			}
		} else if(opCode === GameOPCode.SClubUnjoinerListAck) {
			log.debug('Packet Received [SClubUnjoinerListAck]')
			var packet = SClubUnjoinerListAck.deserialize(packet)

			//log.debug(util.inspect(packet, { showHidden: false, depth: null }))

			var toUnblock = []

			log.debug('Unjoiners Count: ' + packet.unjoiners.length)
			for (var i = 0; i < packet.unjoiners.length; i++) {
				var unjoiner = packet.unjoiners[i]
				log.debug('Account ID: ' + unjoiner.playerId + ' Name: ' + unjoiner.name + ' Type: ' + unjoiner.type)

				if(unjoiner.type == 3) {
					toUnblock.push(unjoiner.playerId)
				}
			}

			log.debug('Blocked: ' + toUnblock.length)

			//gameClient.send(GameOPCode.CClubAdminJoinCommandReq, CClubAdminJoinCommandReq.serialize(5, toUnblock))
			//log.debug('Packet Sent [CClubAdminJoinCommandReq]')
		} else if(opCode === GameOPCode.SClubAdminJoinCommandAck) {
			log.debug('Packet Received [SClubAdminJoinCommandAck]')
			var packet = SClubAdminJoinCommandAck.deserialize(packet)
			//log.info('Result: ' + packet.result + ' Text: ' + packet.text)

			log.debug(util.inspect(packet, { showHidden: false, depth: null }))
		} else if(opCode === GameOPCode.SServerResultAck) {
			log.debug('Packet Received [SServerResultAck]')
			var packet = SServerResultAck.deserialize(packet)

			log.debug('Result: ' + ServerResult.getKeyByValue(packet.result))

			if(packet.result === ServerResult.ChannelLimitExceed) {
				setTimeout(function() {
					gameClient.send(GameOPCode.CChannelEnterReq, CChannelEnterReq.serialize(9))
					log.debug('Packet Sent [CChannelEnterReq]')
				}, 100)
			} else if(packet.result === ServerResult.ChannelEnter) {
				gameClient.send(GameOPCode.CChannelInfoReq, CChannelInfoReq.serialize(ChannelInfoType.Room))
				log.debug('Packet Sent [CChannelInfoReq]')
			}
		} else if(opCode === GameOPCode.SRoomListInfoAck2) {
			//log.debug('Packet Received [SRoomListInfoAck2]')
			var packet = SRoomListInfoAck2.deserialize(packet)

			var rooms = packet.rooms

			//log.debug('Rooms Count: ' + rooms.length)
			for (var i = 0; i < rooms.length; i++) {
				var room = rooms[i]
				//log.debug('ID: ' + room.id + ' Name: ' + room.name + ' Password: ' + room.password)
			}
		} else if(opCode === GameOPCode.SAdminActionAck) {
			log.debug('Packet Received [SAdminActionAck]')
			var packet = SAdminActionAck.deserialize(packet)
			log.info('Result: ' + packet.result + ' Text: ' + packet.text)
		} else if(opCode === GameOPCode.SClubCreateAck) {
			//log.debug('Packet Received [SClubCreateAck]')
			var packet = SClubCreateAck.deserialize(packet)

			//log.debug('Result: ' + ClubCreateResult.getKeyByValue(packet.result))
		} else if(opCode === GameOPCode.SClubInfoAck) {
			log.debug('Packet Received [SClubInfoAck]')
			var packet = SClubInfoAck.deserialize(packet)

			log.debug(util.inspect(packet, { showHidden: false, depth: null }))
		} else if(opCode === GameOPCode.SClubClubInfoAck2) {
			log.debug('Packet Received [SClubClubInfoAck2]')
			var packet = SClubClubInfoAck2.deserialize(packet)
			
			console.log(packet)
		} else if(opCode === GameOPCode.SClubOtherClubinfoAck) {
			log.debug('Packet Received [SClubOtherClubinfoAck]')
			var packet = SClubOtherClubinfoAck.deserialize(packet)

			log.debug(util.inspect(packet, { showHidden: false, depth: null }))
		} else if(opCode === GameOPCode.SClubNoticeRecordRefreshAck) {
			log.debug('Packet Received [SClubNoticeRecordRefreshAck]')
			var packet = SClubNoticeRecordRefreshAck.deserialize(packet)

			log.debug(util.inspect(packet, { showHidden: false, depth: null }))
		} else if(opCode === GameOPCode.SPlayerKickMessageAck) {
			log.debug('Packet Received [SPlayerKickMessageAck]')
			var packet = SPlayerKickMessageAck.deserialize(packet)

			log.debug('Result: ' + packet.result)
			log.debug('Text: ' + packet.text)
		} else if(opCode === GameOPCode.SEACS2CDataAck) {
			log.debug('Packet Received [SEACS2CDataAck]')
			var packet = SEACS2CDataAck.deserialize(packet)

			log.debug(Packet.dump(packet.data))

		} else if(opCode === GameOPCode.SBattleyeS2CDataAck) {
			log.debug('Packet Received [SBattleyeS2CDataAck]')
			var packet = SBattleyeS2CDataAck.deserialize(packet)

			console.log(packet)

			if(packet.opcode === 1) {
				log.debug('[BattlEye] Answer Welcome')
				gameClient.send(GameOPCode.CBattleyeC2SDataReq, CBattleyeC2SDataReq.serialize(2, Buffer.from([0x00, 0x04])))
				log.debug('Packet Sent [CBattleyeC2SDataReq]')
			} else if(packet.opcode === 2) {
				log.debug('[BattlEye] 2')
				if(Buffer.from([0x03, 0x00]).equals(packet.data)) {
					console.log('YAY')
					gameClient.send(GameOPCode.CBattleyeC2SDataReq, CBattleyeC2SDataReq.serialize(5, Buffer.from([0x03, 0x00, 0x00, 0x00, 0x00])))
					log.debug('Packet Sent [CBattleyeC2SDataReq]')
				}
				
			} else if(packet.opcode === 3) {
				log.debug('[BattlEye] Heartbeat')
				gameClient.send(GameOPCode.CBattleyeC2SDataReq, CBattleyeC2SDataReq.serialize(3, packet.data))
				log.debug('Packet Sent [CBattleyeC2SDataReq]')
			} else if(packet.opcode === 14) {
				log.debug('[BattlEye] 14')
				gameClient.send(GameOPCode.CBattleyeC2SDataReq, CBattleyeC2SDataReq.serialize(2, Buffer.from([0x01, 0x07]))) // 01 01 would be DC here
				log.debug('Packet Sent [CBattleyeC2SDataReq]')
			} else if(packet.opcode === 35) {
				log.debug('[BattlEye] 35')
				gameClient.send(GameOPCode.CBattleyeC2SDataReq, CBattleyeC2SDataReq.serialize(2, Buffer.from([0x02, 0x00])))
				log.debug('Packet Sent [CBattleyeC2SDataReq]')
			} else {
				log.warning('Unknown BattlEye OpCode received: ' + packet.opcode)
			}
		} else {
			log.warning('Packet received: [' + GameOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
			log.debug(Packet.dump(packet.readRemaining()))
		}
	})

	gameClient.on('error', function(e) {
		if(e.code == 'ECONNRESET') {
			log.error('Connection abnormally closed')
		} else if(e.code == 'ECONNREFUSED') {
			log.error('Connection refused. Server down?')
		} else {
			log.error('Unhandled error occured: ' + e.code)
		}
	})

	gameClient.on('close', function() {
		log.info('Connection closed')
	})
})

process.on('GameDone', function() {
	log.debug('Starting ChatClient...')

	var chatClient = new ProudNetClient({
		protocolVersion: Common.ChatProtocolVersion
	})

	chatClient.connect(Config.chat.port, Config.chat.ip, function() {
		log.info('Connected to ' + Config.chat.ip + ':' + Config.chat.port)
	})

	chatClient.on('connect', function() {
		chatClient.send(ChatOPCode.CLoginReq, CLoginReq.serialize(accountId, name, sessionId, hourAdd))
		log.debug('Packet Sent [CLoginReq]')
	})

	chatClient.on('packet', function(opCode, packet) {
		if(opCode === ChatOPCode.SLoginAck) {
			log.debug('Packet Received [SLoginAck]')
			var packet = SLoginAck.deserialize(packet)

			log.debug('Result: ' + ChatLoginResult.getKeyByValue(packet.result))

			if(packet.result === ChatLoginResult.OK) {
				//log.info('Chat Login Done')

				process.emit('ChatDone')

				/*
				var packet = new Packet()
				packet.writeUInt32LE(928029)
				chatClient.send(ChatOPCode.CClubMemberListReq, packet.data.toBuffer())
				log.info('Packet Sent [CClubMemberListReq]')

				chatClient.send(ChatOPCode.CClubClubMemberInfoReq2, packet.data.toBuffer())
				log.info('Packet Sent [CClubClubMemberInfoReq2]')

				chatClient.send(ChatOPCode.CClubMemberListReq2, packet.data.toBuffer())
				log.info('Packet Sent [CClubMemberListReq2]')
				*/

				setTimeout(function() {
					//chatClient.send(ChatOPCode.CClubClubMemberInfoReq2, CClubClubMemberInfoReq2.serialize(0, 3, 0))
					//log.debug('Packet Sent [CClubClubMemberInfoReq2]')

					//chatClient.send(ChatOPCode.CClubClubMemberInfoReq2, CClubClubMemberInfoReq2.serialize(808727, 3, 0))
					//log.debug('Packet Sent [CClubClubMemberInfoReq2]')

					//chatClient.send(ChatOPCode.CClubMemberListReq2, CClubMemberListReq2.serialize(808727))
					//log.debug('Packet Sent [CClubMemberListReq2]')

				}, 5000)
			} else {
				gameClient.destroy()
				chatClient.destroy()
				process.emit('StartToken')
			}
		/*
		} else if(opCode === ChatOPCode.SChannelPlayerListAck) {
			log.debug('Packet Received [SChannelPlayerListAck]')
			var packet = SChannelPlayerListAck.deserialize(packet)


		} else if(opCode === ChatOPCode.SChannelEnterPlayerAck) {
			log.debug('Packet Received [SChannelEnterPlayerAck]')
			var packet = SChannelEnterPlayerAck.deserialize(packet)

			log.debug('Account ID: ' + packet.accountId)
			log.debug('Name: ' + packet.name)
			log.debug('Unk: ' + packet.unk)
			log.debug('EXP: ' + packet.exp)
			log.debug('Is GM: ' + packet.isGM)

			//chatClient.send(ChatOPCode.CUserDataOneReq, CUserDataOneReq.serialize(packet.accountId))
			//log.debug('Packet Sent [CUserDataOneReq]')
		} else if(opCode === ChatOPCode.SChannelLeavePlayerAck) {
			log.debug('Packet Received [SChannelLeavePlayerAck]')
			var packet = SChannelLeavePlayerAck.deserialize(packet)

			log.debug('Account ID: ' + packet.accountId)

			//chatClient.send(ChatOPCode.CUserDataOneReq, CUserDataOneReq.serialize(packet.accountId))
			//log.debug('Packet Sent [CUserDataOneReq]')
		} else if(opCode === ChatOPCode.SChannelPlayerNameTagListAck) {
			log.debug('Packet Received [SChannelPlayerNameTagListAck]')
			var packet = SChannelPlayerNameTagListAck.deserialize(packet)
		} else if(opCode === ChatOPCode.SPlayerInfoAck) {
			log.debug('Packet Received [SPlayerInfoAck]')
			var packet = SPlayerInfoAck.deserialize(packet)

			log.debug('Account ID: ' + packet.accountId)
			log.debug('Name: ' + packet.name)
			log.debug('Unk 1: ' + packet.unk1)
			log.debug('EXP: ' + packet.exp)
			log.debug('Is GM: ' + packet.isGM)
			log.debug('Server: ' + packet.server)
			log.debug('Channel: ' + packet.channel)
			log.debug('Room: ' + packet.room)
			log.debug('Clan ID: ' + packet.clanId)
			log.debug('Unk 2: ' + packet.unk2)
			log.debug('Unk 3: ' + packet.unk3)
		} else if(opCode === ChatOPCode.SMessageChatAck) {
			log.debug('Packet Received [SMessageChatAck]')
			var packet = SMessageChatAck.deserialize(packet)

			log.debug('Clan: ' + packet.clan)
			log.debug('Account ID: ' + packet.accountId)
			log.debug('Name: ' + packet.name)
			log.debug('Message: ' + packet.message)
		} else if(opCode === ChatOPCode.SMessageWhisperChatAck) {
			log.debug('Packet Received [SMessageWhisperChatAck]')
			var packet = SMessageWhisperChatAck.deserialize(packet)

			log.debug('Result: ' + MessageWhisperChatResult.getKeyByValue(packet.result))
			log.debug('Receiver Name: ' + packet.receiverName)
			log.debug('Sender Player ID: ' + packet.senderPlayerId)
			log.debug('Sender Name: ' + packet.senderName)
			log.debug('Message: ' + packet.message)
		} else if(opCode === ChatOPCode.SFriendListAck) {
			log.debug('Packet Received [SFriendListAck]')
			var packet = SFriendListAck.deserialize(packet)

			var friends = packet.friends

			log.debug('Friends Count: ' + friends.length)
			for (var i = 0; i < friends.length; i++) {
				var friend = friends[i]
				log.debug('Account ID: ' + friend.accountId)
				log.debug('Name: ' + friend.name)
				log.debug('Type: ' + friend.type)
				log.debug('Unk: ' + friend.unk)
				log.debug('---------------------------------')
			}
		} else if(opCode === ChatOPCode.SFriendActionAck) {
			log.debug('Packet Received [SFriendActionAck]')
			var packet = SFriendActionAck.deserialize(packet)

			log.debug('Unk 1: ' + packet.unk1)
			log.debug('Result: ' + packet.result)
			log.debug('Account ID: ' + packet.accountId)
			log.debug('Name: ' + packet.name)
			log.debug('Action: ' + packet.action)
			log.debug('Unk 2: ' + packet.unk2)
		} else if(opCode === ChatOPCode.SCombiListAck) {
			log.debug('Packet Received [SCombiListAck]')
			var packet = SCombiListAck.deserialize(packet)
		} else if(opCode === ChatOPCode.SCombiActionAck) {
			log.debug('Packet Received [SCombiActionAck]')
			var packet = SCombiActionAck.deserialize(packet)
		} else if(opCode === ChatOPCode.SDenyListAck) {
			log.debug('Packet Received [SDenyListAck]')
			var packet = SDenyListAck.deserialize(packet)

			var denies = packet.denies

			log.debug('Denies Count: ' + denies.length)
			for (var i = 0; i < denies.length; i++) {
				var deny = denies[i]
				log.debug('Account ID: ' + deny.accountId)
				log.debug('Name: ' + deny.name)
				log.debug('---------------------------------')
			}
		} else if(opCode === ChatOPCode.SDenyActionAck) {
			log.debug('Packet Received [SDenyActionAck]')
			var packet = SDenyActionAck.deserialize(packet)

			log.debug('Result: ' + packet.result)
			log.debug('Action: ' + packet.action)
			log.debug('Account ID: ' + packet.accountId)
			log.debug('Name: ' + packet.name)
		} else if(opCode === ChatOPCode.SPlayerPositionAck) {
			log.debug('Packet Received [SPlayerPositionAck]')
			var packet = SPlayerPositionAck.deserialize(packet)

			log.debug('Account ID: ' + packet.accountId)
			log.debug('Server: ' + packet.server)
			log.debug('Channel: ' + packet.channel)
			log.debug('Room: ' + packet.room)
			log.debug('Unk 1: ' + packet.unk1)
			log.debug('Unk 2: ' + packet.unk2)
			log.debug('Unk 3: ' + packet.unk3)
		} else if(opCode === ChatOPCode.SPlayerPlayerInfoListAck) {
			log.debug('Packet Received [SPlayerPlayerInfoListAck]')
			var packet = SPlayerPlayerInfoListAck.deserialize(packet)

			var players = packet.players

			log.debug('Players Count: ' + players.length)
			for (var i = 0; i < players.length; i++) {
				var player = players[i]
				log.debug('Account ID: ' + player.accountId)
				log.debug('Name: ' + player.name)
				log.debug('Unk 1: ' + player.unk1)
				log.debug('EXP: ' + player.exp)
				log.debug('Is GM: ' + player.isGM)
				log.debug('Server: ' + player.server)
				log.debug('Channel: ' + player.channel)
				log.debug('Room: ' + player.room)
				log.debug('Clan ID: ' + player.clanId)
				log.debug('Unk 2: ' + player.unk2)
				log.debug('Unk 3: ' + player.unk3)
				log.debug('---------------------------------')
			}
		} else if(opCode === ChatOPCode.SNoteCountAck) {
			//log.debug('Packet Received [SNoteCountAck]')
			//var packet = SNoteCountAck.deserialize(packet)
		} else if(opCode === ChatOPCode.SClubMemberLoginStateAck) {
			//log.debug('Packet Received [SClubMemberLoginStateAck]')
			//var packet = SClubMemberLoginStateAck.deserialize(packet)
		} else if(opCode === ChatOPCode.SClubSystemMessage) {
			//log.debug('Packet Received [SClubSystemMessage]')
			//var packet = SClubSystemMessage.deserialize(packet)
		} else if(opCode === ChatOPCode.SClubNewsRemind) {
			//log.debug('Packet Received [SClubNewsRemind]')
			//var packet = SClubNewsRemind.deserialize(packet)
		} else if(opCode === ChatOPCode.SClanMemberListAck) {
			log.debug('Packet Received [SClanMemberListAck]')
			var packet = SClanMemberListAck.deserialize(packet)

			var members = packet.members

			log.debug('Member Count: ' + members.length)
			for (var i = 0; i < members.length; i++) {
				var member = members[i]
				log.debug('Account ID: ' + member.accountId)
				log.debug('Name: ' + member.name)
				log.debug('---------------------------------')
			}
		} else if(opCode === ChatOPCode.UserDataTwoReq) {
			log.debug('Packet Received [UserDataTwoReq]')
			var packet = UserDataTwoReq.deserialize(packet)
			console.log(packet)
		} else if(opCode === ChatOPCode.SUserDataFourAck) {
			log.debug('Packet Received [SUserDataFourAck]')
			//var packet = SUserDataFourAck.deserialize(packet)
			//console.log('%j', packet)
		*/
		} else {
			log.warning('Packet received: [' + ChatOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
			log.debug(Packet.dump(packet.readRemaining()))
		}
	})

	chatClient.on('error', function(e) {
		if(e.code == 'ECONNRESET') {
			log.error('Connection abnormally closed')
		} else if(e.code == 'ECONNREFUSED') {
			log.error('Connection refused. Server down?')
		} else {
			log.error('Unhandled error occured: ' + e.code)
		}
	})

	chatClient.on('close', function() {
		log.info('Connection closed')
	})
})

process.emit('StartToken')