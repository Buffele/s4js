var Packet = require('../../../Network/Packet')
var ClubPlayerClass = require('../Constants/ClubPlayerClass')
var ClubState = require('../Constants/ClubState')

// No Clan: All empty
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: packet.readUInt32LE(),
			markId: packet.readProudString(),
			name: packet.readProudString(),
			state: packet.readUInt32LE(),
			unk1: packet.readUInt32LE(),
			class: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			leaguePointWin: packet.readUInt32LE(),
			leaguePointLose: packet.readUInt32LE(),
			contributionPointWin: packet.readUInt32LE(),
			contributionPointLose: packet.readUInt32LE(),
			reOpen: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(clan) {
		var packet = new Packet()
		packet.writeUInt32LE(clan.id)
		packet.writeProudString(clan.markId)
		packet.writeProudString(clan.name)
		packet.writeUInt32LE(/*clan.state*/ClubState.RegularClan)
		packet.writeUInt32LE(0) // unk1
		packet.writeUInt32LE(/*clan.class*/ClubPlayerClass.Master)
		packet.writeUInt32LE(0) // unk2
		packet.writeUInt32LE(0) // unk3
		packet.writeUInt32LE(1) // League Point Ranking Win
		packet.writeUInt32LE(2) // League Point Ranking Lose
		packet.writeUInt32LE(3) // Contribution Point Ranking Win
		packet.writeUInt32LE(4) // Contribution Point Ranking Lose
		packet.writeUInt8(0) // Reopen clan (All except Clan ID, Clanmark ID and Clan Name needs to be empty)
		return packet.data.toBuffer()
	}
}