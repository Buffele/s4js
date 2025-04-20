process.title = 'AuthProxy'

var Logger = require('../Core/Utils/Logger')

var log = new Logger('Program', true)

process.on('uncaughtException', function(err) {
	log.error(err.stack)
})

log.info('Starting Proxy...')

require('./Proxy')