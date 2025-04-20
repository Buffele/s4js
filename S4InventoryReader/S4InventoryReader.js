process.title = 'S4MissionRewarder'

var Logger = require('../Core/Utils/Logger')

var log = new Logger('Program', true)

log.info('Starting S4InventoryReader...')

require('./Client')