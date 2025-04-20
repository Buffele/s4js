var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var UserDataFourResult = require('../../Core/S4League/Chat/Constants/UserDataFourResult')

// C2S
var CUserDataOneReq = require('../../Core/S4League/Chat/C2S/CUserDataOneReq')
var UserDataThreeAck = require('../../Core/S4League/Chat/C2S/UserDataThreeAck')

// S2C
var UserDataTwoReq = require('../../Core/S4League/Chat/S2C/UserDataTwoReq')
var SUserDataFourAck = require('../../Core/S4League/Chat/S2C/SUserDataFourAck')

var log = new Logger('UserService', true)

var UserService = function(server, data) {
	this.server = server
	this.data = data
}

UserService.prototype = {
	handleCUserDataOneReq: function(session, packet) {
		log.debug('Packet Received [CUserDataOneReq]')
		var packet = CUserDataOneReq.deserialize(packet)

		log.debug('Account ID: ' + packet.accountId)

		var player = this.data.getPlayerByID(packet.accountId)

		if(!player) {
			return
		}

		this.server.send(player, ChatOPCode.UserDataTwoReq, UserDataTwoReq.serialize(session.accountId))
		log.debug('Packet Sent [UserDataTwoReq]')
	},
	handleUserDataThreeAck: function(session, packet) {
		log.debug('Packet Received [UserDataThreeAck]')
		var packet = UserDataThreeAck.deserialize(packet)

		log.debug('Receiver Account ID: ' + packet.receiverAccountId + ' Result: ' + packet.result)

		var player = this.data.getPlayerByID(packet.receiverAccountId)

		if(!player) {
			return
		}

		// TODO: When blocked:
		//UserDataFourResult.Blocked

		this.server.send(player, ChatOPCode.SUserDataFourAck, SUserDataFourAck.serialize(UserDataFourResult.OK, packet.userData))
		log.debug('Packet Sent [SUserDataFourAck]')
	}
}

module.exports = UserService