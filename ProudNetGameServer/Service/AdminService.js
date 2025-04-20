var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var AdminActionResult = require('../../Core/S4League/Game/Constants/AdminActionResult')
var AdminCommand = require('../../Core/S4League/Game/Constants/AdminCommand')

// C2S
var CAdminShowWindowReq = require('../../Core/S4League/Game/C2S/CAdminShowWindowReq')
var CAdminActionReq = require('../../Core/S4League/Game/C2S/CAdminActionReq')

// S2C
var SAdminShowWindowAck = require('../../Core/S4League/Game/S2C/SAdminShowWindowAck')
var SNoticeAdminMessageAck = require('../../Core/S4League/Game/S2C/SNoticeAdminMessageAck')
var SAdminChangeHPAck = require('../../Core/S4League/Game/S2C/SAdminChangeHPAck')
var SAdminChangeMPAck = require('../../Core/S4League/Game/S2C/SAdminChangeMPAck')
var SLogDevLogStartAck = require('../../Core/S4League/Game/S2C/SLogDevLogStartAck')
var SAdminActionAck = require('../../Core/S4League/Game/S2C/SAdminActionAck')

var SInGameItemDropAck = require('../../Core/S4League/Game/S2C/SInGameItemDropAck')
var SInGameItemGetAck = require('../../Core/S4League/Game/S2C/SInGameItemGetAck')

var log = new Logger('AdminService', true)

var AdminService = function(server, data, roomManager) {
	this.server = server
	this.data = data
	this.roomManager = roomManager
}

AdminService.prototype = {
	handleCAdminShowWindowReq: function(session, packet) {
		log.debug('Packet Received [CAdminShowWindowReq]')
		var packet = CAdminShowWindowReq.deserialize(packet)

		this.server.send(session, GameOPCode.SAdminShowWindowAck, SAdminShowWindowAck.serialize())
		log.debug('Packet Sent [SAdminShowWindowAck]')
	},
	handleCAdminActionReq: function(session, packet) {
		log.debug('Packet Received [CAdminActionReq]')
		var packet = CAdminActionReq.deserialize(packet)

		log.debug('Text: ' + packet.text)
		var command = packet.text.split(' ')
		var answer
		if(command[0] === AdminCommand.Ban) {
			answer = 'TODO'
		} else if(command[0] === AdminCommand.DevLog) {
			this.server.send(session, GameOPCode.SLogDevLogStartAck, SLogDevLogStartAck.serialize())
			log.debug('Packet Sent [SLogDevLogStartAck]')

			answer = 'Dev Log activated'
		} else if(command[0] === AdminCommand.Hp) {
			this.server.send(session, GameOPCode.SAdminChangeHPAck, SAdminChangeHPAck.serialize(command[1]))
			log.debug('Packet Sent [SAdminChangeHPAck]')

			answer = 'Set HP to ' + command[1]
		} else if(command[0] === AdminCommand.Kick) {
			answer = 'TODO (Dropped Buff!)'

			//for (var i = 1; i < 2/*500*/; i++) {
				this.server.send(session, GameOPCode.SInGameItemDropAck, SInGameItemDropAck.serialize(i))

				//this.server.send(session, GameOPCode.SInGameItemGetAck, SInGameItemGetAck.serialize(session.playerId, 10))
			//}
			
			log.debug('Packet Sent [SInGameItemDropAck]')
		} else if(command[0] === AdminCommand.Mp) {
			this.server.send(session, GameOPCode.SAdminChangeMPAck, SAdminChangeMPAck.serialize(command[1]))
			log.debug('Packet Sent [SAdminChangeMPAck]')

			answer = 'Set MP to ' + command[1]
		} else if(command[0] === AdminCommand.Notice) {
			var notice = ''
			for(i = 1; i < command.length; i++) {
				notice += command[i] + ' '
			}
			this.data.broadcast(GameOPCode.SNoticeAdminMessageAck, SNoticeAdminMessageAck.serialize(notice))
			log.debug('Packet Sent [SNoticeAdminMessageAck]')

			answer = 'Notice successfully sent to whole channel'
		} else if(command[0] === AdminCommand.Roomkick) {
			this.roomManager.leave(session, session.roomId, command[1])
			answer = 'Roomkick Test'
		} else if(command[0] === AdminCommand.RoomClose) {
			answer = 'TODO'
		} else if(command[0] === AdminCommand.Search) {
			answer = 'TODO'
		} else if(command[0] === AdminCommand.ShopUpdate) {
			answer = 'TODO'
		} else if(command[0] === AdminCommand.Unban) {
			answer = 'TODO'
		} else if(command[0] === AdminCommand.WholeNotice) {
			var notice = ''
			for(i = 1; i < command.length; i++) {
				notice += command[i] + ' '
			}
			this.data.broadcast(GameOPCode.SNoticeAdminMessageAck, SNoticeAdminMessageAck.serialize(notice))
			log.debug('Packet Sent [SNoticeAdminMessageAck]')

			answer = 'Notice successfully sent to whole server'
		} else {
			answer = 'Command not yet implemented.'
		}

		this.server.send(session, GameOPCode.SAdminActionAck, SAdminActionAck.serialize(AdminActionResult.OK, answer))
		log.debug('Packet Sent [SAdminActionAck]')
	}
}

module.exports = AdminService