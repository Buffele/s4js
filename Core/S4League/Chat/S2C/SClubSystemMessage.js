var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			text: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(accountId, key, param1, param2) {
		/*
		key 1; Online State
		Param1:
		Name
		Param2:
		1 -> Online
		2 -> Offline

		key 2; Level up
		Param1:
		Name
		Param2:
		Level

		key 3; Acquire (What?)
		Param1:
		Name
		Param2:
		Unk

		key 4; Your own rank got upgraded
		Param1:
		Rank Name
		*/

		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeProudString('<Chat Key="' + key + '" Cnt="2" Param1="' + param1 + '" Param2="' + param2 + '"/>')
		return packet.data.toBuffer()
	}
}