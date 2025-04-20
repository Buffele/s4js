var Packet = require('../../../Network/Packet')
var ClubPlayerClass = require('../Constants/ClubPlayerClass')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			members: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.members.push({
				playerId: packet.readUInt64LE(),
				name: packet.readProudString(),
				unk1: packet.readUInt32LE(),
				class: packet.readUInt32LE(),
				unk2: packet.readUInt32LE(),
				signIn: packet.readProudString(),
				question1: packet.readProudString(),
				question2: packet.readProudString(),
				question3: packet.readProudString(),
				question4: packet.readProudString(),
				question5: packet.readProudString(),
				answer1: packet.readProudString(),
				answer2: packet.readProudString(),
				answer3: packet.readProudString(),
				answer4: packet.readProudString(),
				answer5: packet.readProudString()
			})
		}

		return deserialized
	},
	serialize: function() {
		var members = [
			{
				playerId: 1001,
				name: 'NewMember1',
				unk1: 0,
				class: ClubPlayerClass.Regular,
				unk2: 0,
				signIn: '20150510004453',
				question1: 'Question 1',
				question2: 'Question 2',
				question3: 'Question 3',
				question4: 'Question 4',
				question5: 'Question 5',
				answer1: 'Answer 1',
				answer2: 'Answer 2',
				answer3: 'Answer 3',
				answer4: 'Answer 4',
				answer5: 'Answer 5'
			},
			{
				playerId: 1002,
				name: 'NewMember2',
				unk1: 0,
				class: ClubPlayerClass.Normal,
				unk2: 0,
				signIn: '20150510004453',
				question1: 'Question 1',
				question2: 'Question 2',
				question3: 'Question 3',
				question4: 'Question 4',
				question5: 'Question 5',
				answer1: 'Answer 1',
				answer2: 'Answer 2',
				answer3: 'Answer 3',
				answer4: 'Answer 4',
				answer5: 'Answer 5'
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(members.length)
		for (i = 0; i < members.length; i++) {
			var member = members[i]
			packet.writeUInt64LE(member.playerId)
			packet.writeProudString(member.name)
			packet.writeUInt32LE(member.unk1)
			packet.writeUInt32LE(member.class)
			packet.writeUInt32LE(member.unk2)
			packet.writeProudString(member.signIn)
			packet.writeProudString(member.question1)
			packet.writeProudString(member.question2)
			packet.writeProudString(member.question3)
			packet.writeProudString(member.question4)
			packet.writeProudString(member.question5)
			packet.writeProudString(member.answer1)
			packet.writeProudString(member.answer2)
			packet.writeProudString(member.answer3)
			packet.writeProudString(member.answer4)
			packet.writeProudString(member.answer5)
		}
		return packet.data.toBuffer()
	}
}