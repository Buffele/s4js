var Packet = require('../../../Network/Packet')
var ClubActivityArea = require('../Constants/ClubActivityArea')
var ClubActivityPurpose = require('../Constants/ClubActivityPurpose')
var ClubClass = require('../Constants/ClubClass')
var ClubState = require('../Constants/ClubState')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: packet.readUInt32LE(),
			clanMarkId: packet.readProudString(),
			name: packet.readProudString(),
			memberCount: packet.readUInt32LE(),
			master: packet.readProudString(),
			creationDate: packet.readProudString(),
			activityArea: packet.readUInt32LE(),
			activityPurpose: packet.readUInt32LE(),
			wins: packet.readUInt32LE(),
			loses: packet.readUInt32LE(),
			class: packet.readUInt32LE(),
			unk1: packet.readUInt32LE(),
			introduction: packet.readProudString(),
			announcement: packet.readProudString(),
			state: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			unk4: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(/*clan*/) {
		var packet = new Packet()
		packet.writeUInt32LE(/*clan.id*/1)
		packet.writeProudString(/*clan.markId*/'0-0-0')
		packet.writeProudString(/*clan.name*/'TestClub001')
		packet.writeUInt32LE(/*clan.memberCount*/1337)
		packet.writeProudString(/*clan.master*/'Netrunner')
		packet.writeProudString(/*clan.creationDate*/'20090821194111')
		packet.writeUInt32LE(/*clan.activityArea*/ClubActivityArea.England)
		packet.writeUInt32LE(/*clan.activityPurpose*/ClubActivityPurpose.KnowHowTransfer)
		packet.writeUInt32LE(/*clan.wins*/100)
		packet.writeUInt32LE(/*clan.loses*/50)
		packet.writeUInt32LE(/*clan.class*/ClubClass.C)
		packet.writeUInt32LE(0) // unk1
		packet.writeProudString(/*clan.introduction*/'Let\'s get ready to Play.')
		packet.writeProudString(/*clan.announcement*/'Play Shit.')
		packet.writeUInt32LE(/*clan.state*/ClubState.RegularClan)
		packet.writeUInt32LE(0) // unk2
		packet.writeUInt32LE(0) // unk3
		packet.writeUInt32LE(0) // unk4
		return packet.data.toBuffer()
	}
}