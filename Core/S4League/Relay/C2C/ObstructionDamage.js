var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: new PeerId(packet.readUInt16LE()),
			damage: packet.readUInt32LE(),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(id, damage, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(id.getValue())
		packet.writeInt16LE(BinaryUtil.compressFloat(damage))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}