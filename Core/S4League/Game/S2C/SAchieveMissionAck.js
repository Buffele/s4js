var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			count: packet.readUInt32LE(),
			mission1: packet.readUInt32LE(),
			mission2: packet.readUInt32LE(),
			mission3: packet.readUInt32LE(),
			mission4: packet.readUInt32LE(),
			mission5: packet.readUInt32LE(),
			mission6: packet.readUInt32LE(),
			mission7: packet.readUInt32LE(),
			mission8: packet.readUInt32LE(),
			mission9: packet.readUInt32LE(),
			mission10: packet.readUInt32LE(),
			count2: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet()
		packet.writeUInt32LE(10) // count
		packet.writeUInt32LE(500) // 1
		packet.writeUInt32LE(1500) // 2
		packet.writeUInt32LE(1500) // 3
		packet.writeUInt32LE(5000) // 4
		packet.writeUInt32LE(750) // 5
		packet.writeUInt32LE(1000) // 6
		packet.writeUInt32LE(10) // 7
		packet.writeUInt32LE(1000) // 8
		packet.writeUInt32LE(5000) // 9
		packet.writeUInt32LE(1500) // 10
		packet.writeUInt32LE(10) // Count again??? S4 Devs???
		return packet.data.toBuffer()
	}
}