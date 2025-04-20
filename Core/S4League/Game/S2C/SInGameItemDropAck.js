var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			// TODO
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(counter, itemId) {
		/*
		0a 00 00 00 // itemDropCounter
		03 00 00 00 // unk1 | 3??
		02 00 00 00 // unk2
		f0 2d 0f 21 // unk // 554642928
		d7 9d b2 1e // unk3 // 515022295
		44 a3       // unk4
		00 00       // unk6
		00
		0f          // 15 -> reload ammo?
		40 06       // 1600
		64 00       // unk8
		*/

		/*
		packet.writeUInt32LE(itemDropCounter)
		packet.writeUInt32LE(unk1)
		packet.writeUInt32LE(unk2)
		packet.writeUInt32LE(554642928)
		packet.writeUInt32LE(unk3)
		packet.writeUInt16LE(unk4)
		packet.writeUInt16LE(unk6)
		packet.writeUInt8(0)
		packet.writeUInt8(15) // 1 -> hp buff, 15 -> magazine buff
		packet.writeUInt16LE(1600)
		packet.writeUInt16LE(unk8)
		*/

		/*
		10 00 00 00
		03 00 00 00 flag 1
		02 00 00 00 flag 2
		d8 93 7d 0c

		if(flag2 != 4)
		{
		 b2 22 ba 1e
		}

		if(flag1 != 1)
		{
		 5f 98 00 00 00 01 40 06 64 00
		}
		else
		{
		 int64 (UID?)
		 int (itemID?
		 int
		 int
		 int
		 int counter
		 for i in counter:
		 {
		  int
		 }
		 byte
		 byte
		}
		*/

		/*
		PLAYER = 1,
		OBJECT = 2,
		AI = 3,
		SEIZE = 4,
		MISSION = 5
		*/
		var fromType = 3
		/*
		ITEM = 1
		BUFF = 2
		*/
		var type = 2
		var removeTime = 2147483647 // 209556440
		//var position = { x: 0.0078125, y: 999424, z: 0.0078125 }
		var x = 1//pos//-7672//-245.75
		var y = -11000//pos//14729//345
		var z = 1//pos//16324//-1672

		type = 1
		var accountId = 0
		var shopId = 1
		var colorId = 0
		var enchantLevel = 0
		var effects = []
		//var curAmmo = 250
		var maxAmmo = -1

		var packet = new Packet()
		packet.writeUInt32LE(counter)
		packet.writeUInt32LE(fromType)
		packet.writeUInt32LE(type)
		packet.writeUInt32LE(removeTime)
		if (fromType != 4) {
			packet.writeUInt16LE(BinaryUtil.compressFloat(x))
			packet.writeUInt16LE(BinaryUtil.compressFloat(y))
			packet.writeUInt16LE(BinaryUtil.compressFloat(z))
		}
		if (type == 1) {
			packet.writeUInt64LE(accountId)
			packet.writeUInt32LE(itemId)
			packet.writeUInt32LE(shopId)
			packet.writeUInt32LE(colorId)
			packet.writeUInt32LE(enchantLevel)
			
			packet.writeUInt32LE(effects.length)
			for (iEffect = 0; iEffect < effects.length; iEffect++) {
				packet.writeUInt32LE(effects[iEffect])
			}
			packet.writeUInt16LE(curAmmo)
			packet.writeUInt16LE(maxAmmo)
		} else if (type == 2) {
			//packet.writeUInt64LE(buffUid)
			packet.writeBuffer(new Buffer([
				0x00, 0x00, 0x00, 0x0f, // Buff effect
				0x40, 0x06, // CurrAmmo (1600 - SP?)
				0x64, 0x00 // Max Ammo (100)
			]))
		}
		return packet.data.toBuffer()
	}
}