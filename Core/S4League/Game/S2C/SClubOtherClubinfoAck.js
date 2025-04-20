var Packet = require('../../../Network/Packet')

/*
00 00 00 00 # result
f1 35 0e 00 # clan id
01 01 09 54 65 61 6d 20 53 34 4c 20 # name
01 01 00 # mark id
01 01 01 45 # class
a8 c8 cf 00 00 00 00 00 # master account id
50 00 00 00 # master level
01 01 09 5b 47 4d 5d 4d 75 67 65 6e # master name
01 00 00 00 # unk1
03 00 00 00 # unk2
01 01 01 20 # description
01 01 0e 32 30 31 35 30 39 32 34 31 34 33 30 35 33 # creation date
01 01 00 # unk3
01 01 00 # unk4
02 00 00 00 # unk5
00 00 00 00 # unk6
00 00 00 00 # unk7
00 00 00 00 # unk8
d0 07 00 00 # unk9
00 00 00 00 # unk10
00 00 00 00 # unk11
02 00 00 00 # unk12
04 00 00 00 # unk13
00 00 00 00 # unk14
00 00 # unk15
*/

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			clanId: packet.readUInt32LE(),
			name: packet.readProudString(),
			markId: packet.readProudString(),
			class: packet.readProudString(),
			masterAccountId: packet.readUInt64LE(),
			masterLevel: packet.readUInt32LE(),
			masterName: packet.readProudString(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			description: packet.readProudString(),
			creationDate: packet.readProudString(),
			unk3: packet.readProudString(),
			unk4: packet.readProudString(),
			rank: packet.readUInt32LE(),
			unk5: packet.readUInt32LE(),
			unk6: packet.readUInt32LE(),
			unk7: packet.readUInt32LE(),
			clubPoints: packet.readUInt32LE(),
			unk8: packet.readUInt32LE(),
			wins: packet.readUInt32LE(),
			losses: packet.readUInt32LE(),
			ladderPoints: packet.readUInt32LE(),
			unk9: packet.readUInt32LE(),
			unk10: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(/*result, clanId*/) {
		var packet = new Packet()
		packet.writeUInt32LE(/*result*/0)
		packet.writeUInt32LE(/*clanId*/1)
		packet.writeProudString(/*name*/'Test')
		packet.writeProudString(/*markId*/'')
		packet.writeProudString(/*class*/'E')
		packet.writeUInt64LE(/*masterAccountId*/1)
		packet.writeUInt64LE(/*masterLevel*/80)
		packet.writeProudString(/*masterName*/'Master')
		packet.writeUInt32LE(/*unk1*/1)
		packet.writeUInt32LE(/*unk2*/3)
		packet.writeProudString(/*description*/' ')
		packet.writeProudString(/*creationDate*/'20150924143053')
		packet.writeProudString(/*unk3*/'')
		packet.writeProudString(/*unk4*/'')
		packet.writeUInt32LE(/*unk5*/2)
		packet.writeUInt32LE(/*unk6*/0)
		packet.writeUInt32LE(/*unk7*/0)
		packet.writeUInt32LE(/*unk8*/0)
		packet.writeUInt32LE(/*unk9*/2000)
		packet.writeUInt32LE(/*unk10*/0)
		packet.writeUInt32LE(/*unk11*/0)
		packet.writeUInt32LE(/*unk12*/2)
		packet.writeUInt32LE(/*unk13*/4)
		packet.writeUInt32LE(/*unk14*/0)
		packet.writeUInt16LE(/*unk15*/0)
		return packet.data.toBuffer()
	}
}