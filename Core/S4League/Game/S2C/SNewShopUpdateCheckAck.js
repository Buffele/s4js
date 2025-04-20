var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: packet.readUInt32LE(),
			date1: packet.readProudString(),
			date2: packet.readProudString(),
			date3: packet.readProudString(),
			date4: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(date1, date2, date3, date4) {
		var packet = new Packet()
		packet.writeUInt32LE(0) // unk | Change count? -> 15
		packet.writeProudString(date1) // unk2
		packet.writeProudString(date2) // unk3
		packet.writeProudString(date3) // unk4
		packet.writeProudString(date4) // unk5
		return packet.data.toBuffer()
	}
}