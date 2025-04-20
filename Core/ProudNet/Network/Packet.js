var iconv = require('iconv-lite')
var int53 = require('int53')
var SmartBuffer = require('smart-buffer')

STRING_LENGTH_LIMIT = 1048576

var Packet = function(packet) {
	if (packet instanceof Buffer) {
		this.data = new SmartBuffer(packet)
	} else if(packet === 'E') {
		this.data = new SmartBuffer()
	} else {
		this.data = new SmartBuffer()
		this.data.writeUInt8(packet)
	}
}

Packet.dump = function(buffer) {
	var dump = ''

	if(buffer.length === 0) {
		return dump
	}

	bufferData = buffer.toString('hex').match(/.{1,2}/g)

	if(bufferData.length === 0) {
		return dump
	}

	for (i = 0; i < bufferData.length; i++) {
		if(i % 16 === 0) {
			dump += '\n'
		}
		dump += bufferData[i] + ' '
	}

	return dump
}

Packet.prototype.finalize = function() {
	var size = this.data.length

	this.data.writeInt16LE(22291, 0) // Magic

	// Proud Size
	if (-128 <= size && size <= 127) {
		this.data.writeInt8(1, 2)
		this.data.writeInt8(size, 3)
	} else if (-32768 <= size && size <= 32767) {
		this.data.writeInt8(2, 2)
		this.data.writeInt16LE(size, 3)
	} else if (-2147483648 <= size && size <= 2147483647) {
		this.data.writeInt8(4, 2)
		this.data.writeInt32LE(size, 3)
	} else {
		this.data.writeInt8(8, 2)
		this.data.writeInt64LE(size, 3)
	}

	return this.data.toBuffer()
}

Packet.prototype.readInt8 = function() {
	if(this.data._readOffset + 1 > this.data.length) {
		return 0
	}

	return this.data.readInt8()
}

Packet.prototype.readUInt8 = function() {
	if(this.data._readOffset + 1 > this.data.length) {
		return 0
	}

	return this.data.readUInt8()
}

Packet.prototype.readInt16LE = function() {
	if(this.data._readOffset + 2 > this.data.length) {
		return 0
	}

	return this.data.readInt16LE()
}

Packet.prototype.readUInt16LE = function() {
	if(this.data._readOffset + 2 > this.data.length) {
		return 0
	}

	return this.data.readUInt16LE()
}

Packet.prototype.readInt32LE = function() {
	if(this.data._readOffset + 4 > this.data.length) {
		return 0
	}

	return this.data.readInt32LE()
}

Packet.prototype.readUInt32LE = function() {
	if(this.data._readOffset + 4 > this.data.length) {
		return 0
	}

	return this.data.readUInt32LE()
}

Packet.prototype.readFloatLE = function() {
	if(this.data._readOffset + 4 > this.data.length) {
		return 0
	}

	return this.data.readFloatLE()
}

Packet.prototype.readDoubleLE = function() {
	if(this.data._readOffset + 8 > this.data.length) {
		return 0
	}

	return this.data.readDoubleLE()
}

Packet.prototype.readInt64LE = function() {
	if(this.data._readOffset + 8 > this.data.length) {
		return 0
	}

	return int53.readInt64LE(this.data)
}

Packet.prototype.readUInt64LE = function() {
	if(this.data._readOffset + 8 > this.data.length) {
		return 0
	}

	return int53.readUInt64LE(this.data)
}

Packet.prototype.readBuffer = function(length) {
	return this.data.readBuffer(length)
}

Packet.prototype.readIp = function() {
	return this.readUInt8() + '.' + this.readUInt8() + '.' + this.readUInt8() + '.' + this.readUInt8()
}

Packet.prototype.readProudSize = function() {
	var sizePrefix = this.readInt8()
	if(sizePrefix === 1) {
		return this.readInt8()
	} else if(sizePrefix === 2) {
		return this.readInt16LE()
	} else if(sizePrefix === 4) {
		return this.readInt32LE()
	} else if(sizePrefix === 8) {
		return this.readInt64LE()
	} else {
		return 0
	}
}

Packet.prototype.readProudBuffer = function() {
	var size = this.readProudSize()
	return this.readBuffer(size)
}

Packet.prototype.readProudString = function() {
	var encoding = this.readInt8()
	if(encoding === 1) {
		encoding = 'utf8'
	} else if(encoding === 2) {
		encoding = 'utf16le'
	} else {
		encoding = 'utf8'
	}

	var size = this.readProudSize()
	if (size < 0 || size > STRING_LENGTH_LIMIT) {
		return ''
	}

	if(size === 0) {
		return ''
	}

	if(encoding === 'utf16le') {
		size *= 2
	}

	if(encoding === 'utf8') {
		return iconv.decode(this.data.readBuffer(size), 'win1252')
	} else {
		return this.data.readString(size, encoding)
	}
}

Packet.prototype.readRemaining = function() {
	return this.data.readBuffer(this.data.remaining())
}

Packet.prototype.writeInt8 = function(int) {
	this.data.writeInt8(int)
}

Packet.prototype.writeUInt8 = function(uint, offset) {
	this.data.writeUInt8(uint, offset)
}

Packet.prototype.writeInt16LE = function(int) {
	this.data.writeInt16LE(int)
}

Packet.prototype.writeUInt16LE = function(uint) {
	this.data.writeUInt16LE(uint)
}

Packet.prototype.writeInt32LE = function(int) {
	this.data.writeInt32LE(int)
}

Packet.prototype.writeUInt32LE = function(uint, offset) {
	this.data.writeUInt32LE(uint, offset)
}

Packet.prototype.writeFloatLE = function(float) {
	this.data.writeFloatLE(float)
}

Packet.prototype.writeDoubleLE = function(double) {
	this.data.writeDoubleLE(double)
}

Packet.prototype.writeInt64LE = function(int) {
	var fakeBuffer = new Buffer(8)
	int53.writeInt64LE(int, fakeBuffer)
	this.data.writeBuffer(fakeBuffer)
}

Packet.prototype.writeUInt64LE = function(uint) {
	var fakeBuffer = new Buffer(8)
	int53.writeUInt64LE(uint, fakeBuffer)
	this.data.writeBuffer(fakeBuffer)
}

Packet.prototype.writeIp = function(ip) {
	var ip = ip.split('.')
	this.data.writeUInt8(ip[0])
	this.data.writeUInt8(ip[1])
	this.data.writeUInt8(ip[2])
	this.data.writeUInt8(ip[3])
}

Packet.prototype.writeBuffer = function(buffer) {
	this.data.writeBuffer(buffer)
}

Packet.prototype.writeProudSize = function(size) {
	if (-128 <= size && size <= 127) {
		this.data.writeInt8(1)
		this.data.writeInt8(size)
	} else if (-32768 <= size && size <= 32767) {
		this.data.writeInt8(2)
		this.data.writeInt16LE(size)
	} else if (-2147483648 <= size && size <= 2147483647) {
		this.data.writeInt8(4)
		this.data.writeInt32LE(size)
	} else {
		this.data.writeInt8(8)
		this.data.writeInt64LE(size)
	}
}

Packet.prototype.writeProudBuffer = function(buffer) {
	this.writeProudSize(buffer.length)
	this.data.writeBuffer(buffer)
}

Packet.prototype.writeProudString = function(str) {
	if (str.length < 0 || str.length > STRING_LENGTH_LIMIT) {
		return
	}

	this.data.writeUInt8(1) // encoding
	this.writeProudSize(str.length)
	var byteString = iconv.encode(str, 'win1252')
	this.data.writeBuffer(byteString)
}

Packet.prototype.rewind = function(value) {
	if(this.data._readOffset - value < 0) {
		return
	}

	this.data.rewind(value)
}

Packet.prototype.skip = function(value) {
	if(this.data._readOffset + value > this.data.length) {
		return
	}

	this.data.skip(value)
}


module.exports = Packet