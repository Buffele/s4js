var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt8(),
			target: new PeerId(packet.readUInt16LE()),
			unk2: packet.readInt16LE(),
			unk3: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk4: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk5: packet.readUInt8(),
			unk6: packet.readUInt8(),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(unk1, target, unk2, unk3, unk4, unk5, unk6, remaining) {
		var packet = new Packet()
		packet.writeUInt8(unk1)
		packet.writeUInt16LE(target.getValue())
		packet.writeInt16LE(unk2)
		packet.writeInt16LE(BinaryUtil.compressFloat(unk3))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk4))
		packet.writeUInt8(unk5)
		packet.writeUInt8(unk6)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}