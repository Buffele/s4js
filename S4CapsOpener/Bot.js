var Logger = require('../Core/Utils/Logger')

var log = new Logger('Bot', true)

var AccountManager = require('./Manager/AccountManager')
var BotManager = require('./Manager/BotManager')

var accountManager = new AccountManager()

var botManager = new BotManager(accountManager)
botManager.start()