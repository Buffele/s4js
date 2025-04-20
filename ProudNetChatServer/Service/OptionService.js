var ChatOPCode = require('../../Core/S4League/Chat/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var CommunitySetting = require('../../Core/S4League/Chat/Constants/CommunitySetting')

// C2S
var COptionSaveCommunityReq = require('../../Core/S4League/Chat/C2S/COptionSaveCommunityReq')
var COptionSaveBinaryReq = require('../../Core/S4League/Chat/C2S/COptionSaveBinaryReq')

var log = new Logger('OptionService', true)

var OptionService = function(server) {
	this.server = server
}

OptionService.prototype = {
	handleCOptionSaveCommunityReq: function(session, packet) {
		log.debug('Packet Received [COptionSaveCommunityReq]')
		var packet = COptionSaveCommunityReq.deserialize(packet)

		log.debug('Allow Combi: ' + CommunitySetting.getKeyByValue(packet.allowCombi))
		log.debug('Allow Friend Request: ' + CommunitySetting.getKeyByValue(packet.allowFriendRequest))
		log.debug('Allow Invitation: ' + CommunitySetting.getKeyByValue(packet.allowInvitation))
		log.debug('Allow Open Info: ' + CommunitySetting.getKeyByValue(packet.allowOpenInfo))
	},
	handleCOptionSaveBinaryReq: function(session, packet) {
		log.debug('Packet Received [COptionSaveBinaryReq]')
		var packet = COptionSaveBinaryReq.deserialize(packet)

		//log.debug('Remaining: ' + Packet.dump(packet.remaining))
	}
}

module.exports = OptionService