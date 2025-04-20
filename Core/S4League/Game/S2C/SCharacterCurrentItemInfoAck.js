var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			slot: packet.readUInt8(),
			weaponCount: packet.readUInt32LE(),
			weaponPosition1: packet.readUInt8(),
			weaponItemId1: packet.readUInt64LE(),
			weaponPosition2: packet.readUInt8(),
			weaponItemId2: packet.readUInt64LE(),
			weaponPosition3: packet.readUInt8(),
			weaponItemId3: packet.readUInt64LE(),
			skillCount: packet.readUInt32LE(),
			skillPosition1: packet.readUInt8(),
			skillItemId1: packet.readUInt64LE(),
			clothesCount: packet.readUInt32LE(),
			clothesPosition1: packet.readUInt8(),
			clothesItemId1: packet.readUInt64LE(),
			clothesPosition2: packet.readUInt8(),
			clothesItemId2: packet.readUInt64LE(),
			clothesPosition3: packet.readUInt8(),
			clothesItemId3: packet.readUInt64LE(),
			clothesPosition4: packet.readUInt8(),
			clothesItemId4: packet.readUInt64LE(),
			clothesPosition5: packet.readUInt8(),
			clothesItemId5: packet.readUInt64LE(),
			clothesPosition6: packet.readUInt8(),
			clothesItemId6: packet.readUInt64LE(),
			clothesPosition7: packet.readUInt8(),
			clothesItemId7: packet.readUInt64LE(),
			clothesPosition8: packet.readUInt8(),
			clothesItemId8: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(slot) {
		var packet = new Packet()
		packet.writeUInt8(slot) // character slot

		// weapons
		packet.writeUInt32LE(3)
		for (var i = 0; i < 3; i++) {
			packet.writeUInt8(i);    // slot
			packet.writeUInt64LE(0); // item id
		}

		// skills
		packet.writeUInt32LE(1)
		for (var i = 0; i < 1; i++) {
			packet.writeUInt8(i);    // slot
			packet.writeUInt64LE(0); // item id
		}

		// costumes
		packet.writeUInt32LE(8)
		for (var i = 0; i < 8; i++) {
			packet.writeUInt8(i);    // slot
			packet.writeUInt64LE(0); // item id
		}

		return packet.data.toBuffer()
	}
}