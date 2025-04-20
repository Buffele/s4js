var AuthOPCode = require('../../Core/S4League/Auth/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var LoginResult = require('../../Core/S4League/Auth/Constants/LoginResult')

// C2S
var CLoginKRReq = require('../../Core/S4League/Auth/C2S/CLoginKRReq')
var CLoginEUReq = require('../../Core/S4League/Auth/C2S/CLoginEUReq')
var CLoginJPReq = require('../../Core/S4League/Auth/C2S/CLoginJPReq')
var CAuthInTHReq = require('../../Core/S4League/Auth/C2S/CAuthInTHReq')
var CLoginPHReq = require('../../Core/S4League/Auth/C2S/CLoginPHReq')

// S2C
var SLoginKRAck = require('../../Core/S4League/Auth/S2C/SLoginKRAck')
var SLoginEUAck = require('../../Core/S4League/Auth/S2C/SLoginEUAck')
var SLoginJPAck = require('../../Core/S4League/Auth/S2C/SLoginJPAck')
var SAuthInTHAck = require('../../Core/S4League/Auth/S2C/SAuthInTHAck')
//var SRefreshAeriaTokenInfoAck = require('../../Core/S4League/Auth/S2C/SRefreshAeriaTokenInfoAck')
var SLoginPHAck = require('../../Core/S4League/Auth/S2C/SLoginPHAck')

var log = new Logger('AuthService', true)

var AuthService = function(server, data) {
	this.server = server
	this.data = data
}

AuthService.prototype = {
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
	handleCLoginKRReq: function(session, packet) {
		log.debug('Packet Received [CLoginKRReq]')
		var packet = CLoginKRReq.deserialize(packet)

		log.debug('String 1: ' + packet.string1 + ' String 2: ' + packet.string2 + ' String 3: ' + packet.string3 + ' Unk 1: ' + packet.unk1 + ' Account ID: ' + packet.accountId + ' Unk 2: ' + packet.unk2)

		log.warning('Not implemented!')
	},
	handleCLoginEUReq: function(session, packet) {
		log.debug('Packet Received [CLoginEUReq]')
		var packet = CLoginEUReq.deserialize(packet)

		log.debug('Username: ' + packet.username)
		log.debug('Password: ' + packet.password)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Resource Checksum: ' + packet.resourceChecksum)
		log.debug('Unk 3: ' + packet.unk3)
		log.debug('Unk 4: ' + packet.unk4)
		log.debug('Unk 5: ' + packet.unk5)
		log.debug('Unk 6: ' + packet.unk6)
		log.debug('Unk 7: ' + packet.unk7)
		log.debug('Unk 8: ' + packet.unk8)
		log.debug('Unk 9: ' + packet.unk9)
		log.debug('Aeria Acc Code: ' + packet.aeriaAccCode)
		log.debug('Access Token: ' + packet.accessToken)
		log.debug('Refresh Token: ' + packet.refreshToken)
		log.debug('Expire Date: ' + packet.expireDate)

		session.accountId = this.data.globalAccountId
		this.data.globalAccountId++

		this.data.addPlayer(session)

		this.server.send(session, AuthOPCode.SLoginEUAck, SLoginEUAck.serialize(session.accountId, session.accountId, '', '1234', LoginResult.OK, '', '', '', '', '', ''))
		log.debug('Packet Sent [SLoginEUAck]')
	},
	handleCLoginJPReq: function(session, packet) {
		log.debug('Packet Received [CLoginJPReq]')
		var packet = CLoginJPReq.deserialize(packet)

		log.debug('Remaining: ' + Packet.dump(packet.remaining))

		log.warning('Not implemented!')
	},
	handleCAuthInTHReq: function(session, packet) {
		log.debug('Packet Received [CAuthInTHReq]')
		var packet = CAuthInTHReq.deserialize(packet)

		log.debug('Remaining: ' + Packet.dump(packet.remaining))

		log.warning('Not implemented!')
	},
	handleCLoginPHReq: function(session, packet) {
		log.debug('Packet Received [CLoginPHReq]')
		var packet = CLoginPHReq.deserialize(packet)

		log.debug('User ID: ' + packet.userId)
		log.debug('Unk 1: ' + packet.unk1)
		log.debug('Unk 2: ' + packet.unk2)
		log.debug('Unk 3: ' + packet.unk3)
		log.debug('Unk 4: ' + packet.unk4)
		log.debug('Unk 5: ' + packet.unk5)
		log.debug('Unk 6: ' + packet.unk6)
		log.debug('Unk 7: ' + packet.unk7)
		log.debug('Unk 8: ' + packet.unk8)
		log.debug('Unk 9: ' + packet.unk9)
		log.debug('Unk 10: ' + packet.unk10)
		log.debug('Unk 11: ' + packet.unk11)
		log.debug('Unk 12: ' + packet.unk12)
		log.debug('Unk 13: ' + packet.unk13)
		log.debug('Unk 14: ' + packet.unk14)
		log.debug('Token: ' + packet.token)

		session.accountId = this.data.globalAccountId
		this.data.globalAccountId++

		this.data.addPlayer(session)

		this.server.send(session, AuthOPCode.SLoginPHAck, SLoginPHAck.serialize(session.accountId, session.accountId, '', '1234', LoginResult.OK, '', '', '', '', '', ''))
		log.debug('Packet Sent [SLoginPHAck]')
	}
}

module.exports = AuthService