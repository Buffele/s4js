var electron = require('electron')
var app = electron.app
var BrowserWindow = electron.BrowserWindow
var Menu = electron.Menu
var NativeImage = electron.NativeImage

var Config = require('./Config')

var mainWindow = null

app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit()
	}
})

app.on('ready', function() {
	var template = [
  		{
    		label: 'Server',
    		submenu: []
		},
		{
			label: 'Debug',
			submenu: [
				{
					label: 'Reload',
					click: function() {
						BrowserWindow.getFocusedWindow().reload()
					}
				},
				{
					label: 'Toggle DevTools',
					click: function() {
						BrowserWindow.getFocusedWindow().toggleDevTools()
					}
				}
			]
		}
		/*
		{
			label: 'About',
			submenu: [
				{
					label: 'Info',
					click: function() {
						// TODO
					}
				}
			]
		}
		*/
	]

	// Add Servers from Config to Contextmenu
	for (var i = 0; i < Config.servers.length; ++i) {
		var server = Config.servers[i]
		template[0].submenu.push({
			label: server.name,
			click: function(e) {
				BrowserWindow.getFocusedWindow().webContents.send('server-changed', e.server_i)
			},
			server_i: i
		})
	}

	menu = Menu.buildFromTemplate(template)

	Menu.setApplicationMenu(menu)

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		icon: 'main.png',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	})

	mainWindow.loadURL('file://' + __dirname + '/index.html')

	mainWindow.on('closed', function() {
		mainWindow = null
	})
})