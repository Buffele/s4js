var Packet = require('../../../Network/Packet')

module.exports = {
	/*
	Check that:
	UInt8: unreadMessageCount
	UInt16LE: messageCount
	*/
	deserialize: function(packet) {
		var deserialized = {
			unreadMessageCount: packet.readUInt8(),
			unk2: packet.readUInt8(),
			unk3: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(unreadMessageCount, unk2, unk3) {
		var packet = new Packet()
		packet.writeUInt8(unreadMessageCount) // message icon blinking: 0 -> No, 1 -> Yes
		packet.writeUInt8(unk2)
		packet.writeUInt8(unk3)
		return packet.data.toBuffer()
	}
}