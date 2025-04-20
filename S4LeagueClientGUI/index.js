var ipcRenderer = require('electron').ipcRenderer

var AuthOPCode = require('../Core/S4League/Auth/Constants/OPCode')
var GameOPCode = require('../Core/S4League/Game/Constants/OPCode')
var Common = require('../Core/S4League/Constants/Common')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')
var ProudNetClient = require('../Core/ProudNet/Client')

var Config = require('./Config')

var ServerType = require('../Core/S4League/Auth/Constants/ServerType')

// C2S
var CServerListReq = require('../Core/S4League/Auth/C2S/CServerListReq')

// S2C
var SServerListAck = require('../Core/S4League/Auth/S2C/SServerListAck')

var serverName = document.getElementById('server-name')
var serverState = document.getElementById('server-state')
var serverList = document.getElementById('server-list')
var serverRefresh = document.getElementById('server-refresh')

var log = new Logger('Client', true)

var authClient
var gameClient

ipcRenderer.on('server-changed', function(e, i) {
	authClient.destroy()
	connectToAuth(i)
})

function connectToAuth(i) {
	serverList.innerHTML = ''
	serverState.innerHTML = '<span class="text-danger">Not Connected</span>'
	serverName.innerHTML = Config.servers[i].name

	authClient = new ProudNetClient({
		protocolVersion: Common.AuthProtocolVersion
	})

	authClient.connect(Config.servers[i].port, Config.servers[i].ip)

	authClient.on('connect', function() {
		serverState.innerHTML = '<span class="text-success">Connected</span>'
		refreshServerList()
	})

	authClient.on('packet', function(opCode, packet) {
		if(opCode === AuthOPCode.SServerListAck) {
			var packet = SServerListAck.deserialize(packet)

			var serverListHtml = ''
			var playersOnline = 0
			var playersTotal = 0

			for (var i = 0; i < packet.servers.length; ++i) {
				var server = packet.servers[i]

				if(server.type === ServerType.Game) {
					playersOnline += server.online
					playersTotal += server.limit
				}

				serverListHtml += '<tr>'+
				'<td>' + server.id + '</td>'+
				'<td>' + server.group + '</td>'+
				'<td>' + server.name + '</td>'+
				'<td>' + server.online + ' / ' + server.limit + '</td>'+
				'</tr>'
			}

			serverListHtml += '<tr>'+
			'<td></td>'+
			'<td></td>'+
			'<td></td>'+
			'<td>' + playersOnline + ' / ' + playersTotal + '</td>'+
			'</tr>'

			serverList.innerHTML = serverListHtml
		} else {
			//log.warning('Packet received: [' + AuthOPCode.getKeyByValue(opCode) + '][' + opCode + ']')
			//log.debug(Packet.dump(packet.readRemaining()))
		}
	})
}

serverRefresh.addEventListener('click', function() {
	refreshServerList()
})

function refreshServerList() {
	serverList.innerHTML = '<div class="text-center">Loading...</div>'
	authClient.send(AuthOPCode.CServerListReq, CServerListReq.serialize())
}

connectToAuth(0)