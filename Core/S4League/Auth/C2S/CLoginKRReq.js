var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			string1: packet.readProudString(),
			string2: packet.readProudString(),
			string3: packet.readProudString(),
			unk1: packet.readUInt8(),
			accountId: packet.readUInt32LE(),
			unk2: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(strUserId, ulSerial) {
		var packet = new Packet()

		packet.writeProudString(strUserId);
		packet.writeProudString("");
		packet.writeProudString("");
		packet.writeProudString("");
		packet.writeUInt32LE(ulSerial);
		packet.writeUInt32LE(0);
		packet.writeUInt32LE(0);
		packet.writeProudString("");
		packet.writeUInt32LE(0);
		packet.writeProudString("");
		packet.writeProudString("");
		packet.writeProudString("");
		packet.writeProudString("");
		packet.writeProudString("");
		packet.writeProudString("");

		return packet.data.toBuffer()
	}
}