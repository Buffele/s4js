var fs = require('fs')

var Logger = require('../../Core/Utils/Logger')

var ServerType = require('../../Core/S4League/Auth/Constants/ServerType')

var log = new Logger('ConfigManager', true)

var config = []

try {
	config = fs.readFileSync('./config.json', 'utf8')
	config = JSON.parse(config)
} catch(e) {
	log.error('Error while reading the Config.')
	log.error(e)
	process.exit()
}

function getUsername() {
	if(!config.username) {
		log.error('No Username in config.json found.')
		process.exit()
	}

	return config.username
}

function getPassword() {
	if(!config.password) {
		log.error('No Password in config.json found.')
		process.exit()
	}

	return config.password
}

function getServer() {
	if(!config.server) {
		log.error('No Server in config.json found.')
		process.exit()
	}

	if(config.server >= 1 && config.server <= 7) {
		return config.server
	} else {
		log.error('Invalid Server in config.json found. Server range is between 1 and 7.')
		process.exit()
	}
}

function getReconnectDelay() {
	if(config.reconnectDelay == null) {
		log.error('No Reconnect Delay in config.json found.')
		process.exit()
	}

	return config.reconnectDelay
}

function ensureVersionExists() {
	if(!config.version) {
		log.error('No Version in config.json found.')
		process.exit()
	}
}

function getVersionMajor() {
	ensureVersionExists()

	if(config.version.major === null) {
		log.error('No Version.major in config.json found.')
		process.exit()
	}

	return config.version.major
}

function getVersionMinor() {
	ensureVersionExists()

	if(config.version.minor === null) {
		log.error('No Version.minor in config.json found.')
		process.exit()
	}

	return config.version.minor
}

function getVersionBuild() {
	ensureVersionExists()

	if(config.version.build === null) {
		log.error('No Version.build in config.json found.')
		process.exit()
	}

	return config.version.build
}

function getVersionRevision() {
	ensureVersionExists()

	if(config.version.revision === null) {
		log.error('No Version.revision in config.json found.')
		process.exit()
	}

	return config.version.revision
}

module.exports = {
	username: getUsername(),
	password: getPassword(),
	server: getServer(),
	reconnectDelay: getReconnectDelay(),
	version: {
		major: getVersionMajor(),
		minor: getVersionMinor(),
		build: getVersionBuild(),
		revision: getVersionRevision()
	}
}
