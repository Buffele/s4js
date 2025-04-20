var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			totalPosts: packet.readUInt32LE(),
			posts: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.posts.push({
				id: packet.readUInt32LE(),
				clanMarkId: packet.readProudString(),
				unk1: packet.readUInt32LE(),
				playerId: packet.readUInt32LE(),
				level: packet.readUInt32LE(),
				name: packet.readProudString(),
				clanClass: packet.readUInt32LE(),
				text: packet.readProudString(),
				timestamp: packet.readProudString(),
				unk2: packet.readUInt32LE(),
				parentPostId: packet.readUInt32LE(),
				internal: packet.readUInt8(),
				clanId: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(/*totalPosts, posts*/) {
		var posts = [
			{
				id: 1,
				clanMarkId: '0-0-0',
				unk1: 0,
				playerId: 1,
				level: 80,
				name: 'Test1',
				clanClass: 1,
				text: 'Hi',
				timestamp: '20150607202318',
				unk2: 1,
				parentPostId: 0,
				internal: 0,
				clanId: 1
			},
			{
				id: 2,
				clanMarkId: '0-0-0',
				unk1: 1,
				playerId: 2,
				level: 80,
				name: 'Test2',
				clanClass: 2,
				text: 'Ho',
				timestamp: '20150607202318',
				unk2: 0,
				parentPostId: 2,
				internal: 1,
				clanId: 1
			},
			{
				id: 3,
				clanMarkId: '0-0-0',
				unk1: 0,
				playerId: 2,
				level: 80,
				name: 'Test2',
				clanClass: 2,
				text: 'Hu',
				timestamp: '20150607202318',
				unk2: 0,
				parentPostId: 0,
				internal: 1,
				clanId: 1
			}
		]

		var packet = new Packet()
		packet.writeUInt32LE(/*totalPosts*/1000)
		packet.writeUInt32LE(posts.length)
		for (i = 0; i < posts.length; i++) {
			var post = posts[i]
			packet.writeUInt32LE(post.id)
			packet.writeProudString(post.clanMarkId)
			packet.writeUInt32LE(post.unk1)
			packet.writeUInt32LE(post.playerId)
			packet.writeUInt32LE(post.level)
			packet.writeProudString(post.name)
			packet.writeUInt32LE(post.clanClass)
			packet.writeProudString(post.text)
			packet.writeProudString(post.timestamp)
			packet.writeUInt32LE(post.unk2)
			packet.writeUInt32LE(post.parentPostId)
			packet.writeUInt8(post.internal)
			packet.writeUInt32LE(post.clanId)
		}
		return packet.data.toBuffer()
	}
}