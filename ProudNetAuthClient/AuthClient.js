process.title = 'AuthClient'

var Logger = require('../Core/Utils/Logger')

var log = new Logger('Program')

log.info('Starting Client...')

require('./Client')