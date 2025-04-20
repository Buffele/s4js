var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			matches: packet.readUInt32LE(),
			unk1: packet.readUInt32LE(),
			wins: packet.readUInt32LE(),
			loses: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			playtime: packet.readUInt32LE(),
			isGM: packet.readUInt8(),
			unk4: packet.readUInt32LE(),
			level: packet.readUInt8(),
			unk5: packet.readUInt8(),
			exp: packet.readUInt32LE(),
			points: packet.readUInt32LE(),
			pen: packet.readUInt32LE(),
			unk6: packet.readUInt32LE(),
			name: packet.readProudString(),
			unk7: packet.readUInt32LE(),
			statistics1: packet.readUInt32LE(),
			statistics2: packet.readUInt32LE(),
			statistics3: packet.readUInt32LE(),
			statistics4: packet.readUInt32LE(),
			statistics5: packet.readUInt32LE(),
			statistics6: packet.readUInt32LE(),
			statistics7: packet.readUInt32LE(),
			statistics8: packet.readUInt32LE(),
			statistics9: packet.readUInt32LE(),
			statistics10: packet.readUInt32LE(),
			statistics11: packet.readUInt32LE(),
			statistics12: packet.readUInt32LE(),
			statistics13: packet.readUInt32LE(),
			statistics14: packet.readUInt32LE(),
			statistics15: packet.readUInt32LE(),
			statistics16: packet.readUInt32LE(),
			statistics17: packet.readUInt32LE(),
			statistics18: packet.readUInt32LE(),
			statistics19: packet.readUInt32LE(),
			statistics20: packet.readUInt32LE(),
			statistics21: packet.readUInt32LE(),
			statistics22: packet.readUInt32LE(),
			statistics23: packet.readUInt32LE(),
			statistics24: packet.readUInt32LE(),
			statistics25: packet.readUInt32LE(),
			statistics26: packet.readUInt32LE(),
			statistics27: packet.readUInt32LE(),
			statistics28: packet.readUInt32LE(),
			statistics29: packet.readUInt32LE(),
			statistics30: packet.readUInt32LE(),
			statistics31: packet.readUInt32LE(),
			statistics32: packet.readUInt32LE(),
			statistics33: packet.readUInt32LE(),
			statistics34: packet.readUInt32LE(),
			statistics35: packet.readUInt32LE(),
			statistics36: packet.readUInt32LE(),
			brFirstPlaceKills: packet.readUInt32LE(),
			brFirstPlaces: packet.readUInt32LE(),
			statistics37: packet.readUInt32LE(),
			statistics38: packet.readUInt32LE(),
			statistics39: packet.readUInt32LE(),
			statistics40: packet.readUInt32LE(),
			statistics41: packet.readUInt32LE(),
			statistics42: packet.readUInt32LE(),
			statistics43: packet.readUInt32LE(),
			statistics44: packet.readUInt32LE(),
			statistics45: packet.readUInt32LE(),
			statistics46: packet.readUInt32LE(),
			statistics47: packet.readUInt32LE(),
			statistics48: packet.readUInt32LE(),
			statistics49: packet.readUInt32LE(),
			statistics50: packet.readUInt32LE(),
			statistics51: packet.readUInt32LE(),
			statistics52: packet.readUInt32LE(),
			statistics53: packet.readUInt32LE(),
			statistics54: packet.readUInt32LE(),
			statistics55: packet.readUInt32LE(),
			statistics56: packet.readUInt32LE(),
			statistics57: packet.readUInt32LE(),
			statistics58: packet.readUInt32LE(),
			statistics59: packet.readUInt32LE(),
			statistics60: packet.readUInt32LE(),
			statistics61: packet.readUInt32LE(),
			statistics62: packet.readUInt32LE(),
			statistics63: packet.readUInt32LE(),
			statistics64: packet.readUInt32LE(),
			statistics65: packet.readUInt32LE(),
			statistics66: packet.readUInt32LE(),
			statistics67: packet.readUInt32LE(),
			statistics68: packet.readUInt32LE(),
			statistics69: packet.readUInt32LE(),
			statistics70: packet.readUInt32LE(),
			statistics71: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(player) {
		var packet = new Packet()
		packet.writeUInt32LE(player.matches)
		packet.writeUInt32LE(6) // unk1
		packet.writeUInt32LE(player.wins)
		packet.writeUInt32LE(player.loses)
		packet.writeUInt32LE(5) // unk2
		packet.writeUInt32LE(0) // unk3
		packet.writeUInt32LE(player.playtime)
		packet.writeUInt8(player.isGM)
		packet.writeUInt32LE(4) // unk4
		packet.writeUInt8(player.level)
		packet.writeUInt8(1) // unk5
		packet.writeUInt32LE(player.exp)
		packet.writeUInt32LE(0) // combi
		packet.writeUInt32LE(player.pen)
		packet.writeUInt32LE(player.pen)
		packet.writeUInt32LE(1) // unk6
		packet.writeProudString(player.name)
		packet.writeUInt32LE(0) // unk7
		packet.writeUInt32LE(1044) // statistics1
		packet.writeUInt32LE(0) // statistics2
		packet.writeUInt32LE(12) // statistics3
		packet.writeUInt32LE(6) // statistics4
		packet.writeUInt32LE(2) // statistics5
		packet.writeUInt32LE(0) // statistics6
		packet.writeUInt32LE(17) // statistics7
		packet.writeUInt32LE(0) // statistics8
		packet.writeUInt32LE(0) // statistics9
		packet.writeUInt32LE(0) // statistics10
		packet.writeUInt32LE(0) // statistics11
		packet.writeUInt32LE(4) // statistics12
		packet.writeUInt32LE(0) // statistics13
		packet.writeUInt32LE(6) // statistics14
		packet.writeUInt32LE(0) // statistics15
		packet.writeUInt32LE(3) // statistics16
		packet.writeUInt32LE(0) // statistics17
		packet.writeUInt32LE(0) // statistics18
		packet.writeUInt32LE(0) // statistics19
		packet.writeUInt32LE(0) // statistics20
		packet.writeUInt32LE(0) // statistics21
		packet.writeUInt32LE(0) // statistics22
		packet.writeUInt32LE(3) // statistics23
		packet.writeUInt32LE(0) // statistics24
		packet.writeUInt32LE(0) // statistics25
		packet.writeUInt32LE(0) // statistics26
		packet.writeUInt32LE(0) // statistics27
		packet.writeUInt32LE(4) // statistics28
		packet.writeUInt32LE(0) // statistics29
		packet.writeUInt32LE(3) // statistics30
		packet.writeUInt32LE(0) // statistics31
		packet.writeUInt32LE(2) // statistics32
		packet.writeUInt32LE(0) // statistics33
		packet.writeUInt32LE(64) // statistics34
		packet.writeUInt32LE(4) // statistics35
		packet.writeUInt32LE(1098907648) // statistics36
		packet.writeUInt32LE(100) // brFirstPlaceKills
		packet.writeUInt32LE(200) // brFirstPlaces
		packet.writeUInt32LE(0) // statistics37
		packet.writeUInt32LE(0) // statistics38
		packet.writeUInt32LE(0) // statistics39
		packet.writeUInt32LE(0) // statistics40
		packet.writeUInt32LE(0) // statistics41
		packet.writeUInt32LE(0) // statistics42
		packet.writeUInt32LE(0) // statistics43
		packet.writeUInt32LE(0) // statistics44
		packet.writeUInt32LE(0) // statistics45
		packet.writeUInt32LE(2) // statistics46
		packet.writeUInt32LE(0) // statistics47
		packet.writeUInt32LE(5) // statistics48
		packet.writeUInt32LE(99) // statistics49
		packet.writeUInt32LE(0) // statistics50
		packet.writeUInt32LE(1) // statistics51
		packet.writeUInt32LE(0) // statistics52
		packet.writeUInt32LE(0) // statistics53
		packet.writeUInt32LE(0) // statistics54
		packet.writeUInt32LE(1) // statistics55
		packet.writeUInt32LE(2) // statistics56
		packet.writeUInt32LE(0) // statistics57
		packet.writeUInt32LE(0) // statistics58
		packet.writeUInt32LE(0) // statistics59
		packet.writeUInt32LE(0) // statistics60
		packet.writeUInt32LE(0) // statistics61
		packet.writeUInt32LE(4) // statistics62
		packet.writeUInt32LE(2) // statistics63
		packet.writeUInt32LE(0) // statistics64
		packet.writeUInt32LE(0) // statistics65
		packet.writeUInt32LE(0) // statistics66
		packet.writeUInt32LE(0) // statistics67
		packet.writeUInt32LE(0) // statistics68
		packet.writeUInt32LE(0) // statistics69
		packet.writeUInt32LE(0) // statistics70
		packet.writeUInt32LE(0) // statistics71
		return packet.data.toBuffer()
	}
}