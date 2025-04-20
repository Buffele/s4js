var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		return {
			enabled: +!packet.readUInt8(),
		};
	},
	serialize: function(data) {
		var packet = new Packet();
		packet.writeUInt8(data.enabled); // 1 -> disabled, 0 -> enabled
		return packet.data.toBuffer();
	}
}