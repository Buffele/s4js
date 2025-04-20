var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')
var Packet = require('../../Core/Network/Packet')

var ConfigManager = require('../Manager/ConfigManager')

// C2S
var CChannelEnterReq = require('../../Core/S4League/Game/C2S/CChannelEnterReq')
var CChannelLeaveReq = require('../../Core/S4League/Game/C2S/CChannelLeaveReq')

// S2C
var SChannelListInfoAck = require('../../Core/S4League/Game/S2C/SChannelListInfoAck')

var log = new Logger('ChannelService', true)

var ChannelService = function(server, data, channelManager) {
	this.server = server
	this.data = data
	this.manager = channelManager

	var channels = ConfigManager.channels
	for (var i = 0; i < channels.length; i++) {
		var channel = channels[i]

		this.data.addChannel({
			id: channel.id,
			playersOnline: 0,
			playerLimit: channel.playerLimit,
			channelType: channel.type,
			name: channel.name,
			rank: channel.rank,
			description: channel.description,
			color: {
				r: channel.color.r,
				g: channel.color.g,
				b: channel.color.b,
				a: channel.color.a
			},
			minLevel: channel.minLevel,
			maxLevel: channel.maxLevel,
			minRequireKDRate: channel.minRequireKDRate,
			maxRequireKDRate: channel.maxRequireKDRate,
			players: []
		})
	}
}

ChannelService.prototype = {
	handleCChannelEnterReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		log.debug('Packet Received [CChannelEnterReq]')
		var packet = CChannelEnterReq.deserialize(packet)

		log.debug('Channel ID: ' + packet.channelId)

		this.manager.join(session, packet.channelId)
	},
	handleCChannelLeaveReq: function(session, packet) {
		if(!session.playerId) {
			return
		}

		log.debug('Packet Received [CChannelLeaveReq]')
		var packet = CChannelLeaveReq.deserialize(packet)

		log.debug('Channel ID: ' + packet.channelId)

		this.manager.leave(session, packet.channelId)
	},
	sendChannelList: function(session) {
		var channels = this.data.getChannels()
		this.server.send(session, GameOPCode.SChannelListInfoAck, SChannelListInfoAck.serialize(channels))
		log.debug('Packet Sent [SChannelListInfoAck]')
	}
}

module.exports = ChannelService