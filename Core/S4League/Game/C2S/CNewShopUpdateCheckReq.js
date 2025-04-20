var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			date1: packet.readProudString(),
			date2: packet.readProudString(),
			date3: packet.readProudString(),
			date4: packet.readProudString(),
			checksum1: packet.readUInt32LE(),
			checksum2: packet.readUInt32LE(),
			checksum3: packet.readUInt32LE(),
			checksum4: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(date1, date2, date3, date4, checksum1, checksum2, checksum3, checksum4) {
		var packet = new Packet()
		packet.writeProudString(date1)
		packet.writeProudString(date2)
		packet.writeProudString(date3)
		packet.writeProudString(date4)
		packet.writeUInt32LE(checksum1)
		packet.writeUInt32LE(checksum2)
		packet.writeUInt32LE(checksum3)
		packet.writeUInt32LE(checksum4)
		return packet.data.toBuffer()
	}
}