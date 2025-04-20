var readline = require('readline')

var Logger = require('../../Core/Utils/Logger')

var ConfigManager = require('./ConfigManager')
var GameManager = require('./GameManager')

var Config = require('../Config')

var log = new Logger('BotManager', true)

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

var BotManager = function (account) {
	this.account = account

	// server config
	this.authServerConfig = null
	this.gameServerConfig = null

	// data
	this.failure = false
	this.accountId = null
	this.name = ''
	this.sessionId = null

	this.accessToken = ''
	this.refreshToken = ''
	this.expireDate = ''

	this.stop = false

	this.authServerConfig = {
		ip: Config.auth.ip,
		port: Config.auth.port
	}

	this.gameServerConfig = {
		ip: Config.game.servers[ConfigManager.server - 1],
		port: Config.game.port
	}

	// managers
	this.gameManager = new GameManager(this.gameServerConfig)

	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	})

	rl.on('line', function (line) {
		var word = line.split(' ')
		if (word[0] === '/exit') {
			log.info('Stopping...')
			this.stop = true
		} else if (word[0] === '/stop') {
			log.info('Stopping...')
			this.stop = true
		} else {
			log.warning('Unknown Command: ' + word[0])
		}
	}.bind(this))
}

BotManager.prototype.start = function () {
	// Account
	this.login()

	// Game
	this.gameManager.on('failure', function (renewAccount) {
		if(this.stop) {
			process.exit()
		}
		this.handleServerFailure()
	}.bind(this))
}

BotManager.prototype.login = function () {
	log.info('Get Token from AeriaGames')

	this.account.getTokens(this.authServerConfig, function (err, result) {
		if (err) {
			log.info('Failed to load tokens... We need new ones! Trying to generate in ' + Config.generateTokenDelay + ' ms.')
			setTimeout(function () {
				this.login()
			}.bind(this), Config.generateTokenDelay)
			return
		}

		this.accountId = result.accountId
		this.sessionId = result.sessionId
		this.accessToken = result.accessToken
		this.refreshToken = result.refreshToken
		this.expireDate = result.expireDate

		this.gameManager.start(this.accountId, this.sessionId, this.accessToken, this.refreshToken, this.expireDate)
	}.bind(this))
}

BotManager.prototype.handleServerFailure = function () {
	if (this.failure) {
		return
	}
	this.failure = true
	this.gameManager.destroy()

	log.info('Connection to Gameserver closed.')

	log.info('Reconnecting in ' + ConfigManager.reconnectDelay + 'ms!')
	setTimeout(function () {
		this.failure = false
		this.handleToken()
	}.bind(this), ConfigManager.reconnectDelay)
}

BotManager.prototype.handleToken = function () {
	log.info('Trying to refresh Tokens on AuthServer...')

	this.account.refreshTokens(this.authServerConfig, this.accessToken, this.refreshToken, this.expireDate, function (err, result) {
		if (err) {
			if (err === 2) {
				log.info('Failed to connect to AuthServer... Retry in ' + Config.generateTokenDelay + ' ms.')
				setTimeout(function () {
					this.handleToken()
				}.bind(this), Config.generateTokenDelay)
			} else {
				var delay = getRandomInt(2000, 20000)
				log.info('Failed to refresh tokens... We need new ones! Trying to generate in ' + delay + ' ms.')
				setTimeout(function () {
					this.login()
				}.bind(this), delay)
			}
			return
		}

		this.accountId = result.accountId
		this.sessionId = result.sessionId
		this.accessToken = result.accessToken
		this.refreshToken = result.refreshToken
		this.expireDate = result.expireDate

		this.gameManager.start(this.accountId, this.sessionId, this.accessToken, this.refreshToken, this.expireDate)
	}.bind(this))
}

module.exports = BotManager