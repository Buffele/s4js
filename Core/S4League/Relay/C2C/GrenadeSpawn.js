var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: new PeerId(packet.readUInt16LE()),
			owner: new PeerId(packet.readUInt16LE()),
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			unk1: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			unk2: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk3: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk4: packet.readProudString(),
			unk5: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(id, owner, position, unk1, unk2, unk3, unk4, unk5, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(id.getValue())
		packet.writeUInt16LE(owner.getValue())
		packet.writeInt16LE(BinaryUtil.compressFloat(position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.z))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1.z))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk2))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk3))
		packet.writeProudString(unk4)
		packet.writeInt16LE(BinaryUtil.compressFloat(unk5.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk5.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk5.z))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}