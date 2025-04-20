var async = require('../../Core/node_modules/async')

var Logger = require('../../Core/Utils/Logger')

var ConfigManager = require('./ConfigManager')

var AeriaGamesUtils = require('../../Core/AeriaGames/Utils')

var Common = require('../../Core/S4League/Constants/Common')
var Packet = require('../../Core/Network/Packet')
var ProudNetClient = require('../../Core/ProudNet/Client')

var AuthOPCode = require('../../Core/S4League/Auth/Constants/OPCode')

// Auth
var AuthLoginResult = require('../../Core/S4League/Auth/Constants/LoginResult')

// Auth C2S
var CLoginEUReq = require('../../Core/S4League/Auth/C2S/CLoginEUReq')

// Auth S2C
var SLoginEUAck = require('../../Core/S4League/Auth/S2C/SLoginEUAck')

var Config = require('../Config')

var log = new Logger('AccountManager', true)

function generateToken(account, cb) {
	log.info('Generating Token...')

	AeriaGamesUtils.authorize(account.user, account.password, function (err, result) {
		if (err) {
			return cb(err, null)
		}

		log.info('Token successfully generated')

		return cb(null, result)
	})
}

function generateGameTokens(authServerConfig, username, password, token, accessToken, refreshToken, expireDate, cb) {
	var called = false

	log.info('Connecting to AuthServer...')

	var client = new ProudNetClient({
		protocolVersion: Common.AuthProtocolVersion
	})

	var connectTimeout = setTimeout(function () {
		log.info('Connect to AuthServer timed out!')
		client.destroy()
		if (called) {
			return
		}
		called = true
		return cb(2, null)
	}, Config.authServerConnectTimeOut)

	client.connect(authServerConfig.port, authServerConfig.ip, function () {
		log.info('Connected to ' + authServerConfig.ip + ':' + authServerConfig.port)
	})

	client.on('connect', function () {
		client.send(AuthOPCode.CLoginEUReq, CLoginEUReq.serialize(username, password, '', '', 0, 0, 0, '', 0, '', '', token, accessToken, refreshToken, expireDate))
	})

	client.on('packet', function (opCode, packet) {
		if (opCode === AuthOPCode.SLoginEUAck) {
			var packet = SLoginEUAck.deserialize(packet)

			clearTimeout(connectTimeout)

			if (packet.result === AuthLoginResult.OK) {
				var result = {
					accountId: packet.accountId,
					sessionId: packet.sessionId,
					accessToken: packet.accessToken,
					refreshToken: packet.refreshToken,
					expireDate: packet.expireDate
				}

				client.destroy()
				if (called) {
					return
				}
				called = true
				return cb(null, result)
			} else {
				client.destroy()
				if (called) {
					return
				}
				called = true
				return cb(1, null)
			}
		}
	})

	client.on('error', function (e) {
		client.destroy()
	})

	client.on('close', function () {
		clearTimeout(connectTimeout)
		if (called) {
			return
		}
		called = true
		return cb(2, null)
	})
}

function getAccount(cb) {
	return cb(null, {
		user: ConfigManager.username,
		password: ConfigManager.password
	})
}

var AccountManager = function () {

}

AccountManager.prototype.getTokens = function (authServerConfig, cb) {
	async.waterfall([
			function (cb) {
				log.info('Get Account...')
				getAccount(function (err, account) {
					log.info('Successfully got an Account')
					cb(null, account)
				})
			},
			function (account, cb) {
				generateToken(account, function (err, token) {
					if (err) {
						if (err === 'Invalid Account Data!') {
							log.warning('Account banned.')
						}
						return cb(err)
					}

					generateGameTokens(authServerConfig, '', '', token, '', '', '', function (err, result) {
						if (err) {
							return cb(err, null)
						}

						return cb(null, result)
					})
				})
			}
		],
		function (err, result) {
			if (err) {
				return cb(err)
			}

			cb(null, result)
		})
}

AccountManager.prototype.refreshTokens = function (authServerConfig, accessToken, refreshToken, expireDate, cb) {
	var username = ''
	var password = ''
	generateGameTokens(authServerConfig, username, password, '', accessToken, refreshToken, expireDate, function (err, result) {
		if (err) {
			return cb(err, null)
		}

		return cb(null, result)
	})
}

module.exports = AccountManager