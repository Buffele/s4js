var Logger = require('../../Core/Utils/Logger')

var log = new Logger('DataService', true)

var DataService = function(server) {
	this.server = server
	// Data
	this.players = []
	this.rooms = []
}

DataService.prototype = {
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
	getPlayerByID: function(id) {
		for (var i = 0; i < this.players.length; ++i) {
			var player = this.players[i]
			if(player.accountId === id) {
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
	getRoomByTunnelID: function(tunnelId) {
		for (var i = 0; i < this.rooms.length; ++i) {
			var room = this.rooms[i]
			if(room.tunnelId === tunnelId) {
				return room
			}
		}
		return null
	},
	removePlayer: function(player) {
		this.players.splice(this.players.indexOf(player), 1)
	},
	removeRoom: function(room) {
		this.rooms.splice(this.rooms.indexOf(room), 1)
	}
}

module.exports = DataService