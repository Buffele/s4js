process.title = 'S4CapsOpener'

var Logger = require('../Core/Utils/Logger')

var log = new Logger('Program', true)

var ConfigManager = require('./Manager/ConfigManager')

var serverName = ''
if(ConfigManager.server === 1) {
	serverName = 'English 1'
} else if(ConfigManager.server === 2) {
	serverName = 'English 2'
} else if(ConfigManager.server === 3) {
	serverName = 'English 3'
} else if(ConfigManager.server === 4) {
	serverName = 'German 1'
} else if(ConfigManager.server === 5) {
	serverName = 'French'
} else if(ConfigManager.server === 6) {
	serverName = 'German 2'
} else if(ConfigManager.server === 7) {
	serverName = 'Turkish'
}

process.title = 'S4CapsOpener - ' + serverName + ' - ' + ConfigManager.username

log.info('Starting S4CapsOpener...')

require('./Bot')
