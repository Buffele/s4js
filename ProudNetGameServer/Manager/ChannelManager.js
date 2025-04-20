var GameOPCode = require('../../Core/S4League/Game/Constants/OPCode')
var Logger = require('../../Core/Utils/Logger')

var ServerResult = require('../../Core/S4League/Game/Constants/ServerResult')

var SServerResultAck = require('../../Core/S4League/Game/S2C/SServerResultAck')

var log = new Logger('ChannelManager', true)

var ChannelManager = function(server, data) {
	this.server = server
	this.data = data
}

ChannelManager.prototype = {
	join: function(session, channelId) {
		if(session.channelId) {
			return
		}

		log.debug('Player ' + session.playerId + ' joining Channel #' + channelId)

		var channel = this.data.getChannelByID(channelId)
		if(!channel) {
			return this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.NonExistingChannel))
		}

		// Check if the channel exceeded its player limit
		if(channel.playersOnline >= channel.playerLimit) {
			return this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.ChannelLimitExceed))
		}

		// Check the level limit
		//if(channel.min_level >= session.level && channel.max_level <= session.level) {
		//	return this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.CannotEnterChannel))
		//}

		channel.players.push(session)

		channel.playersOnline++
		session.channelId = channelId

		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.ChannelEnter))
	},
	leave: function(session, channelId, type) {
		if(session.channelId === 0) {
			return
		}

		if(session.channelId !== channelId) {
			return
		}

		log.debug('Player ' + session.playerId + ' leaving Channel #' + session.channelId)

		var channel = this.data.getChannelByID(session.channelId)

		channel.players.splice(channel.players.indexOf(session), 1)

		channel.playersOnline--
		session.channelId = 0

		// DC
		if(type === 1) {
			return
		}

		this.server.send(session, GameOPCode.SServerResultAck, SServerResultAck.serialize(ServerResult.ChannelLeave))
	}
}

module.exports = ChannelManager