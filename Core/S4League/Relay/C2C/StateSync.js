var Packet = require('../../../Network/Packet')

// TODO: Flags and looks wrong!
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			state: packet.readUInt8(), // ActorState
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(unk1, unk2, state, remaining) {
		var packet = new Packet()
		packet.writeUInt32LE(unk1)
		packet.writeUInt32LE(unk2)
		packet.writeUInt8(state)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}