var Logger = require('../../Core/Utils/Logger')

var log = new Logger('DataService', true)

var DataService = function(server) {
	this.server = server
	// Data
	this.channels = []
	this.players = []
	this.rooms = []
	// Vars
	this.processStartTime = new Date().getTime()
}

DataService.prototype = {
	addChannel: function(channel) {
		this.channels.push(channel)
	},
	addPlayer: function(player) {
		this.players.push(player)
	},
	addRoom: function(room) {
		this.rooms.push(room)
	},
	broadcast: function(OpCode, packet, exclude) {
		for (var i = 0; i < this.players.length; ++i) {
			var player = this.players[i]
			if(player !== exclude) {
				this.server.send(player, OpCode, packet)
			}
		}
	},
	broadcastToChannel: function(channelId, OpCode, packet, exclude) {
		for (var i = 0; i < this.channels.length; ++i) {
			var channel = this.channels[i]
			if(channel.id === channelId) {
				for (var i_ = 0; i_ < channel.players.length; ++i_) {
					var player = channel.players[i_]
					if(player !== exclude) {
						this.server.send(player, OpCode, packet)
					}
				}
			}
		}
	},
	broadcastToRoom: function(channelId, roomId, OpCode, packet, exclude) {
		for (var i = 0; i < this.rooms.length; ++i) {
			var room = this.rooms[i]
			if(room.channelId === channelId && room.id === roomId) {
				for (var i_ = 0; i_ < room.players.length; ++i_) {
					var player = room.players[i_]
					if(player !== exclude) {
						this.server.send(player, OpCode, packet)
					}
				}
				return // Found the correct room
			}
		}
	},
	getChannelByID: function(id) {
		for (var i = 0; i < this.channels.length; ++i) {
			var channel = this.channels[i]
			if(channel.id === id) {
				return channel
			}
		}
		return null
	},
	getChannels: function() {
		return this.channels
	},
	getPlayerByID: function(id) {
		for (var i = 0; i < this.players.length; ++i) {
			var player = this.players[i]
			if(player.playerId === id) {
				return player
			}
		}
		return null
	},
	getPlayerByName: function(name) {
		for (var i = 0; i < this.players.length; ++i) {
			var player = this.players[i]
			if(player.name === name) {
				return player
			}
		}
		return null
	},
	getProcessUptime: function() {
		return new Date().getTime() - this.processStartTime
	},
	getRoomByIDAndChannelID: function(id, channelId) {
		for (var i = 0; i < this.rooms.length; ++i) {
			var room = this.rooms[i]
			if(room.id === id && room.channelId === channelId) {
				return room
			}
		}
		return null
	},
	getRoomByTunnelID: function(tunnelId) {
		for (var i = 0; i < this.rooms.length; ++i) {
			var room = this.rooms[i]
			if(room.tunnelId === tunnelId) {
				return room
			}
		}
		return null
	},
	getRoomsByChannelID: function(channelId) {
		var found = []
		for (var i = 0; i < this.rooms.length; ++i) {
			var room = this.rooms[i]
			if(room.channelId === channelId) {
				found.push(room)
			}
		}
		return found
	},
	removeChannel: function(channel) {
		this.channels.splice(this.channels.indexOf(channel), 1)
	},
	removePlayer: function(player) {
		this.players.splice(this.players.indexOf(player), 1)
	},
	removeRoom: function(room) {
		this.rooms.splice(this.rooms.indexOf(room), 1)
	}
}

module.exports = DataService