var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var compressedSize = packet.readProudSize()

		var deserialized = {
			compressedSize: compressedSize,
			decompressedSize: packet.readProudSize(),
			compressedData: packet.readBuffer(compressedSize)
		}

		return deserialized
	},
	serialize: function(compressedSize, decompressedSize, compressedData) {
		var packet = new Packet(OPCode.Compressed)
		packet.writeProudSize(compressedSize)
		packet.writeProudSize(decompressedSize)
		packet.writeBuffer(compressedData)
		return packet.finalize()
	}
}