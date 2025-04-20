var Logger = require('../../Core/Utils/Logger')

var log = new Logger('DataService', true)

var DataService = function(server) {
	this.server = server
	// Data
	this.players = []
	// Vars
	this.globalAccountId = 1
}

DataService.prototype = {
	addPlayer: function(player) {
		this.players.push(player)
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
	removePlayer: function(player) {
		this.players.splice(this.players.indexOf(player), 1)
	}
}

module.exports = DataService