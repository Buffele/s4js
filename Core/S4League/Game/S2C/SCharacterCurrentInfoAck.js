var Packet = require('../../../Network/Packet')

class AvatarID {
    constructor() {
        this._bitField = 0;  // Holds the first 32 bits (sex, hair, face, etc.)
        this._id = 0;        // Holds m_uiID
    }

    // Bit positions and masks
    static #MASKS = {
        SEX:    { bits: 1,  shift: 0,  mask: 0b1 },
        HAIR:   { bits: 6,  shift: 1,  mask: 0b111111 },
        FACE:   { bits: 6,  shift: 7,  mask: 0b111111 },
        COAT:   { bits: 5,  shift: 13, mask: 0b11111 },
        PANTS:  { bits: 5,  shift: 18, mask: 0b11111 },
        VOCAL:  { bits: 5,  shift: 23, mask: 0b11111 },
        SLOT:   { bits: 4,  shift: 28, mask: 0b1111 }
    };

    // Getters
    get sex()   { return (this._bitField >> AvatarID.#MASKS.SEX.shift)   & AvatarID.#MASKS.SEX.mask; }
    get hair()  { return (this._bitField >> AvatarID.#MASKS.HAIR.shift)  & AvatarID.#MASKS.HAIR.mask; }
    get face()  { return (this._bitField >> AvatarID.#MASKS.FACE.shift)  & AvatarID.#MASKS.FACE.mask; }
    get coat()  { return (this._bitField >> AvatarID.#MASKS.COAT.shift)  & AvatarID.#MASKS.COAT.mask; }
    get pants() { return (this._bitField >> AvatarID.#MASKS.PANTS.shift) & AvatarID.#MASKS.PANTS.mask; }
    get vocal() { return (this._bitField >> AvatarID.#MASKS.VOCAL.shift) & AvatarID.#MASKS.VOCAL.mask; }
    get slot()  { return (this._bitField >> AvatarID.#MASKS.SLOT.shift)  & AvatarID.#MASKS.SLOT.mask; }
    get id()    { return this._id; }

    // Setters
    set sex(value) {
        this._bitField = (this._bitField & ~(AvatarID.#MASKS.SEX.mask << AvatarID.#MASKS.SEX.shift)) |
                        ((value & AvatarID.#MASKS.SEX.mask) << AvatarID.#MASKS.SEX.shift);
    }
    
    set hair(value) {
        this._bitField = (this._bitField & ~(AvatarID.#MASKS.HAIR.mask << AvatarID.#MASKS.HAIR.shift)) |
                        ((value & AvatarID.#MASKS.HAIR.mask) << AvatarID.#MASKS.HAIR.shift);
    }
    
    set face(value) {
        this._bitField = (this._bitField & ~(AvatarID.#MASKS.FACE.mask << AvatarID.#MASKS.FACE.shift)) |
                        ((value & AvatarID.#MASKS.FACE.mask) << AvatarID.#MASKS.FACE.shift);
    }
    
    set coat(value) {
        this._bitField = (this._bitField & ~(AvatarID.#MASKS.COAT.mask << AvatarID.#MASKS.COAT.shift)) |
                        ((value & AvatarID.#MASKS.COAT.mask) << AvatarID.#MASKS.COAT.shift);
    }
    
    set pants(value) {
        this._bitField = (this._bitField & ~(AvatarID.#MASKS.PANTS.mask << AvatarID.#MASKS.PANTS.shift)) |
                        ((value & AvatarID.#MASKS.PANTS.mask) << AvatarID.#MASKS.PANTS.shift);
    }
    
    set vocal(value) {
        this._bitField = (this._bitField & ~(AvatarID.#MASKS.VOCAL.mask << AvatarID.#MASKS.VOCAL.shift)) |
                        ((value & AvatarID.#MASKS.VOCAL.mask) << AvatarID.#MASKS.VOCAL.shift);
    }
    
    set slot(value) {
        this._bitField = (this._bitField & ~(AvatarID.#MASKS.SLOT.mask << AvatarID.#MASKS.SLOT.shift)) |
                        ((value & AvatarID.#MASKS.SLOT.mask) << AvatarID.#MASKS.SLOT.shift);
    }
    
    set id(value) {
        this._id = value >>> 0;  // Ensure 32-bit unsigned integer
    }
}


module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			slot: packet.readUInt8(),
			skillCounter: packet.readUInt8(),
			weaponCounter: packet.readUInt8(),
			avatar: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(slot, gender) {
		const avatar = new AvatarID();
		avatar.sex = gender;
		avatar.id = slot;

		var packet = new Packet()
		packet.writeUInt8(slot) // character slot
		packet.writeUInt8(1) // skill counter
		packet.writeUInt8(3) // weapon counter
		packet.writeUInt32LE(avatar._bitField) // avatar
		return packet.data.toBuffer()
	}
}