var Packet = require('../../../Network/Packet')

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
				class: packet.readUInt32LE(),
				rank: packet.readUInt32LE(),
				joinDate: packet.readProudString(),
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
		var joinWaiters = [
			{
				playerId: 4001,
				name: 'Test4001',
				class: 5,
				rank: 0,
				joinDate: '20150607200412',
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
		packet.writeUInt32LE(joinWaiters.length)
		for (i = 0; i < joinWaiters.length; i++) {
			var joinWaiter = joinWaiters[i]
			packet.writeUInt64LE(joinWaiter.playerId)
			packet.writeProudString(joinWaiter.name)
			packet.writeUInt32LE(joinWaiter.class)
			packet.writeUInt32LE(joinWaiter.rank)
			packet.writeProudString(joinWaiter.joinDate)
			packet.writeProudString(joinWaiter.question1)
			packet.writeProudString(joinWaiter.question2)
			packet.writeProudString(joinWaiter.question3)
			packet.writeProudString(joinWaiter.question4)
			packet.writeProudString(joinWaiter.question5)
			packet.writeProudString(joinWaiter.answer1)
			packet.writeProudString(joinWaiter.answer2)
			packet.writeProudString(joinWaiter.answer3)
			packet.writeProudString(joinWaiter.answer4)
			packet.writeProudString(joinWaiter.answer5)
		}
		return packet.data.toBuffer()
	}
}