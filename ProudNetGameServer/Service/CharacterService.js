var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')

// C2S
var CCharacterCreateReq = require('../../Core/S4League/Game/C2S/CCharacterCreateReq')
var CCharacterSelectReq = require('../../Core/S4League/Game/C2S/CCharacterSelectReq')
var CCharacterDeleteReq = require('../../Core/S4League/Game/C2S/CCharacterDeleteReq')
var CCharacterFirstCreateReq = require('../../Core/S4League/Game/C2S/CCharacterFirstCreateReq')

// S2C
var SSuccessCreateCharacterAck = require('../../Core/S4League/Game/S2C/SSuccessCreateCharacterAck')
var SCharacterSelectAck = require('../../Core/S4League/Game/S2C/SCharacterSelectAck')
var SCharacterDeleteAck = require('../../Core/S4League/Game/S2C/SCharacterDeleteAck')
var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')
var SCharacterAvatarEquipPresetAck = require('../../Core/S4League/Game/S2C/SCharacterAvatarEquipPresetAck')

var log = new Logger('CharacterService', true)

var CharacterService = function(server) {
	this.server = server
}

CharacterService.prototype = {
	handleCCharacterCreateReq: function(session, packet) {
		log.debug('Packet Received [CCharacterCreateReq]')
		var packet = CCharacterCreateReq.deserialize(packet)

		log.debug('Slot: ' + packet.slot + ' Gender: ' + packet.gender)
		log.debug(Packet.dump(packet.unk))

		// TODO

		this.server.send(session, GameOPCode.SCharacterAvatarEquipPresetAck, SCharacterAvatarEquipPresetAck.serialize())
		log.debug('Packet Sent [SCharacterAvatarEquipPresetAck]')

		this.server.send(session, GameOPCode.SSuccessCreateCharacterAck, SSuccessCreateCharacterAck.serialize())
		log.debug('Packet Sent [SSuccessCreateCharacterAck]')
	},
	handleCCharacterSelectReq: function(session, packet) {
		log.debug('Packet Received [CCharacterSelectReq]')
		var packet = CCharacterSelectReq.deserialize(packet)

		log.debug('Slot: ' + packet.slot)

		// TODO

		// TODO: Not allowed. e.g: level
		//this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.FailedSelectPlayer))
		//log.debug('Packet Sent [SServerResultAck]')

		this.server.send(session, GameOPCode.SCharacterSelectAck, SCharacterSelectAck.serialize(packet.slot))
		log.debug('Packet Sent [SCharacterSelectAck]')
	},
	handleCCharacterDeleteReq: function(session, packet) {
		log.debug('Packet Received [CCharacterDeleteReq]')
		var packet = CCharacterDeleteReq.deserialize(packet)

		log.debug('Slot: ' + packet.slot)

		// TODO

		this.server.send(session, GameOPCode.SCharacterDeleteAck, SCharacterDeleteAck.serialize(packet.slot))
		log.debug('Packet Sent [SCharacterDeleteAck]')
	},
	handleCCharacterFirstCreateReq: function(session, packet) {
		log.debug('Packet Received [CCharacterFirstCreateReq]')
		var packet = CCharacterFirstCreateReq.deserialize(packet)

		log.debug('Name: ' + packet.name)
		log.debug(Packet.dump(packet.unk))

		// TODO: Nickname already used:
		//this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.NicknameAlreadyUsed))
		//log.debug('Packet Sent [SServerResultAck]')

		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.NickCreateSuccess))
		log.debug('Packet Sent [SServerResultAck]')

		// TODO: Send Accountdata etc
	}
}

module.exports = CharacterService