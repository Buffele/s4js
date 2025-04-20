var Packet = require('../../../Network/Packet')

// Same link RankingListAck
/*
02 00 00 00 # total ranks
02 00 00 00 # count

# 1
12 c1 0a 00 # clan id
01 01 10 54
65 61 6d 20 53 34 4c 65 61 67 75 65 20 46 52 01
01 00 01 01 01 43 0e 53 9f 00 00 00 00 00 09 00
00 00 01 01 0f 46 52 53 6d 61 72 74 53 34 4c 65
61 67 75 65 01 00 00 00 02 00 00 00 01 01 15 52
65 63 72 75 74 65 6d 65 6e 74 20 4f 75 76 65 72
74 20 3a 29 01 01 0e 32 30 31 33 30 32 31 31 31
35 30 34 34 33 01 01 00 01 01 00 ff ff ff ff 00
00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
00 00 00 00 00 f1 35 0e 00 01 01 09 54 65 61 6d
20 53 34 4c 20 01 01 00 01 01 02 53 53 a8 c8 cf
00 00 00 00 00 50 00 00 00 01 01 09 5b 47 4d 5d
4d 75 67 65 6e 01 00 00 00 03 00 00 00 01 01 01
20 01 01 0e 32 30 31 35 30 39 32 34 31 34 33 30
35 33 01 01 00 01 01 00 02 00 00 00 00 00 00 00
00 00 00 00 00 00 00 00 d0 07 00 00 00 00 00 00
00 00 00 00 02 00 00 00 04 00 00 00 00 00 00 00
00 00
*/

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