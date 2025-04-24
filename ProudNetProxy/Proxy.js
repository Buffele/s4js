var net = require('net')

var Config = require('./Config')
var Logger = require('../Core/Utils/Logger')
var Packet = require('../Core/Network/Packet')

var log = new Logger('Proxy', true)

var bufferedClientData = Buffer().alloc(0)
var bufferedServerData = Buffer().alloc(0)

function parseClientData() {
	while(true) {
		var magic = bufferedClientData.readInt16LE(0)

		// Check magic
		if(magic !== 0x5713) {
			break
		}

		var sizePrefix = bufferedClientData.readUInt8(2)
		var size
		var addSize
		if(sizePrefix === 1) {
			size = bufferedClientData.readUInt8(3)
			addSize = 4
		} else if(sizePrefix === 2) {
			size = bufferedClientData.readUInt16LE(3)
			addSize = 5
		} else if(sizePrefix === 4) {
			size = bufferedData.readUInt32LE(3)
			addSize = 7
		}

		// Check Size...
		var bufferLength = bufferedClientData.length
		if(size + addSize > bufferLength) {
			break // The packet is larger?! oO
		}

		// Extract thingy
		var packet = bufferedClientData.slice(0, size + addSize)

		// shrink data
		bufferedClientData = bufferedClientData.slice(size + addSize, bufferLength)

		// new packet
		newClientPacket(packet)

		// check if we hit the end with reading from our data buffer
		if(bufferedClientData.length === 0) {
			break // Done reading the buffered data...
		}
	}
}

function parseServerData() {
	while(true) {
		var magic = bufferedServerData.readInt16LE(0)

		// Check magic
		if(magic !== 0x5713) {
			break
		}

		var sizePrefix = bufferedServerData.readUInt8(2)
		var size
		var addSize
		if(sizePrefix === 1) {
			size = bufferedServerData.readUInt8(3)
			addSize = 4
		} else if(sizePrefix === 2) {
			size = bufferedServerData.readUInt16LE(3)
			addSize = 5
		} else if(sizePrefix === 4) {
			size = bufferedServerData.readUInt32LE(3)
			addSize = 7
		}

		// Check Size...
		var bufferLength = bufferedServerData.length
		if(size + addSize > bufferLength) {
			break // The packet is larger?! oO
		}

		// Extract thingy
		var packet = bufferedServerData.slice(0, size + addSize)

		// shrink data
		bufferedServerData = bufferedServerData.slice(size + addSize, bufferLength)

		// new packet
		newServerPacket(packet)

		// check if we hit the end with reading from our data buffer
		if(bufferedServerData.length === 0) {
			break // Done reading the buffered data...
		}
	}
}

function newClientPacket(data) {
	log.info('Client --> Server:')

	var packet = new Packet(data)
	packet.skip(2) // Magic
	var sizePrefix = packet.readUInt8()
	var size
	if(sizePrefix === 1) {
		size = packet.readUInt8()
	} else if(sizePrefix === 2) {
		size = packet.readUInt16LE()
	} else if(sizePrefix === 4) {
		size = packet.readUInt32LE()
	}
	var opCode = packet.readUInt8()

	log.info('Size Prefix: ' + sizePrefix + ' Size: ' + size + ' OP Code: ' + opCode)

	var payload = packet.readBuffer(size)

	log.info(Packet.dump(payload))
}

function newServerPacket(data) {
	log.info('Client <-- Server:')

	var packet = new Packet(data)
	packet.skip(2) // Magic
	var sizePrefix = packet.readUInt8()
	var size
	if(sizePrefix === 1) {
		size = packet.readUInt8()
	} else if(sizePrefix === 2) {
		size = packet.readUInt16LE()
	} else if(sizePrefix === 4) {
		size = packet.readUInt32LE()
	}
	var opCode = packet.readUInt8()

	log.info('Size Prefix: ' + sizePrefix + ' Size: ' + size + ' OP Code: ' + opCode)

	var payload = packet.readBuffer(size)

	log.info(Packet.dump(payload))
}

var server = net.createServer(function(source) {
	// Ensure NoDelay (disable Nagle algorithm) everywhere
	source.setNoDelay(true)

	log.info('Incoming connection -> Trying to connect to AuthServer...')
	// server
	var target = new net.Socket()

	target.connect(Config.target.port, Config.target.ip, function() {
		log.info('Connected to server')
	})

	// client
	source.on('data', function(data) {
		bufferedClientData = Buffer.concat([bufferedClientData, data])
		parseClientData()

		target.write(data)
	})

	source.on('error', function(e) {
		if(e.code == 'ECONNRESET') {
			log.info('Client connection closed')
		} else {
			log.error('Unhandled source error occured:')
			log.error(e)
		}
	})

	source.on('end', function() {
		log.info('Connection closed to client')
	})

	target.on('data', function(data) {
		bufferedServerData = Buffer.concat([bufferedServerData, data])
		parseServerData()

		source.write(data)
	})

	target.on('error', function(e) {
		log.error('Unhandled target error occured:')
		log.error(e)
	})

	target.on('close', function() {
		log.info('Connection closed to server')
	})
})

server.on('error', function(e) {
	if(e.code == 'EADDRINUSE') {
		log.error('Port ' + Config.source.port + ' already in use')
	} else {
		log.error('Unhandled server error occured:')
		log.error(e)
	}
})

server.listen(Config.source.port, Config.source.ip)

log.info('Proxy started on ' + Config.source.ip + ':' + Config.source.port)