var Packet = require('../../../Network/Packet')

/*
01 01 31 // 49
68 74 74 70 3a 2f 2f 73 34 2e 70 6d 61 6e 67 2e
63 6f 6d 2f 67 61 6d 65 70 75 62 2f 70 75 72 63
68 61 73 65 2f 72 65 64 69 72 65 63 74 2e 6e 77
7a
01 01 15 // 21
30 30 30 3a 45 52 52 5f 54 4f 4b 45 4e 5f 4d 49
53 53 49 4e 47
ea 03 00 00
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			url: packet.readProudString(),
			token: packet.readProudString(),
			code: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(url, token, code) {
		var packet = new Packet()
		packet.writeProudString(url)
		packet.writeProudString(token)
		packet.writeUInt32LE(code)
		return packet.data.toBuffer()
	}
}