var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			source: new PeerId(packet.readUInt16LE()),
			value: BinaryUtil.decompressFloat(packet.readInt16LE()),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(source, value, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(source.getValue())
		packet.writeInt16LE(BinaryUtil.compressFloat(value))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}