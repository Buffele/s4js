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

module.exports = {
	username: getUsername(),
	password: getPassword(),
	server: getServer()
}