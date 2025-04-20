process.title = 'ProudNetProxy'

var Logger = require('../Core/Utils/Logger')

var log = new Logger('Program', true)

log.info('Starting ProudNet Proxy...')

require('./Proxy')