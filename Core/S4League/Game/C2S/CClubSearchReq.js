var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			searchBy: packet.readUInt32LE(),
			search: packet.readProudString(),
			page: packet.readUInt32LE(),
			sortBy: packet.readUInt32LE(),
			sort: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(searchBy, search, page, sortBy, sort) {
		var packet = new Packet()
		packet.writeUInt32LE(searchBy)
		packet.writeProudString(search)
		packet.writeUInt32LE(page)
		packet.writeUInt32LE(sortBy)
		packet.writeUInt8(sort)
		return packet.data.toBuffer()
	}
}