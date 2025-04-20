var Packet = require('../../../Network/Packet')

/*
NOTE KEYS

CLAN CREATION?
<Note Key="1" Cnt="0"/> // TODO: Validate it!
// TODO: Key 2

CLAN DELETION?
TODO: Key 3
TODO: Key 4

CLAN INVITATION ACCEPTED (OTHER)
SUBJECT: <Note Key="5" Cnt="2" Param1="Test" Param2="1"/> // Param1 -> Player Name
TEXT: <Note Key="6" Srl="1" Cnt="3" Param1="20150607200700" Param2="Test" Param3="1"/> // Srl -> Clan ID, Param1 -> Timestamp, 2 -> Param2 -> Player Name

PENDING PLAYER
SUBJECT: <Note Key="7" Cnt="0"/>
TEXT: <Note Key="8" Srl="1" Cnt="2" Param1="20150607202303" Param2="Name"/> // Srl -> Clan ID, Param1 -> Timestamp, 2 -> Param2 -> Player Name

CLAN INVITATION ACCEPTED (OWN)
<Note Key="9" Cnt="2" Param1="Test" Param2="1"/> // Param1 -> Clan Name
<Note Key="10" Srl="1" Cnt="2" Param1="Test" Param2="1"/> // Srl -> Clan ID, Param1 -> Clan Name

CLAN LEVEL CHANGED
SUBJECT: <Note Key="11" Cnt="0"/>
TEXT: <Note Key="12" Srl="0" Cnt="3" Param1="Test" Param2="5" Param3="3"/> // Param1 -> Player Name, Param2 -> New Class, Param3 -> Old Class

SIGNED OUT
SUBJECT: <Note Key="13" Cnt="0"/>
TEXT: <Note Key="14" Srl="0" Cnt="3" Param1="20150608183016" Param2="Test" Param3="1"/> // Param2 -> Player Name
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			pageCount: packet.readUInt32LE(),
			currentPage: packet.readUInt8(),
			filter: packet.readUInt32LE(),
			notes: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.notes.push({
				noteId: packet.readUInt64LE(),
				name: packet.readProudString(),
				type: packet.readUInt32LE(),
				senderAccountId: packet.readUInt64LE(),
				receiverAccountId: packet.readUInt64LE(),
				subject: packet.readProudString(),
				read: packet.readUInt32LE(),
				unk: packet.readUInt8(),
				expireDays: packet.readUInt8()
			})
		}

		return deserialized
	},
	serialize: function(pageCount, currentPage, filter, notes) {
		var packet = new Packet()
		packet.writeUInt32LE(pageCount)
		packet.writeUInt8(currentPage)
		packet.writeUInt32LE(filter)
		packet.writeUInt32LE(notes.length)
		for (i = 0; i < notes.length; i++) {
			var note = notes[i]
			packet.writeUInt64LE(note.noteId)
			packet.writeProudString(note.name)
			packet.writeUInt32LE(note.type)
			packet.writeUInt64LE(note.senderAccountId)
			packet.writeUInt64LE(note.receiverAccountId)
			packet.writeProudString(note.subject)
			packet.writeUInt32LE(note.read) // 0 -> unread, 1 -> read
			packet.writeUInt8(note.unk)
			packet.writeUInt8(note.expireDays)
		}
		return packet.data.toBuffer()
	}
}