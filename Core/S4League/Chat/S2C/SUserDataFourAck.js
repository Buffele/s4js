var Packet = require('../../../Network/Packet')
var UserDataFourResult = require('../Constants/UserDataFourResult')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			userData: {

			}
		}

		if(deserialized.result === UserDataFourResult.Blocked || deserialized.result === UserDataFourResult.Friend) {
			return deserialized
		}

		var userData = {
			name: packet.readProudString(),
			accountId: packet.readUInt64LE(),
			exp: packet.readUInt32LE(),
			clanId: packet.readUInt32LE(),
			clanMarkId: packet.readProudString(),
			clanName: packet.readProudString(),
			level: packet.readUInt32LE(),
			playtime: packet.readUInt32LE(),
			matchesPlayed: packet.readUInt32LE(),
			matchesWon: packet.readUInt32LE(),
			matchesLost: packet.readUInt32LE(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			// GENERAL STATS
			generalKillDeathRate: packet.readFloatLE(),
			generalTdPoints: packet.readFloatLE(),
			generalDmPoints: packet.readFloatLE(),
			generalChaserSurvivabilityRate: packet.readFloatLE(),
			generalBrPoints: packet.readFloatLE(),
			generalCaptainPoints: packet.readFloatLE(),
			generalSiegePoints: packet.readFloatLE(),
			generalArenaPoints: packet.readFloatLE(),
			// TD STATS
			tdWinRate: packet.readFloatLE(),
			tdPoints: packet.readFloatLE(),
			tdMatchesWon: packet.readFloatLE(),
			tdDefensePoints: packet.readFloatLE(),
			tdOffensePoints: packet.readFloatLE(),
			tdKillRate: packet.readFloatLE(),
			tdHealPoints: packet.readFloatLE(),
			// DM STATS
			dmWinRate: packet.readFloatLE(),
			dmKillDeathRatePercentage: packet.readFloatLE(),
			dmKillDeathRate: packet.readFloatLE(),
			dmKillRate: packet.readFloatLE(),
			dmAssistPoints: packet.readFloatLE(),
			dmHealPoints: packet.readFloatLE(),
			// BR STATS
			brFirstPlaceKills: packet.readUInt32LE(),
			brFirstPlaces: packet.readUInt32LE(),
			// CHASER STATS
			chaserKillsAll: packet.readFloatLE(),
			chaserKills: packet.readFloatLE(),
			// CAPTAIN STATS
			captainKills: packet.readUInt32LE(),
			captainDominations: packet.readUInt32LE(),
			// SIEGE STATS
			siegeWinRate: packet.readFloatLE(),
			siegeCapturePoints: packet.readFloatLE(),
			siegeBattlePoints: packet.readFloatLE(),
			siegeMainCoreCapturePoints: packet.readFloatLE(),
			siegeItemObtainPoints: packet.readFloatLE(),
			// ARENA STATS
			arenaWinRate: packet.readFloatLE(),
			arenaKillDeathRate: packet.readFloatLE(),
			arenaKillDeathRatePercentage: packet.readFloatLE(),
			arenaDoubleKillRate: packet.readFloatLE(),
			arenaTripleKillRate: packet.readFloatLE(),
			arenaShortestKillTime: packet.readUInt32LE(),
			arenaLeaderShowdowns: packet.readUInt32LE(),
			arenaLeaderKills: packet.readUInt32LE(),
			// CHAR INFOS
			gender: packet.readUInt8(),
			// CLOTHES
			clothesCount: 0,
			clothes: [],
			weaponsCount: 0,
			weapons: [],
			skillsCount: 0,
			skills: []
		}

		// CLOTHES
		userData.clothesCount = packet.readUInt32LE()
		userData.clothesCount = 8 // S4 League is stupid

		//if(userData.clothesCount < 8) {
		//	die()
		//}

		// CLOTHES INFO
		for (var i = 0; i < userData.clothesCount; i++) {
			var clothes = {
				itemId: packet.readUInt32LE(),
				shopId: packet.readUInt32LE(),
				periodType: packet.readUInt32LE(),
				period: packet.readUInt16LE(),
				color: packet.readUInt8(),
				effectsCount: packet.readUInt32LE(),
				effects: []
			}
			for (var i_ = 0; i_ < clothes.effectsCount; i_++) {
				clothes.effects.push({
					effectId: packet.readUInt32LE()
				})
			}
			clothes.enchantLevel = packet.readUInt32LE()
			clothes.unk = packet.readUInt32LE()
			userData.clothes.push(clothes)
		}

		// WEAPONS
		userData.weaponsCount = packet.readUInt32LE()
		userData.weaponsCount = 3 // S4 League is stupid

		//if(userData.weaponsCount < 3) {
		//	die()
		//}

		// WEAPONS INFO
		for (var i = 0; i < userData.weaponsCount; i++) {
			var weapon = {
				itemId: packet.readUInt32LE(),
				shopId: packet.readUInt32LE(),
				periodType: packet.readUInt32LE(),
				period: packet.readUInt16LE(),
				color: packet.readUInt8(),
				effectsCount: packet.readUInt32LE(),
				effects: []
			}
			for (var i_ = 0; i_ < weapon.effectsCount; i_++) {
				weapon.effects.push({
					effectId: packet.readUInt32LE()
				})
			}
			weapon.enchantLevel = packet.readUInt32LE()
			weapon.unk = packet.readUInt32LE()
			userData.weapons.push(weapon)
		}

		// SKILLS
		userData.skillsCount = packet.readUInt32LE()
		userData.skillsCount = 1 // S4 League is stupid

		//if(userData.skillsCount < 1) {
		//	die()
		//}

		// SKILLS INFO
		for (var i = 0; i < userData.skillsCount; i++) {
			var skill = {
				itemId: packet.readUInt32LE(),
				shopId: packet.readUInt32LE(),
				periodType: packet.readUInt32LE(),
				period: packet.readUInt16LE(),
				color: packet.readUInt8(),
				effectsCount: packet.readUInt32LE(),
				effects: []
			}
			for (var i_ = 0; i_ < skill.effectsCount; i_++) {
				skill.effects.push({
					effectId: packet.readUInt32LE()
				})
			}
			skill.enchantLevel = packet.readUInt32LE()
			skill.unk = packet.readUInt32LE()
			userData.skills.push(skill)
		}

		deserialized.userData = userData

		return deserialized
	},
	serialize: function(result, userData) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeProudString(userData.name)
		packet.writeUInt64LE(userData.accountId)
		packet.writeUInt32LE(userData.exp)
		packet.writeUInt32LE(userData.clanId)
		packet.writeProudString(userData.clanMarkId)
		packet.writeProudString(userData.clanName)
		packet.writeUInt32LE(userData.level)
		packet.writeUInt32LE(userData.playtime)
		packet.writeUInt32LE(userData.matchesPlayed)
		packet.writeUInt32LE(userData.matchesWon)
		packet.writeUInt32LE(userData.matchesLost)
		packet.writeUInt32LE(userData.unk1)
		packet.writeUInt32LE(userData.unk2)
		packet.writeUInt32LE(userData.unk3)
		// GENERAL STATS
		packet.writeFloatLE(userData.generalKillDeathRate)
		packet.writeFloatLE(userData.generalTdPoints)
		packet.writeFloatLE(userData.generalDmPoints)
		packet.writeFloatLE(userData.generalChaserSurvivabilityRate)
		packet.writeFloatLE(userData.generalBrPoints)
		packet.writeFloatLE(userData.generalCaptainPoints)
		packet.writeFloatLE(userData.generalSiegePoints)
		packet.writeFloatLE(userData.generalArenaPoints)
		// TD STATS
		packet.writeFloatLE(userData.tdWinRate)
		packet.writeFloatLE(userData.tdPoints)
		packet.writeFloatLE(userData.tdMatchesWon)
		packet.writeFloatLE(userData.tdDefensePoints)
		packet.writeFloatLE(userData.tdOffensePoints)
		packet.writeFloatLE(userData.tdKillRate)
		packet.writeFloatLE(userData.tdHealPoints)
		// DM STATS
		packet.writeFloatLE(userData.dmWinRate)
		packet.writeFloatLE(userData.dmKillDeathRatePercentage)
		packet.writeFloatLE(userData.dmKillDeathRate)
		packet.writeFloatLE(userData.dmKillRate)
		packet.writeFloatLE(userData.dmAssistPoints)
		packet.writeFloatLE(userData.dmHealPoints)
		// BR STATS
		packet.writeUInt32LE(userData.brFirstPlaceKills)
		packet.writeUInt32LE(userData.brFirstPlaces)
		// CHASER STATS
		packet.writeFloatLE(userData.chaserKillsAll)
		packet.writeFloatLE(userData.chaserKills)
		// CAPTAIN STATS
		packet.writeUInt32LE(userData.captainKills)
		packet.writeUInt32LE(userData.captainDominations)
		// SIEGE STATS
		packet.writeFloatLE(userData.siegeWinRate)
		packet.writeFloatLE(userData.siegeCapturePoints)
		packet.writeFloatLE(userData.siegeBattlePoints)
		packet.writeFloatLE(userData.siegeMainCoreCapturePoints)
		packet.writeFloatLE(userData.siegeItemObtainPoints)
		// ARENA STATS
		packet.writeFloatLE(userData.arenaWinRate)
		packet.writeFloatLE(userData.arenaKillDeathRate)
		packet.writeFloatLE(userData.arenaKillDeathRatePercentage)
		packet.writeFloatLE(userData.arenaDoubleKillRate)
		packet.writeFloatLE(userData.arenaTripleKillRate)
		packet.writeUInt32LE(userData.arenaShortestKillTime)
		packet.writeUInt32LE(userData.arenaLeaderShowdowns)
		packet.writeUInt32LE(userData.arenaLeaderKills)
		// CHAR INFOS
		packet.writeUInt8(userData.gender)
		// CLOTHES
		packet.writeUInt32LE(userData.clothesCount)
		// CLOTHES INFO
		for (var i = 0; i < userData.clothesCount; i++) {
			var clothes = userData.clothes[i]
			packet.writeUInt32LE(clothes.itemId)
			packet.writeUInt32LE(clothes.shopId)
			packet.writeUInt32LE(clothes.periodType)
			packet.writeUInt16LE(clothes.period)
			packet.writeUInt8(clothes.color)
			packet.writeUInt32LE(clothes.effectsCount)
			for (var i_ = 0; i_ < clothes.effectsCount; i_++) {
				var effect = clothes.effects[i_]
				packet.writeUInt32LE(effect.effectId)
			}
			packet.writeUInt32LE(clothes.enchantLevel)
			packet.writeUInt32LE(0) // unk
		}
		// WEAPONS
		packet.writeUInt32LE(userData.weaponsCount)
		// WEAPONS INFO
		for (var i = 0; i < userData.weaponsCount; i++) {
			var weapon = userData.weapons[i]
			packet.writeUInt32LE(weapon.itemId)
			packet.writeUInt32LE(weapon.shopId)
			packet.writeUInt32LE(weapon.periodType)
			packet.writeUInt16LE(weapon.period)
			packet.writeUInt8(weapon.color)
			packet.writeUInt32LE(weapon.effectsCount)
			for (var i_ = 0; i_ < weapon.effectsCount; i_++) {
				var effect = weapon.effects[i_]
				packet.writeUInt32LE(effect.effectId)
			}
			packet.writeUInt32LE(weapon.enchantLevel)
			packet.writeUInt32LE(0) // unk
		}
		// SKILLS
		packet.writeUInt32LE(userData.skillsCount)
		// SKILLS INFO
		for (var i = 0; i < userData.skillsCount; i++) {
			var skill = userData.skills[i]
			packet.writeUInt32LE(skill.itemId)
			packet.writeUInt32LE(skill.shopId)
			packet.writeUInt32LE(skill.periodType)
			packet.writeUInt16LE(skill.period)
			packet.writeUInt8(skill.color)
			packet.writeUInt32LE(skill.effectsCount)
			for (var i_ = 0; i_ < skill.effectsCount; i_++) {
				var effect = skill.effects[i_]
				packet.writeUInt32LE(effect.effectId)
			}
			packet.writeUInt32LE(skill.enchantLevel)
			packet.writeUInt32LE(0) // unk
		}
		return packet.data.toBuffer()
	}
}