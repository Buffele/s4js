process.title = 'ClientLauncher'

var AeriaGamesUtils = require('../Core/AeriaGames/Utils')
var Logger = require('../Core/Utils/Logger')

var Config = require('./Config')

var log = new Logger('ClientLauncher')

process.on('AuthDone', function(code) {
	log.info('Launching S4Client...')

	var call = 'cd D:\\C\\AeriaGames\\S4League & S4Client_EAC.exe -rc:' + Config.rc + ' -lac:' + Config.lang + ' -auth_server_ip:' + Config.ip + ' -aeria_acc_code:' + code

	var exec = require('child_process').exec
	exec(call, function (error, stdout, stderr) {
		console.log(error)
		process.exit()
	})
})

if(Config.realAeriaAccCode) {
	AeriaGamesUtils.authorize(Config.user, Config.password, function(err, result) {
		if(err) {
			log.error(err)
			return
		}

		process.emit('AuthDone', result)
	})
} else {
	process.emit('AuthDone', '1337')
}