var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')

// TODO: Flags!
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt8(),
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			unk3: packet.readUInt8(),
			unk4: packet.readUInt8(),
			unk5: packet.readUInt8(),
			unk6: packet.readInt16LE(),
			unk7: packet.readUInt8(),
			remaining: packet.readRemaining() // There is a lot more!
		}
		return deserialized
	},
	serialize: function(unk1, unk2, position, unk3, unk4, unk5, unk6, unk7, remaining) {
		var packet = new Packet()
		packet.writeUInt32LE(unk1)
		packet.writeUInt8(unk2)
		packet.writeInt16LE(BinaryUtil.compressFloat(position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.z))
		packet.writeUInt8(unk3)
		packet.writeUInt8(unk4)
		packet.writeUInt8(unk5)
		packet.writeInt16LE(unk6)
		packet.writeUInt8(unk7)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}