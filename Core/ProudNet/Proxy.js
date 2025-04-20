var events = require('events')
var util = require('util')

var Common = require('../S4League/Constants/Common')
var Logger = require('../Utils/Logger')
var Packet = require('../Network/Packet')
var ProudNetClient = require('./Client')
var ProudNetServer = require('./Server')

var log = new Logger('ProudNetProxy', true)

var ProudNetProxy = function(options) {
	if(!options) {
		log.error('Options not specified!')
		process.exit()
	}

	if(typeof options !== 'object') {
		log.error('Options need to be an Object!')
		process.exit()
	}

	if(!options.protocolVersion) {
		log.error('Protocol Version is missing!')
		process.exit()
	}

	if(!options.destinationIp) {
		log.error('Destination IP is missing!')
		process.exit()
	}

	if(!options.destinationPort) {
		log.error('Destination Port is missing!')
		process.exit()
	}

	this.destinationIp = options.destinationIp
	this.destinationPort = options.destinationPort
	this.enableRelaying = options.enableRelaying || false
	this.protocolVersion = new Buffer(options.protocolVersion)
	this.p2pProxy = options.p2pProxy || false

	events.EventEmitter.call(this)

	this.server = new ProudNetServer({
		protocolVersion: this.protocolVersion,
		enableRelaying: this.enableRelaying,
		delayedConnectHandshake: true,
		p2pProxy: this.p2pProxy
	})

	this.server.on('connect', function(session) {
		session.client = new ProudNetClient({
			protocolVersion: this.protocolVersion,
			enableRelaying: this.enableRelaying,
			p2pProxy: this.p2pProxy
		})

		session.client.connect(this.destinationPort, this.destinationIp, function() {
			log.debug('Connected to Destination Server on ' + this.destinationIp + ':' + this.destinationPort)
		}.bind(this))

		session.client.on('connect', function() {
			if(this.p2pProxy) {
				this.server.setHostId(session.client.getHostId())
			}
			this.server.makeConnectHandshake(session)
		}.bind(this))

		session.client.on('error', function(e) {
			session.end()
			if(e.code == 'ECONNRESET') {
				log.error('Connection abnormally closed')
			} else if(e.code == 'ECONNREFUSED') {
				log.error('Connection refused. Server down?')
			} else {
				log.error('Unhandled error occured: ' + e.code)
			}
		})

		session.client.on('close', function() {
			session.end()
			log.info('Connection closed')
		})

		session.client.on('packet', function(opCode, packet) {
			this.emit('clientPacketReceived', session, opCode, packet)
		}.bind(this))

		session.client.on('proudPacket', function(opCode, packet) {
			this.emit('clientProudPacketReceived', session, opCode, packet)
		}.bind(this))
	}.bind(this))

	this.server.on('packet', function(session, opCode, packet) {
		this.emit('serverPacketReceived', session, opCode, packet)
	}.bind(this))

	this.server.on('proudPacket', function(session, opCode, packet) {
		this.emit('serverProudPacketReceived', session, opCode, packet)
	}.bind(this))

	this.server.on('error', function(session, e) {
		session.client.end()
		if(e.code == 'ECONNRESET') {
			log.debug('Connection closed')
		} else {
			log.error('Unhandled session error occured:')
			log.error(e)
		}
	})

	this.server.on('end', function(session) {
		session.client.end()
	}.bind(this))
}

util.inherits(ProudNetProxy, events.EventEmitter)

ProudNetProxy.prototype.listen = function(port, ip) {
	this.server.listen(port, ip)
}

ProudNetProxy.prototype.sendToServer = function(session, opCode, packet) {
	this.server.send(session, opCode, packet.data.toBuffer())
}

ProudNetProxy.prototype.sendToServerProud = function(session, opCode, packet) {
	this.server.sendProud(session, opCode, packet.data.toBuffer())
}

ProudNetProxy.prototype.sendToClient = function(session, opCode, packet) {
	session.client.send(opCode, packet.data.toBuffer())
}

ProudNetProxy.prototype.sendToClientProud = function(session, opCode, packet) {
	session.client.sendProud(opCode, packet.data.toBuffer())
}

module.exports = exports = ProudNetProxy