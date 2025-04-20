var PeerId = require('./PeerId')

var LongPeerId = function(arg1, arg2, arg3, arg4) {
	if (typeof arg1 === 'number' && arguments.length === 1) {
		var value = arg1

		this.accountId = value & 0x0000FFFFFFFFFFFF
		this.peerId = new PeerId((value >> 48))
	} else if (typeof arg1 === 'number' && typeof arg2 === 'number' && arguments.length === 2) {

		this.accountId = arg1
        this.peerId = new PeerId(arg2)
	} else if (typeof arg1 === 'number' && typeof arg2 === 'number' && typeof arg3 === 'number' && typeof arg4 === 'number' && arguments.length === 4) {

		this.accountId = arg1
        this.peerId = new PeerId(arg2, arg3, arg4)
	} else {
		throw new Error('Invalid arguments')
	}
}

LongPeerId.prototype.getValue = function() {
	return this.accountId | (this.peerId.getValue() << 48)
}

LongPeerId.prototype.toString = function() {
	return 'Account ID: ' + this.accountId  + ' Peer ID: ' + this.peerId
}

module.exports = LongPeerId