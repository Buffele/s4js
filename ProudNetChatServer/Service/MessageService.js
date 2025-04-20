var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var MessageWhisperChatResult = require('../../Core/S4League/Chat/Constants/MessageWhisperChatResult')

// C2S
var CMessageChatReq = require('../../Core/S4League/Chat/C2S/CMessageChatReq')
var CMessageWhisperChatReq = require('../../Core/S4League/Chat/C2S/CMessageWhisperChatReq')

// S2C
var SMessageChatAck = require('../../Core/S4League/Chat/S2C/SMessageChatAck')
var SMessageWhisperChatAck = require('../../Core/S4League/Chat/S2C/SMessageWhisperChatAck')

var log = new Logger('MessageService', true)

var MessageService = function(server, data) {
	this.server = server
	this.data = data
}

MessageService.prototype = {
	handleCMessageChatReq: function(session, packet) {
		log.debug('Packet Received [CMessageChatReq]')
		var packet = CMessageChatReq.deserialize(packet)

		log.debug('Clan: ' + packet.clan + ' Message: ' + packet.message)

		this.data.broadcast(ChatOPCode.SMessageChatAck, SMessageChatAck.serialize(packet.clan, session.accountId, session.name, packet.message))
		log.debug('Packet Sent [SMessageChatAck]')
	},
	handleCMessageWhisperChatReq: function(session, packet) {
		log.debug('Packet Received [CMessageWhisperChatReq]')
		var packet = CMessageWhisperChatReq.deserialize(packet)

		log.debug('Receiver: ' + packet.receiver + ' Message: ' + packet.message)

		var player = this.data.getPlayerByName(packet.receiver)

		if(!player || player.accountId === session.accountId) { // We don't allow whisper to yourself
			return this.server.send(session, ChatOPCode.SMessageWhisperChatAck, SMessageWhisperChatAck.serialize(MessageWhisperChatResult.ReceiverNotFound, packet.receiver, session.accountId, session.name, packet.message))
		}

		this.server.send(player, ChatOPCode.SMessageWhisperChatAck, SMessageWhisperChatAck.serialize(MessageWhisperChatResult.OK, player.name, session.accountId, session.name, packet.message))
	}
}

module.exports = MessageService