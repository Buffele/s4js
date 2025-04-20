var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

// C2S
var CNoteListReq = require('../../Core/S4League/Chat/C2S/CNoteListReq')
var CNoteSendReq = require('../../Core/S4League/Chat/C2S/CNoteSendReq')
var CNoteReadReq = require('../../Core/S4League/Chat/C2S/CNoteReadReq')
var CNoteDeleteReq = require('../../Core/S4League/Chat/C2S/CNoteDeleteReq')
var CNoteCountReq = require('../../Core/S4League/Chat/C2S/CNoteCountReq')
var CNoteRejectImportuneReq = require('../../Core/S4League/Chat/C2S/CNoteRejectImportuneReq')

// S2C
var SNoteListAck = require('../../Core/S4League/Chat/S2C/SNoteListAck')
var SNoteSendAck = require('../../Core/S4League/Chat/S2C/SNoteSendAck')
var SNoteReadAck = require('../../Core/S4League/Chat/S2C/SNoteReadAck')
var SNoteDeleteAck = require('../../Core/S4League/Chat/S2C/SNoteDeleteAck')
var SNoteErrorAck = require('../../Core/S4League/Chat/S2C/SNoteErrorAck')
var SNoteCountAck = require('../../Core/S4League/Chat/S2C/SNoteCountAck')
var SNoteRejectImportuneAck = require('../../Core/S4League/Chat/S2C/SNoteRejectImportuneAck')

var log = new Logger('NoteService', true)

var NoteService = function(server) {
	this.server = server
}

NoteService.prototype = {
	handleCNoteListReq: function(session, packet) {
		log.debug('Packet Received [CNoteListReq]')
		var packet = CNoteListReq.deserialize(packet)

		log.debug('Page: ' + packet.page + ' Filter: ' + packet.filter)

		var notes = [
			/*
			{
				noteId: 1,
				name: 'Scammer',
				type: 0,
				senderAccountId: 10001,
				receiverAccountId: session.accountId,
				subject: 'Free AP',
				read: 1,
				unk: 1,
				expireDays: 30
			},

			{
				noteId: 2,
				name: 'Scammer',
				type: 0,
				senderAccountId: 10001,
				receiverAccountId: session.accountId,
				subject: 'Free AP',
				read: 1,
				unk: 1,
				expireDays: 30
			},
			{
				noteId: 3,
				name: 'Scammer',
				type: 0,
				senderAccountId: 10001,
				receiverAccountId: session.accountId,
				subject: 'Free AP',
				read: 1,
				unk: 1,
				expireDays: 30
			}
			*/
		]

		this.server.send(session, ChatOPCode.SNoteListAck, SNoteListAck.serialize(1, packet.page, packet.filter, notes))
		log.debug('Packet Sent [SNoteListAck]')
	},
	handleCNoteSendReq: function(session, packet) {
		log.debug('Packet Received [CNoteSendReq]')
		var packet = CNoteSendReq.deserialize(packet)

		log.debug('Receiver: ' + packet.receiver + ' Receiver Account ID: ' + packet.receiverAccountId + ' Subject: ' + packet.subject + ' Text: ' + packet.text + ' Unk1: ' + packet.unk1 + ' Unk2: ' + packet.unk2 + ' Type: ' + packet.type)

		log.debug(Packet.dump(packet.remaining)) // TODO

		this.server.send(session, ChatOPCode.SNoteSendAck, SNoteSendAck.serialize(true))
		log.debug('Packet Sent [SNoteSendAck]')
	},
	handleCNoteReadReq: function(session, packet) {
		log.debug('Packet Received [CNoteReadReq]')
		var packet = CNoteReadReq.deserialize(packet)

		log.debug('Note ID: ' + packet.noteId)

		this.server.send(session, ChatOPCode.SNoteReadAck, SNoteReadAck.serialize(packet.noteId))
		log.debug('Packet Sent [SNoteReadAck]')
	},
	handleCNoteDeleteReq: function(session, packet) {
		log.debug('Packet Received [CNoteDeleteReq]')
		var packet = CNoteDeleteReq.deserialize(packet)

		this.server.send(session, ChatOPCode.SNoteDeleteAck, SNoteDeleteAck.serialize(packet.messages))
		log.debug('Packet Sent [SNoteDeleteAck]')

		this.server.send(session, ChatOPCode.SNoteCountAck, SNoteCountAck.serialize(0, 0, 0))
		log.debug('Packet Sent [SNoteCountAck]')
	},
	handleCNoteCountReq: function(session, packet) {
		log.debug('Packet Received [CNoteCountReq]')
		var packet = CNoteCountReq.deserialize(packet)

		log.warning('Remaining: ' + Packet.dump(packet.remaining))
	},
	handleCNoteRejectImportuneReq: function(session, packet) {
		log.debug('Packet Received [CNoteRejectImportuneReq]')
		var packet = CNoteRejectImportuneReq.deserialize(packet)

		log.warning('Remaining: ' + Packet.dump(packet.remaining))
	}
}

module.exports = NoteService