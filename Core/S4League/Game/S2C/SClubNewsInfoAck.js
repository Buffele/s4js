var Packet = require('../../../Network/Packet')
var ClubNewsInfoType = require('../Constants/ClubNewsInfoType')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			news: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.news.push({
				type: packet.readUInt32LE(),
				key: packet.readProudString(),
				timestamp: packet.readProudString()
			})
		}

		return deserialized
	},
	serialize: function() {
		var newss = [
			{
				type: ClubNewsInfoType.MemberLevelUpdate,
				key: '<News Key ="0" Cnt ="3" Param1="Test5001" Param2="5" Param3="3"  />',
				timestamp: '20150607202550'
			},
			{
				type: ClubNewsInfoType.SignedOutMember,
				key: '<News Key ="0" Cnt ="1" Param1="Test5001"  />',
				timestamp: '20150607202337'
			},
			{
				type: ClubNewsInfoType.Unknown,
				key: '<News Key ="0" Cnt ="2" Param1="Test5001" Param2="1"  />',
				timestamp: '20150607202005'
			},
			{
				type: ClubNewsInfoType.ClanNews,
				key: '<News Key ="2" Cnt ="0"  />',
				timestamp: '20150607201702'
			},
			{
				type: ClubNewsInfoType.MemberLevelUpdate,
				key: '<News Key ="0" Cnt ="3" Param1="Test5001" Param2="5" Param3="3"  />',
				timestamp: '20150607200715'
			},
			{
				type: ClubNewsInfoType.SignedOutMember,
				key: '<News Key ="0" Cnt ="1" Param1="Test5001"  />',
				timestamp: '20150607200700'
			},
			{
				type: ClubNewsInfoType.Unknown,
				key: '<News Key ="0" Cnt ="2" Param1="Test5001" Param2="1"  />',
				timestamp: '20150607200327'
			},
			{
				type: ClubNewsInfoType.MemberLevelUpdate,
				key: '<News Key ="0" Cnt ="3" Param1="Test5002" Param2="5" Param3="3"  />',
				timestamp: '20150607200035'
			},
			{
				type: ClubNewsInfoType.MyNews,
				key: '<News Key ="4" Cnt ="2" Param1="5" Param2="3"  />',
				timestamp: '20150607200035'
			},
			{
				type: ClubNewsInfoType.SignedOutMember,
				key: '<News Key ="0" Cnt ="1" Param1="Test5002"  />',
				timestamp: '20150607200030'
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(newss.length)
		for (i = 0; i < newss.length; i++) {
			var news = newss[i]
			packet.writeUInt32LE(news.type)
			packet.writeProudString(news.key)
			packet.writeProudString(news.timestamp)
		}
		return packet.data.toBuffer()
	}
}