var Packet = require('../../../Network/Packet')
var ClubUnjoinerType = require('../Constants/ClubUnjoinerType')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unjoiners: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.unjoiners.push({
				playerId: packet.readUInt32LE(),
				name: packet.readProudString(),
				type: packet.readUInt32LE(),
				level: packet.readUInt32LE(),
				leaveDate: packet.readProudString()
			})
		}

		return deserialized
	},
	serialize: function() {
		var unjoiners = [
			{
				playerId: 3001,
				name: 'Test3001',
				type: ClubUnjoinerType.LeaveClan,
				level: 80,
				leaveDate: '20150607134039'
			},
			{
				playerId: 3002,
				name: 'Test3002',
				type: ClubUnjoinerType.TempLeave,
				level: 80,
				leaveDate: '20150607134039'
			},
			{
				playerId: 3003,
				name: 'Test3003',
				type: ClubUnjoinerType.PermLeave,
				level: 80,
				leaveDate: '20150607134039'
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(unjoiners.length)
		for (i = 0; i < unjoiners.length; i++) {
			var unjoiner = unjoiners[i]
			packet.writeUInt32LE(unjoiner.playerId)
			packet.writeProudString(unjoiner.name)
			packet.writeUInt32LE(unjoiner.type)
			packet.writeUInt32LE(unjoiner.level)
			packet.writeProudString(unjoiner.leaveDate)
		}
		return packet.data.toBuffer()
	}
}