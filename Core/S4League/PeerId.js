var PeerId = function(arg1, arg2, arg3) {
	if (typeof arg1 === 'number' && arguments.length === 1) {
		var value = arg1

		this.counter = value >> 8
		this.slot = (value >> 3) & 31
		this.unk = value & 7
	} else if (typeof arg1 === 'number' && typeof arg2 === 'number' && typeof arg3 === 'number' && arguments.length === 3) {
		this.counter = arg1
		this.slot = arg2
		this.unk = arg3
	} else {
		throw new Error('Invalid arguments')
	}
}

PeerId.prototype.getValue = function() {
	var value = this.unk & 7
	value = (8 * (this.slot & 31) | value)
	value = (this.counter << 8 | value)
	return value
}

PeerId.prototype.toString = function() {
	return 'Counter: ' + this.counter  + ' Slot: ' + this.slot + ' Unk: ' + this.unk
}

module.exports = PeerId