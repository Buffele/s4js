var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			owner: new PeerId(packet.readUInt16LE()),
			id: new PeerId(packet.readUInt16LE()),
			gameTime: packet.readUInt32LE(),
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			rotation: {
				x: packet.readUInt8(),
				y: packet.readUInt8()
			},
			count: packet.readUInt32LE(),
			hp: packet.readUInt32LE(),
			time: packet.readUInt32LE(),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(data/*owner, id, gameTime, position, rotation, count, hp, time, remaining*/) {
		var packet = new Packet()
		packet.writeBuffer(data)
		/*
		packet.writeUInt16LE(owner.getValue())
		packet.writeUInt16LE(id.getValue())
		packet.writeUInt32LE(gameTime)
		packet.writeInt16LE(BinaryUtil.compressFloat(position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.z))
		packet.writeUInt8(rotation.x)
		packet.writeUInt8(rotation.y)
		packet.writeUInt32LE(count)
		packet.writeUInt32LE(hp)
		packet.writeUInt32LE(time)
		packet.writeBuffer(remaining)
		*/
		return packet.data.toBuffer()
	}
}