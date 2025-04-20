var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			infos: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.infos.push({
				unk1: packet.readUInt32LE(),
				unk2: packet.readUInt32LE(),
				unk3: packet.readUInt32LE(),
				unk4: packet.readUInt32LE(),
				unk5: packet.readUInt32LE(),
				unk6: packet.readUInt32LE(),
				unk7: packet.readUInt32LE(),
				unk8: packet.readUInt32LE(),
				unk9: packet.readUInt32LE(),
				unk10: packet.readUInt32LE(),
				unk11: packet.readUInt32LE(),
				unk12: packet.readUInt32LE(),
				unk13: packet.readUInt8()
			})
		}

		return deserialized
	},
	serialize: function() {
		/*
		01 00 00 00

		32 00 00 00
		01 00 00 00
		01 00 00 00
		01 00 00 00
		00 00 00 00
		00 00 00 00
		00 00 00 00
		00 00 00 00
		16 01 00 00
		16 01 00 00
		16 01 00 00
		1a 8d 02 00
		01
		*/

		var infos = [
			{
				unk1: 50,
				unk2: 1,
				unk3: 1,
				unk4: 1,
				unk5: 0,
				unk6: 0,
				unk7: 0,
				unk8: 0,
				unk9: 278,
				unk10: 278,
				unk11: 278,
				unk12: 167194,
				unk13: 1
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(infos.length)
		for (var i = 0; i < infos.length; i++) {
			var info = infos[i]
			packet.writeUInt32LE(info.unk1)
			packet.writeUInt32LE(info.unk2)
			packet.writeUInt32LE(info.unk3)
			packet.writeUInt32LE(info.unk4)
			packet.writeUInt32LE(info.unk5)
			packet.writeUInt32LE(info.unk6)
			packet.writeUInt32LE(info.unk7)
			packet.writeUInt32LE(info.unk8)
			packet.writeUInt32LE(info.unk9)
			packet.writeUInt32LE(info.unk10)
			packet.writeUInt32LE(info.unk11)
			packet.writeUInt32LE(info.unk12)
			packet.writeUInt8(info.unk13)
		}
		return packet.data.toBuffer()
	}
}