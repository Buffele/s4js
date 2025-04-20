var fs = require('fs')

var Logger = require('../../Core/Utils/Logger')

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
		return 28002
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

module.exports = {
	ip: getIp(),
	port: getPort(),
	proudnet: {
		encryptionKeyLength: getEncryptionKeyLength(),
		rsaBits: getRsaBits()
	}
}