var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			type: packet.readUInt8(),
			data: packet.readProudBuffer(),
			compressedSize: packet.readUInt32LE(),
			decompressedSize: packet.readUInt32LE(),
			date: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(type, data, compressedSize, decompressedSize, date) {
		var packet = new Packet()
		packet.writeUInt8(type)
		packet.writeProudBuffer(data)
		packet.writeUInt32LE(compressedSize)
		packet.writeUInt32LE(decompressedSize)
		packet.writeProudString(date)
		return packet.data.toBuffer()
	}
}