using System;
using BlubLib.Serialization;
using Netsphere.Network.Data.Game;
using Netsphere.Network.Serializers;
using System.Net;
using ProudNet.Serialization.Serializers;

namespace Netsphere.Network.Message.Game
{
    [BlubContract]
    public class SLoginRequestAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public GameLoginResult Result { get; set; }

        [BlubMember(2)]
        public ulong Unk1 { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string Unk2 { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string Unk3 { get; set; }

        public SLoginRequestAckMessage()
        {
            Unk2 = "";
            Unk3 = "";
        }

        public SLoginRequestAckMessage(GameLoginResult result)
        {
            Result = result;
            Unk2 = "";
            Unk3 = "";
        }

        public SLoginRequestAckMessage(GameLoginResult result, ulong accountId)
        {
            AccountId = accountId;
            Result = result;
            Unk2 = "";
            Unk3 = "";
        }
    }

    [BlubContract]
    public class SPlayerAccountInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Matches { get; set; }

        [BlubMember(1)]
        public uint Unk1 { get; set; }

        [BlubMember(2)]
        public uint Wins { get; set; }

        [BlubMember(3)]
        public uint Loses { get; set; }

        [BlubMember(4)]
        public uint Unk2 { get; set; }

        [BlubMember(5)]
        public uint Unk3 { get; set; }

        [BlubMember(6)]
        public uint Playtime { get; set; }

        [BlubMember(7)]
        public bool isGM { get; set; }

        [BlubMember(8)]
        public uint Unk4 { get; set; }

        [BlubMember(9)]
        public byte Level { get; set; }

        [BlubMember(10)]
        public bool Unk5 { get; set; }

        [BlubMember(11)]
        public uint EXP { get; set; }

        [BlubMember(12)]
        public uint Points { get; set; }

        [BlubMember(13)]
        public uint PEN { get; set; }

        [BlubMember(14)]
        public uint Unk6 { get; set; }

        [BlubMember(15, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(16)]
        public uint Unk7 { get; set; }

        #region missing structure

        /*
		statistics1: packet.readUInt32LE(),
		statistics2: packet.readUInt32LE(),
		statistics3: packet.readUInt32LE(),
		statistics4: packet.readUInt32LE(),
		statistics5: packet.readUInt32LE(),
		statistics6: packet.readUInt32LE(),
		statistics7: packet.readUInt32LE(),
		statistics8: packet.readUInt32LE(),
		statistics9: packet.readUInt32LE(),
		statistics10: packet.readUInt32LE(),
		statistics11: packet.readUInt32LE(),
		statistics12: packet.readUInt32LE(),
		statistics13: packet.readUInt32LE(),
		statistics14: packet.readUInt32LE(),
		statistics15: packet.readUInt32LE(),
		statistics16: packet.readUInt32LE(),
		statistics17: packet.readUInt32LE(),
		statistics18: packet.readUInt32LE(),
		statistics19: packet.readUInt32LE(),
		statistics20: packet.readUInt32LE(),
		statistics21: packet.readUInt32LE(),
		statistics22: packet.readUInt32LE(),
		statistics23: packet.readUInt32LE(),
		statistics24: packet.readUInt32LE(),
		statistics25: packet.readUInt32LE(),
		statistics26: packet.readUInt32LE(),
		statistics27: packet.readUInt32LE(),
		statistics28: packet.readUInt32LE(),
		statistics29: packet.readUInt32LE(),
		statistics30: packet.readUInt32LE(),
		statistics31: packet.readUInt32LE(),
		statistics32: packet.readUInt32LE(),
		statistics33: packet.readUInt32LE(),
		statistics34: packet.readUInt32LE(),
		statistics35: packet.readUInt32LE(),
		statistics36: packet.readUInt32LE(),
		brFirstPlaceKills: packet.readUInt32LE(),
		brFirstPlaces: packet.readUInt32LE(),
		statistics37: packet.readUInt32LE(),
		statistics38: packet.readUInt32LE(),
		statistics39: packet.readUInt32LE(),
		statistics40: packet.readUInt32LE(),
		statistics41: packet.readUInt32LE(),
		statistics42: packet.readUInt32LE(),
		statistics43: packet.readUInt32LE(),
		statistics44: packet.readUInt32LE(),
		statistics45: packet.readUInt32LE(),
		statistics46: packet.readUInt32LE(),
		statistics47: packet.readUInt32LE(),
		statistics48: packet.readUInt32LE(),
		statistics49: packet.readUInt32LE(),
		statistics50: packet.readUInt32LE(),
		statistics51: packet.readUInt32LE(),
		statistics52: packet.readUInt32LE(),
		statistics53: packet.readUInt32LE(),
		statistics54: packet.readUInt32LE(),
		statistics55: packet.readUInt32LE(),
		statistics56: packet.readUInt32LE(),
		statistics57: packet.readUInt32LE(),
		statistics58: packet.readUInt32LE(),
		statistics59: packet.readUInt32LE(),
		statistics60: packet.readUInt32LE(),
		statistics61: packet.readUInt32LE(),
		statistics62: packet.readUInt32LE(),
		statistics63: packet.readUInt32LE(),
		statistics64: packet.readUInt32LE(),
		statistics65: packet.readUInt32LE(),
		statistics66: packet.readUInt32LE(),
		statistics67: packet.readUInt32LE(),
		statistics68: packet.readUInt32LE(),
		statistics69: packet.readUInt32LE(),
		statistics70: packet.readUInt32LE(),
		statistics71: packet.readUInt32LE()
        */

        #endregion
    }

    [BlubContract]
    public class SCharacterCurrentInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Slot { get; set; }

        [BlubMember(1)]
        public byte SkillCounter { get; set; }

        [BlubMember(2)]
        public byte WeaponCounter { get; set; }

        [BlubMember(3)]
        public uint Avatar { get; set; }
    }

    [BlubContract]
    public class SCharacterCurrentItemInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Slot { get; set; }

        [BlubMember(1, typeof(ArrayWithIntPrefixSerializer))]
        public ItemPositionDto[] Weapons { get; set; }

        [BlubMember(2, typeof(ArrayWithIntPrefixSerializer))]
        public ItemPositionDto[] Skills { get; set; }

        [BlubMember(3, typeof(ArrayWithIntPrefixSerializer))]
        public ItemPositionDto[] Clothes { get; set; }

        public SCharacterCurrentItemInfoAckMessage()
        {
            Weapons = Array.Empty<ItemPositionDto>();
            Skills = Array.Empty<ItemPositionDto>();
            Clothes = Array.Empty<ItemPositionDto>();
        }

        public SCharacterCurrentItemInfoAckMessage(byte slot)
        {
            Slot = slot;
            Weapons = Array.Empty<ItemPositionDto>();
            Skills = Array.Empty<ItemPositionDto>();
            Clothes = Array.Empty<ItemPositionDto>();
        }

        public SCharacterCurrentItemInfoAckMessage(byte slot, ItemPositionDto[] weapons, ItemPositionDto[] skills, ItemPositionDto[] clothes)
        {
            Slot = slot;
            Weapons = weapons;
            Skills = skills;
            Clothes = clothes;
        }
    }

    [BlubContract]
    public class SItemInventoryInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ItemDto[] Items { get; set; }

        public SItemInventoryInfoAckMessage()
        {
            Items = Array.Empty<ItemDto>();
        }

        public SItemInventoryInfoAckMessage(ItemDto[] items)
        {
            Items = items;
        }
    }

    [BlubContract]
    public class SCharacterDeleteAckMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Slot { get; set; }

        public SCharacterDeleteAckMessage()
        { }

        public SCharacterDeleteAckMessage(byte slot)
        {
            Slot = slot;
        }
    }

    [BlubContract]
    public class SCharacterSelectAckMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Slot { get; set; }

        public SCharacterSelectAckMessage()
        { }

        public SCharacterSelectAckMessage(byte slot)
        {
            Slot = slot;
        }
    }

    [BlubContract]
    public class SSuccessCreateCharacterAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        public SSuccessCreateCharacterAckMessage()
        { }

        public SSuccessCreateCharacterAckMessage(uint result)
        {
            Result = result; // 0 = OK
        }
    }

    [BlubContract]
    public class SServerResultAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ServerResult Result { get; set; }

        public SServerResultAckMessage()
        { }

        public SServerResultAckMessage(ServerResult result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SNickCheckAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        public SNickCheckAckMessage()
        { }

        public SNickCheckAckMessage(uint result)
        {
            Result = result;
        }
    }

    [BlubContract]
    public class SItemUseItemAckMessage : GameMessage
    {
        [BlubMember(0)]
        public byte CharacterSlot { get; set; }

        [BlubMember(1)]
        public byte EquipSlot { get; set; }

        [BlubMember(2)]
        public ulong ItemId { get; set; }

        [BlubMember(3)]
        public UseItemAction Action { get; set; }
    }

    [BlubContract]
    public class SItemUpdateInventoryAckMessage : GameMessage
    {
        [BlubMember(0)]
        public InventoryAction Action { get; set; }

        [BlubMember(1)]
        public ItemDto Item { get; set; }

        public SItemUpdateInventoryAckMessage()
        {
            Item = new ItemDto();
        }

        public SItemUpdateInventoryAckMessage(InventoryAction action, ItemDto item)
        {
            Action = action;
            Item = item;
        }
    }

    [BlubContract]
    public class SRoomCurrentCharacterSlotAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint ServerTime { get; set; }

        [BlubMember(1)]
        public byte Slot { get; set; }

        public SRoomCurrentCharacterSlotAckMessage()
        {

        }

        public SRoomCurrentCharacterSlotAckMessage(uint serverTime, byte slot)
        {
            ServerTime = serverTime;
            Slot = slot;
        }
    }

    [BlubContract]
    public class SRoomEnterPlayerInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2)]
        public PlayerGameMode Mode { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string ClanName { get; set; }

        [BlubMember(4)]
        public ushort Unk1 { get; set; }

        public SRoomEnterPlayerInfoAckMessage()
        {
            ClanName = "";
        }

        public SRoomEnterPlayerInfoAckMessage(uint clanId, ulong accountId, PlayerGameMode mode, string clanName, ushort unk1)
        {
            ClanId = clanId;
            AccountId = accountId;
            Mode = mode;
            ClanName = clanName;
            Unk1 = unk1;
        }
    }

    [BlubContract]
    public class SRoomEnterClubInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint ClanId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string ClanName { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string ClanMarkId { get; set; }

        public SRoomEnterClubInfoAckMessage()
        {
            ClanName = "";
            ClanMarkId = "";
        }

        public SRoomEnterClubInfoAckMessage(uint clanId, string clanName, string clanMarkId)
        {
            ClanId = clanId;
            ClanName = clanName;
            ClanMarkId = clanMarkId;
        }
    }

    [BlubContract]
    public class SRoomPlayerInfoListForEnterPlayerAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public RoomPlayerDto[] Players { get; set; }

        public SRoomPlayerInfoListForEnterPlayerAckMessage()
        {

        }

        public SRoomPlayerInfoListForEnterPlayerAckMessage(RoomPlayerDto[] players)
        {
            Players = players;
        }
    }

    [BlubContract]
    public class SRoomClubInfoListForEnterPlayerAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public RoomPlayerClubDto[] Players { get; set; }

        public SRoomClubInfoListForEnterPlayerAckMessage()
        {

        }

        public SRoomClubInfoListForEnterPlayerAckMessage(RoomPlayerClubDto[] players)
        {
            Players = players;
        }
    }

    [BlubContract]
    public class SRoomEnterRoomInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Id { get; set; }

        [BlubMember(1)]
        public uint Rule { get; set; }

        [BlubMember(2)]
        public byte Map { get; set; }

        [BlubMember(3)]
        public byte PlayerLimit { get; set; }

        [BlubMember(4)]
        public GameState State { get; set; }

        [BlubMember(5)]
        public GameTimeState SubState { get; set; }

        [BlubMember(6)]
        public uint TimeLimit { get; set; }

        [BlubMember(7)]
        public uint Unk1 { get; set; }

        [BlubMember(8)]
        public uint TimeSync { get; set; } // time sync?

        [BlubMember(9)]
        public byte ScoreLimit { get; set; }

        [BlubMember(10)]
        public uint Unk3 { get; set; }

        [BlubMember(11, typeof(IPEndPointAddressStringSerializer))]
        public IPEndPoint RelayEndPoint { get; set; }

        [BlubMember(12)]
        public bool CreatedRoom { get; set; }

        [BlubMember(13)]
        public uint MissionId { get; set; }
    }

    [BlubContract]
    public class SRoomLeavePlayerInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        public SRoomLeavePlayerInfoAckMessage()
        { }

        public SRoomLeavePlayerInfoAckMessage(ulong accountId)
        {
            AccountId = accountId;
        }
    }

    [BlubContract]
    public class STimeSyncAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint ClientTime { get; set; }

        [BlubMember(1)]
        public uint ServerTime { get; set; }
    }

    [BlubContract]
    public class SRoomChangeRoomInfoAckMessage : GameMessage
    {
        // Not sure
        [BlubMember(0)]
        public RoomDto Room { get; set; }

        public SRoomChangeRoomInfoAckMessage()
        {
            Room = new RoomDto();
        }

        public SRoomChangeRoomInfoAckMessage(RoomDto room)
        {
            Room = room;
        }
    }

    [BlubContract]
    public class SNewShopUpdateEndAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SChannelListInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ChannelInfoDto[] Channels { get; set; }

        public SChannelListInfoAckMessage()
        {
            Channels = Array.Empty<ChannelInfoDto>();
        }

        public SChannelListInfoAckMessage(ChannelInfoDto[] channels)
        {
            Channels = channels;
        }
    }

    [BlubContract]
    public class SRoomDeployAckMessage : GameMessage
    {
        // Not sure
        [BlubMember(0)]
        public RoomDto Room { get; set; }

        public SRoomDeployAckMessage()
        {
            Room = new RoomDto();
        }

        public SRoomDeployAckMessage(RoomDto room)
        {
            Room = room;
        }
    }

    [BlubContract]
    public class SRoomDisposeAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Id { get; set; }

        public SRoomDisposeAckMessage()
        { }

        public SRoomDisposeAckMessage(uint id)
        {
            Id = id;
        }
    }

    [BlubContract]
    public class SPlayerInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SItemBuyItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ulong[] Ids { get; set; }

        [BlubMember(1)]
        public ItemBuyResult Result { get; set; }

        [BlubMember(2)]
        public ShopItemDto Item { get; set; }

        public SItemBuyItemAckMessage()
        {
            Ids = Array.Empty<ulong>();
            Item = new ShopItemDto();
        }

        public SItemBuyItemAckMessage(ItemBuyResult result)
            : this()
        {
            Result = result;
        }

        public SItemBuyItemAckMessage(ulong[] ids, ShopItemDto item)
        {
            Ids = ids;
            Result = ItemBuyResult.OK;
            Item = item;
        }
    }

    [BlubContract]
    public class SItemRepairItemAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ItemRepairResult Result { get; set; }

        [BlubMember(1)]
        public ulong ItemId { get; set; }

        public SItemRepairItemAckMessage()
        { }

        public SItemRepairItemAckMessage(ItemRepairResult result)
        {
            Result = result;
        }

        public SItemRepairItemAckMessage(ItemRepairResult result, ulong itemId)
        {
            Result = result;
            ItemId = itemId;
        }
    }

    [BlubContract]
    public class SItemDurabilityItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ItemDurabilityDto[] Items { get; set; }

        public SItemDurabilityItemAckMessage()
        {
            Items = Array.Empty<ItemDurabilityDto>();
        }

        public SItemDurabilityItemAckMessage(ItemDurabilityDto[] items)
        {
            Items = items;
        }
    }

    [BlubContract]
    public class SItemRefundItemAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ItemRefundResult Result { get; set; }

        [BlubMember(1)]
        public ulong ItemId { get; set; }

        public SItemRefundItemAckMessage()
        { }

        public SItemRefundItemAckMessage(ItemRefundResult result)
        {
            Result = result;
        }

        public SItemRefundItemAckMessage(ItemRefundResult result, ulong itemId)
        {
            Result = result;
            ItemId = itemId;
        }
    }

    [BlubContract]
    public class SMoneyRefreshCashInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint PEN { get; set; }

        [BlubMember(1)]
        public uint AP { get; set; }

        public SMoneyRefreshCashInfoAckMessage()
        { }

        public SMoneyRefreshCashInfoAckMessage(uint pen, uint ap)
        {
            PEN = pen;
            AP = ap;
        }
    }

    [BlubContract]
    public class SAdminActionAckMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Result { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Message { get; set; }

        public SAdminActionAckMessage()
        {
            Message = "";
        }
    }

    [BlubContract]
    public class SAdminShowWindowAckMessage : GameMessage
    {
        [BlubMember(0)]
        public bool ShowConsole { get; set; }

        public SAdminShowWindowAckMessage()
        { }

        public SAdminShowWindowAckMessage(bool showConsole)
        {
            ShowConsole = showConsole;
        }
    }

    [BlubContract]
    public class SNoticeAdminMessageAckMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Message { get; set; }

        public SNoticeAdminMessageAckMessage()
        {
            Message = "";
        }

        public SNoticeAdminMessageAckMessage(string message)
        {
            Message = message;
        }
    }

    [BlubContract]
    public class SCharacterCurrentSlotInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public byte CharacterCount { get; set; }

        [BlubMember(1)]
        public byte MaxSlots { get; set; }

        [BlubMember(2)]
        public byte ActiveCharacter { get; set; }

        public SCharacterCurrentSlotInfoAckMessage()
        { }

        public SCharacterCurrentSlotInfoAckMessage(byte characterCount, byte maxSlots, byte activeCharacter)
        {
            CharacterCount = characterCount;
            MaxSlots = maxSlots;
            ActiveCharacter = activeCharacter;
        }
    }

    [BlubContract]
    public class SItemRefreshInvalidEquipItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ulong[] Items { get; set; }

        public SItemRefreshInvalidEquipItemAckMessage()
        {
            Items = Array.Empty<ulong>();
        }
    }

    [BlubContract]
    public class SItemClearInvalidEquipItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public InvalidateItemInfoDto[] Items { get; set; }

        public SItemClearInvalidEquipItemAckMessage()
        {
            Items = Array.Empty<InvalidateItemInfoDto>();
        }
    }

    [BlubContract]
    public class SCharacterAvatarEquipPresetAckMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; }
    }

    [BlubContract]
    public class SLicenseMyInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public uint[] Licenses { get; set; }

        public SLicenseMyInfoAckMessage()
        {
            Licenses = Array.Empty<uint>();
        }

        public SLicenseMyInfoAckMessage(uint[] licenses)
        {
            Licenses = licenses;
        }
    }

    [BlubContract]
    public class S2040AckMessage : GameMessage
    { }

    [BlubContract]
    public class SClubHistoryAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ClubHistoryDto History { get; set; }

        public SClubHistoryAckMessage()
        {
            History = new ClubHistoryDto();
        }
    }

    [BlubContract]
    public class SItemEquipBoostItemInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ulong[] Items { get; set; }

        public SItemEquipBoostItemInfoAckMessage()
        {
            Items = Array.Empty<ulong>();
        }
    }

    [BlubContract]
    public class SClubFindInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class STaskInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public TaskDto[] Tasks { get; set; }

        public STaskInfoAckMessage()
        {
            Tasks = Array.Empty<TaskDto>();
        }
    }

    [BlubContract]
    public class STaskUpdateAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint TaskId { get; set; }

        [BlubMember(1)]
        public ushort Progress { get; set; }
    }

    [BlubContract]
    public class STaskRequestAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint TaskId { get; set; }

        [BlubMember(1)]
        public MissionRewardType RewardType { get; set; }

        [BlubMember(2)]
        public uint Reward { get; set; }

        [BlubMember(3)]
        public byte Slot { get; set; }
    }

    [BlubContract]
    public class STaskRemoveAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint TaskId { get; set; }
    }

    [BlubContract]
    public class SMoneyRefreshCoinInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint ArcadeCoins { get; set; }

        [BlubMember(1)]
        public uint BuffCoins { get; set; }
    }

    [BlubContract]
    public class SItemUseEsperChipItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRequitalArcadeRewardAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPlayerArcadeMapInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPlayerArcadeStageInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    /*
    Used for:
    - CMoneyUseCoinReq
    - CGameKickOutRequestReq
    */
    [BlubContract]
    public class SMoneyRefreshPenInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public uint PEN { get; set; }
    }

    [BlubContract]
    public class SItemUseCapsuleAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public CapsuleRewardDto[] Rewards { get; set; }

        [BlubMember(1)]
        public byte Result { get; set; }

        public SItemUseCapsuleAckMessage()
        {
            Rewards = Array.Empty<CapsuleRewardDto>();
        }

        public SItemUseCapsuleAckMessage(byte result)
            : this()
        {
            Result = result;
        }

        public SItemUseCapsuleAckMessage(CapsuleRewardDto[] rewards, byte result)
        {
            Rewards = rewards;
            Result = result;
        }
    }

    [BlubContract]
    public class SAdminHGWKickAckMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Message { get; set; }

        public SAdminHGWKickAckMessage()
        {
            Message = "";
        }
    }

    [BlubContract]
    public class S2056AckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class S2057AckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNewShopUpdateCheckAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Unk { get; set; } // Result or maybe changed files?

        [BlubMember(1, typeof(StringSerializer))]
        public string VersionNewShopPrice { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string VersionNewShopEffect { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string VersionNewShopItem { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string VersionNewShopUniqueItem { get; set; }

        public SNewShopUpdateCheckAckMessage()
        {
            VersionNewShopPrice = "";
            VersionNewShopEffect = "";
            VersionNewShopItem = "";
            VersionNewShopUniqueItem = "";
            Unk = 0;
        }
    }

    [BlubContract]
    public class SNewShopUpdateInfoAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ShopResourceType Type { get; set; }

        [BlubMember(1, typeof(ArrayWithScalarSerializer))]
        public byte[] Data { get; set; } // MiniLZO compressed...

        [BlubMember(2)]
        public uint CompressedSize { get; set; }

        [BlubMember(3)]
        public uint DecompressedSize { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string Date { get; set; } // Nope, this is version, but version = date when the shop was changed...

        public SNewShopUpdateInfoAckMessage()
        {
            Data = Array.Empty<byte>();
            Date = "";
        }
    }

    [BlubContract]
    public class SItemUseChangeNickAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public ulong Unk2 { get; set; } // Not sure

        [BlubMember(2, typeof(StringSerializer))]
        public string Unk3 { get; set; } // Not sure

        public SItemUseChangeNickAckMessage()
        {
            Unk3 = "";
        }
    }

    [BlubContract]
    public class SItemUseRecordResetAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public ulong Unk1 { get; set; }
    }

    [BlubContract]
    public class SItemUseCoinFillingAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }
    }

    [BlubContract]
    public class SPlayerFindInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SItemDiscardItemAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public ulong ItemId { get; set; }

        public SItemDiscardItemAckMessage()
        { }

        public SItemDiscardItemAckMessage(uint result)
        {
            Result = result;
        }

        public SItemDiscardItemAckMessage(uint result, ulong itemId)
        {
            Result = result;
            ItemId = itemId;
        }
    }

    [BlubContract]
    public class SItemInventoryDeleteAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }

        public SItemInventoryDeleteAckMessage()
        { }

        public SItemInventoryDeleteAckMessage(ulong itemId)
        {
            ItemId = itemId;
        }
    }

    [BlubContract]
    public class SClubAddressAckMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Fingerprint { get; set; }

        [BlubMember(1)]
        public uint Unk2 { get; set; }

        public SClubAddressAckMessage()
        {
            Fingerprint = "";
        }

        public SClubAddressAckMessage(string fingerprint, uint unk2)
        {
            Fingerprint = fingerprint;
            Unk2 = unk2;
        }
    }

    [BlubContract]
    public class SItemUseChangeNickCancelAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }
    }

    [BlubContract]
    public class SRequitalEventItemRewardAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomListInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNickDefaultAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRequitalGiveItemResultAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SShoppingBasketActionAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public byte Action { get; set; }
        
        [BlubMember(2)]
        public BasketItemDto Item { get; set; }

        public SShoppingBasketActionAckMessage()
        { }

        public SShoppingBasketActionAckMessage(uint result)
        {
            Result = result;
        }

        public SShoppingBasketActionAckMessage(byte action, BasketItemDto item)
        {
            Result = 0;
            Action = action;
            Item = item;
        }
    }

    [BlubContract]
    public class SShoppingBasketListInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public BasketItemDto[] Items { get; set; }

        public SShoppingBasketListInfoAckMessage()
        { }

        public SShoppingBasketListInfoAckMessage(BasketItemDto[] items)
        {
            Items = items;
        }
    }

    [BlubContract]
    public class SRandomShopUpdateRequestAckMessage : GameMessage
    { }

    [BlubContract]
    public class SRandomShopUpdateCheckAckMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Date { get; set; } // Should be Version again...

        public SRandomShopUpdateCheckAckMessage()
        {
            Date = "";
        }

        public SRandomShopUpdateCheckAckMessage(string date)
        {
            Date = date;
        }
    }

    [BlubContract]
    public class SRandomShopUpdateInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRandomShopRollingStartAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }

        /*
        packet.writeUInt8(0x01)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x01)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0xbe)
		packet.writeUInt8(0x94)
		packet.writeUInt8(0x0f)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x03)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x01)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x1d)
		packet.writeUInt8(0xcf)
		packet.writeUInt8(0xb3)
		packet.writeUInt8(0x41)
		packet.writeUInt8(0x19)
		packet.writeUInt8(0x10)
		packet.writeUInt8(0xac)
		packet.writeUInt8(0x57)
		packet.writeUInt8(0x4b) 
         */
    }

    [BlubContract]
    public class SRoomInfoRequestAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNoteGiftItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNoteImportuneItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNoteGiftItemGainAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomQuickJoinAckMessage : GameMessage
    {
        [BlubMember(0)]
        public RoomQuickJoinResult Result { get; set; }

        [BlubMember(1)]
        public uint RoomId { get; set; }

        public SRoomQuickJoinAckMessage()
        { }

        public SRoomQuickJoinAckMessage(RoomQuickJoinResult result)
        {
            Result = result;
        }

        public SRoomQuickJoinAckMessage(RoomQuickJoinResult result, uint roomId)
        {
            Result = result;
            RoomId = roomId;
        }
    }

    [BlubContract]
    public class SJorbiWebSessionRedirectAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SCardGambleAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNoticeItemGainAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }

        /*
        packet.writeUInt32LE(1) // type
		packet.writeProudString(name)
		packet.writeUInt64LE(playerId)

		packet.writeUInt8(0x90)
		packet.writeUInt8(0x94)
		packet.writeUInt8(0x0f)
		packet.writeUInt8(0x00) // unk1 | 1021072

		packet.writeUInt8(0x03)
		packet.writeUInt8(0x00) // unk2 | type

		packet.writeUInt8(0x00)
		packet.writeUInt8(0x00)
		packet.writeUInt8(0x1e)
		packet.writeUInt8(0x00) // unk3 | 1966080

		packet.writeUInt8(0x1d)
		packet.writeUInt8(0xcf)
		packet.writeUInt8(0xb3)
		packet.writeUInt8(0x41) // unk4 | 1102303005
         */
    }

    [BlubContract]
    public class SPromotionPunkinNoticeAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionPunkinRankersAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRequitalLevelAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionAttendanceInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionAttendanceGiftItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionCoinEventAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionCoinEventDropCoinAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SEnchantEnchantItemAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public ulong ItemId { get; set; }

        [BlubMember(2)]
        public uint EffectId { get; set; }

        public SEnchantEnchantItemAckMessage()
        { }

        public SEnchantEnchantItemAckMessage(uint result, ulong itemId, uint effectId)
        {
            Result = result;
            ItemId = itemId;
            EffectId = effectId;
        }
    }

    [BlubContract]
    public class SEnchantRefreshEnchantGaugeAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNoticeEnchantAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionCardShuffleAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SItemClearEsperChipAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SChallengeMyInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ChallengeInfoDto[] ChallengeInfos { get; set; }

        public SChallengeMyInfoAckMessage()
        { }

        public SChallengeMyInfoAckMessage(ChallengeInfoDto[] challengeInfos)
        {
            ChallengeInfos = challengeInfos;
        }

        /*
        {
				missionId: 100003,
				unk1: 1,
				rank: 0,
				unk2: 0,
				unk3: 0,
				time: 0
			},
			{
				missionId: 200001,
				unk1: 1,
				rank: 5,
				unk2: 80,
				unk3: 111,
				time: 10
			}
         */
    }

    [BlubContract]
    public class SKRShutDownAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRequitalChallengeAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMapOpenInfosAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionCouponEventAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class STutorialCompletedAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    // TODO: After Result
    [BlubContract]
    public class SExpRefreshInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public uint EXP { get; set; }

        public SExpRefreshInfoAckMessage()
        { }

        public SExpRefreshInfoAckMessage(uint exp)
        {
            EXP = exp;
        }
    }

    [BlubContract]
    public class SPromotionActiveAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SCollectBookUpdateRequestAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SCollectBookUpdateCheckAckMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Date { get; set; }

        public SCollectBookUpdateCheckAckMessage()
        {
            Date = "";
        }

        public SCollectBookUpdateCheckAckMessage(string date)
        {
            Date = date;
        }
    }

    [BlubContract]
    public class SCollectBookUpdateInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SCollectBookInventoryInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SUseInstantItemAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }

        [BlubMember(1)]
        public ulong TargetItemId { get; set; }

        [BlubMember(2)]
        public uint Result { get; set; }

        public SUseInstantItemAckMessage()
        { }

        public SUseInstantItemAckMessage(ulong itemId, ulong targetItemId, uint result)
        {
            ItemId = itemId;
            TargetItemId = targetItemId;
            Result = result;
        }
    }

    [BlubContract]
    public class SCollectBookInvenEffectInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SCollectBookItemRegistAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong Id { get; set; }

        [BlubMember(1)]
        public uint CollectionId { get; set; }

        [BlubMember(2)]
        public uint Unk1 { get; set; }

        [BlubMember(3)]
        public uint Unk2 { get; set; }

        [BlubMember(4)]
        public uint Unk3 { get; set; }

        [BlubMember(5)]
        public uint Unk4 { get; set; }

        [BlubMember(6)]
        public uint Unk5 { get; set; }

        [BlubMember(7)]
        public uint Unk6 { get; set; }

        [BlubMember(8)]
        public uint ItemId { get; set; }
    }

    [BlubContract]
    public class SCollectBookEffectRegistAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SCollectBookExpireBookRewardAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SCollectBookReuseBookRewardAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SCollectBookBookUseRewardAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SCollectBookBookUnRegistAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomEnterPlayerInfoForCollectBookAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1)]
        public uint CollectBookId { get; set; }


        public SRoomEnterPlayerInfoForCollectBookAckMessage()
        { }

        public SRoomEnterPlayerInfoForCollectBookAckMessage(ulong accountId, uint collectBookId)
        {
            AccountId = accountId;
            CollectBookId = collectBookId;
        }
    }

    [BlubContract]
    public class SRoomPlayerInfoListForEnterPlayerForCollectBookAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public RoomPlayerCollectBookDto[] Players { get; set; }

        public SRoomPlayerInfoListForEnterPlayerForCollectBookAckMessage()
        { }

        public SRoomPlayerInfoListForEnterPlayerForCollectBookAckMessage(RoomPlayerCollectBookDto[] players)
        {
            Players = players;
        }
    }

    [BlubContract]
    public class SPromotionUsingCashRewardItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SEnchantRefreshEnchantGaugeForInstantAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Result { get; set; }

        [BlubMember(1)]
        public ulong ItemId { get; set; }

        [BlubMember(2)]
        public uint EnchantLevel { get; set; }

        [BlubMember(3)]
        public uint EnchantMP { get; set; }

        [BlubMember(4)]
        public byte Unk { get; set; }

        public SEnchantRefreshEnchantGaugeForInstantAckMessage()
        { }

        public SEnchantRefreshEnchantGaugeForInstantAckMessage(uint result, ulong itemId, uint enchantLevel, uint enchantMP, byte unk)
        {
            Result = result;
            ItemId = itemId;
            EnchantLevel = enchantLevel;
            EnchantMP = enchantMP;
            Unk = unk;
        }
    }

    [BlubContract]
    public class SUseInstantItemRemoveEffectAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionDailyGiftItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionRouletteMachineStartAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SGameGuardCSAuthAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPremiumItemInfoListAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SSecondaryRewardItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionXMasCardUseAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionNewYearCardUseAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SHackShieldMakeRequestMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomChangeRoomInfoAck2Message : GameMessage
    {
        [BlubMember(1)]
        public RoomChange2Dto Room { get; set; }

        public SRoomChangeRoomInfoAck2Message()
        { }

        public SRoomChangeRoomInfoAck2Message(RoomChange2Dto room)
        {
            Room = room;
        }
    }

    [BlubContract]
    public class SRoomEnterRoomInfoAck2Message : GameMessage
    {
        [BlubMember(0)]
        public uint Id { get; set; }

        [BlubMember(1)]
        public uint Rule { get; set; }

        [BlubMember(2)]
        public byte Map { get; set; }

        [BlubMember(3)]
        public byte PlayerLimit { get; set; }

        [BlubMember(4)]
        public GameState State { get; set; }

        [BlubMember(5)]
        public GameTimeState SubState { get; set; }

        [BlubMember(6)]
        public uint TimeLimit { get; set; }

        [BlubMember(7)]
        public uint Unk1 { get; set; }

        [BlubMember(8)]
        public uint TimeSync { get; set; } // time sync?

        [BlubMember(9)]
        public byte ScoreLimit { get; set; }

        [BlubMember(10)]
        public uint Unk3 { get; set; }

        [BlubMember(11, typeof(IPEndPointAddressStringSerializer))]
        public IPEndPoint RelayEndPoint { get; set; }

        [BlubMember(12)]
        public bool CreatedRoom { get; set; }

        [BlubMember(13)]
        public uint MissionId { get; set; }

        [BlubMember(14)]
        public uint Settings { get; set; }

        [BlubMember(15)]
        public uint RandomRule { get; set; }

        [BlubMember(16)]
        public byte RandomMap { get; set; }
    }

    [BlubContract]
    public class SMakeEventItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRoomListInfoAck2Message : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public RoomDto[] Rooms { get; set; }

        public SRoomListInfoAck2Message()
        {
            Rooms = Array.Empty<RoomDto>();
        }

        public SRoomListInfoAck2Message(RoomDto[] rooms)
        {
            Rooms = rooms;
        }
    }

    [BlubContract]
    public class SRoomDeployAck2Message : GameMessage
    {
        [BlubMember(0)]
        public byte Id { get; set; }

        [BlubMember(1)]
        public bool isPlaying { get; set; }

        [BlubMember(2)]
        public uint Rule { get; set; }

        [BlubMember(3)]
        public byte Map { get; set; }

        [BlubMember(4)]
        public byte PlayerIn { get; set; }

        [BlubMember(5)]
        public byte PlayerLimit { get; set; }

        [BlubMember(6)]
        public uint WeaponLimit { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Password { get; set; }

        [BlubMember(8, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(9)]
        public byte Observers { get; set; }

        [BlubMember(10)]
        public byte ObserverLimit { get; set; }

        [BlubMember(11)]
        public uint Random { get; set; }

        [BlubMember(12)]
        public uint Settings { get; set; }
    }

    [BlubContract]
    public class SRoomInfoRequestAck2Message : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string MasterName { get; set; }

        [BlubMember(1)]
        public uint MasterLevel { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string MasterClanMarkId { get; set; }

        [BlubMember(3)]
        public byte Unk1 { get; set; }

        [BlubMember(4)]
        public uint ScoreLimit { get; set; }

        [BlubMember(5, typeof(TimeSpanSerializer))]
        public TimeSpan TimeLimit { get; set; }

        [BlubMember(6)]
        public GameState State { get; set; }

        [BlubMember(7)]
        public GameTimeState SubState { get; set; }

        [BlubMember(8)]
        public int NumAlpha { get; set; }

        [BlubMember(9)]
        public int NumBeta { get; set; }

        [BlubMember(10)]
        public uint Unk2 { get; set; }

        [BlubMember(11)]
        public uint Unk3 { get; set; }

        [BlubMember(12)]
        public uint Unk4 { get; set; }

        [BlubMember(13)]
        public uint Unk5 { get; set; }

        [BlubMember(14)]
        public uint Unk6 { get; set; }

        [BlubMember(15)]
        public uint Random { get; set; }
    }

    [BlubContract]
    public class SAlchemyCombinationAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SAlchemyDecompositionAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionPlayTimeSyncMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SPromotionItemPaymentAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SItemUseFillExpAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SRefreshAeriaTokenInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SDailyMissionNoticeMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }

        // TODO
    }

    [BlubContract]
    public class SDailyMissionRewardAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SAchieveMissionAckMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Count { get; set; }

        [BlubMember(1)]
        public uint Mission1 { get; set; }

        [BlubMember(2)]
        public uint Mission2 { get; set; }

        [BlubMember(3)]
        public uint Mission3 { get; set; }

        [BlubMember(4)]
        public uint Mission4 { get; set; }

        [BlubMember(5)]
        public uint Mission5 { get; set; }

        [BlubMember(6)]
        public uint Mission6 { get; set; }

        [BlubMember(7)]
        public uint Mission7 { get; set; }

        [BlubMember(8)]
        public uint Mission8 { get; set; }

        [BlubMember(9)]
        public uint Mission9 { get; set; }

        [BlubMember(10)]
        public uint Mission10 { get; set; }

        [BlubMember(11)]
        public uint Count2 { get; set; }
    }

    [BlubContract]
    public class SAchieveMissionRewardAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SBtcClearAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SBtcSyncNoticeMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Unk1 { get; set; }

        [BlubMember(1)]
        public uint Unk2 { get; set; }

        [BlubMember(2)]
        public uint Unk3 { get; set; }

        [BlubMember(3)]
        public uint Unk4 { get; set; }
    }

    [BlubContract]
    public class SNewEnchantEnchantItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SItemUseJewelItemAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SXignCodeAliveAckMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(ReadToEndSerializer))]
        public byte[] Data { get; set; }
    }

    [BlubContract]
    public class SEsperEnchantAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMatchStartAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMatchStopAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SGoToMatchRoomMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMatchInviteAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMatchListAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SBattleInvitesReceivedAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SReMatchAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMatchClanInfoMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMakeNewMatchRoomMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMatchVoteBeginAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMatchClubMarkAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubMatchPointAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMatchPointAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubNoticePointRefreshAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubNoticeRecordRefreshAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubSearchRoomAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubStadiumEditMapDataAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNukingUserAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubStadiumEditBlastinfoEditAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubStadiumInfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubStadiumSelectAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubOtherClubinfoAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubStadiumHomeDataAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubEndGameLeaderPointMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubEndGameClubPointMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubFASystemChangeStateAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubFASystemFAListAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubFASystemFARegisterAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubFASystemFARegisterConfirmAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubFASystemFARecordAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubUnionSystemUserInfoMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubFASystemFAScoutAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubFASystemFAScoutListAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SClubFASystemFAScoutAcceptAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SUnionEndGamePointMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SUnionMainUiMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SUnionSeasonEndMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SUnionSearchRoomAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SEspherChipLv5Message : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMoneyRainMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SMoveEnchantChipAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class SNewDailyAttendanceAckMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }
}