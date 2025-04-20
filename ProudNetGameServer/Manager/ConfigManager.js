var fs = require('fs')

var Logger = require('../../Core/Utils/Logger')

var ChannelType = require('../../Core/S4League/Game/Constants/ChannelType')

var log = new Logger('ConfigManager', true)

var config = []

try {
	config = fs.readFileSync('./config.json', 'utf8')
	config = JSON.parse(config)
} catch(e) {
	log.error('Error while reading the Config.')
	log.error(e)
}

function getIp() {
	if(!config.ip) {
		log.warning('No IP in config.json found. Defaulting to 127.0.0.1.')
		return '127.0.0.1'
	}

	if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(config.ip)) {
		return config.ip
	} else {
		log.error('Invalid IP in config.json found. Defaulting to 127.0.0.1.')
		return '127.0.0.1'
	}
}

function getPort() {
	if(!config.port) {
		log.warning('No Port in config.json found. Defaulting to 28013.')
		return 28013
	}

	if(config.port >= 1 && config.port <= 65535) {
		return config.port
	} else {
		log.error('Invalid Port in config.json found. Defaulting to 28013.')
		return 28013
	}
}

function getEncryptionKeyLength() {
	if(!config.proudnet) {
		log.warning('No Proudnet in config.json found. Defaulting proudnet.encryptionKeyLength to 128.')
		return 128
	}

	if(!config.proudnet.encryptionKeyLength) {
		log.warning('No proudnet.encryptionKeyLength in config.json found. Defaulting to 128.')
		return 128
	}

	return config.proudnet.encryptionKeyLength
}

function getRsaBits() {
	if(!config.proudnet) {
		log.warning('No Proudnet in config.json found. Defaulting proudnet.rsaBits to 1024.')
		return 1024
	}

	if(!config.proudnet.rsaBits) {
		log.warning('No proudnet.rsaBits in config.json found. Defaulting to 1024.')
		return 1024
	}

	return config.proudnet.rsaBits
}

function getTestMode() {
	if(!config.hasOwnProperty('testMode')) {
		log.warning('No testMode in config.json found. Defaulting to false.')
		return false
	}

	return config.testMode
}

function getResourceHashKeyCheck() {
	if(!config.hasOwnProperty('resourceHashKeyCheck')) {
		log.warning('No resourceHashKeyCheck in config.json found. Defaulting to false.')
		return false
	}

	return config.resourceHashKeyCheck
}

function getRelayIp() {
	if(!config.relay) {
		log.warning('No Relay in config.json found. Defaulting relay.ip to 127.0.0.1.')
		return '127.0.0.1'
	}

	if(!config.relay.ip) {
		log.warning('No relay.ip in config.json found. Defaulting to 127.0.0.1.')
		return '127.0.0.1'
	}

	if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(config.relay.ip)) {
		return config.relay.ip
	} else {
		log.error('Invalid relay.ip in config.json found. Defaulting to 127.0.0.1.')
		return '127.0.0.1'
	}
}

function getRelayPort() {
	if(!config.relay) {
		log.warning('No Relay in config.json found. Defaulting relay.port to 28012.')
		return 28012
	}

	if(!config.relay.port) {
		log.warning('No relay.port in config.json found. Defaulting to 28012.')
		return 28012
	}

	if(config.relay.port >= 1 && config.port <= 65535) {
		return config.relay.port
	} else {
		log.error('Invalid relay.port in config.json found. Defaulting to 28012.')
		return 28012
	}
}

function getChannels() {
	if(!config.channels) {
		log.warning('No Channels in config.json found.')
		return []
	}

	var channels = []

	for (var i = 0; i < config.channels.length; i++) {
		var channel = config.channels[i]
		if(!ChannelType.hasOwnProperty(channel.type)) {
			log.error('Invalid Channel Type "' + channel.type + '" for Channel #' + channel.id + '. Skipping.')
			continue
		}
		channel.type = ChannelType[channel.type]
		channels.push(channel)
	}

	return channels
}

function getItems() {
	if(!config.items) {
		log.warning('No Items in config.json found.')
		return []
	}

	return config.items
}

function getGunModeWeapons() {
	if(!config.gunModeWeapons) {
		log.warning('No GunModeWeapons in config.json found.')
		return []
	}

	return config.gunModeWeapons
}

module.exports = {
	ip: getIp(),
	port: getPort(),
	proudnet: {
		encryptionKeyLength: getEncryptionKeyLength(),
		rsaBits: getRsaBits()
	},
	testMode: getTestMode(),
	resourceHashKeyCheck: getResourceHashKeyCheck(),
	relay: {
		ip: getRelayIp(),
		port: getRelayPort()
	},
	channels: getChannels(),
	items: getItems(),
	gunModeWeapons: getGunModeWeapons()
}