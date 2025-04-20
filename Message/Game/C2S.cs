using BlubLib.Serialization;
using Netsphere.Network.Data.Game;
using Netsphere.Network.Serializers;
using ProudNet.Serialization.Serializers;
using System;

namespace Netsphere.Network.Message.Game
{
    [BlubContract]
    public class CLoginRequestReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Unk1 { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(2)]
        public uint Unk2 { get; set; }

        [BlubMember(3)]
        public uint Unk3 { get; set; }

        [BlubMember(4)]
        public uint Unk4 { get; set; }

        [BlubMember(5)]
        public uint Unk5 { get; set; }

        [BlubMember(6)]
        public ulong AccountId { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string SessionId { get; set; }

        [BlubMember(8)]
        public uint Unk6 { get; set; }

        [BlubMember(9)]
        public bool Force { get; set; }

        [BlubMember(10, typeof(StringSerializer))]
        public string Unk7 { get; set; }

        [BlubMember(11)]
        public uint Unk8 { get; set; }

        [BlubMember(12, typeof(StringSerializer))]
        public string Unk9 { get; set; }

        [BlubMember(13, typeof(StringSerializer))]
        public string AccessToken { get; set; }

        [BlubMember(14, typeof(StringSerializer))]
        public string RefreshToken { get; set; }

        [BlubMember(15, typeof(StringSerializer))]
        public string ExpireDate { get; set; }
    }

    [BlubContract]
    public class CCharacterCreateReqMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Slot { get; set; }

        [BlubMember(1)]
        public byte Gender { get; set; }

        [BlubMember(2, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CCharacterSelectReqMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Slot { get; set; }
    }

    [BlubContract]
    public class CCharacterDeleteReqMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Slot { get; set; }
    }

    [BlubContract]
    public class CRoomQuickStartReqMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; }
    }

    [BlubContract]
    public class CRoomMakeReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Rule { get; set; }

        [BlubMember(1)]
        public byte Map { get; set; }

        [BlubMember(2)]
        public byte PlayerLimit { get; set; }

        [BlubMember(3)]
        public ushort ScoreLimit { get; set; }

        [BlubMember(4, typeof(TimeSpanSerializer))]
        public TimeSpan TimeLimit { get; set; }

        [BlubMember(5)]
        public uint WeaponLimit { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Password { get; set; }

        //unk1: packet.readBuffer(7),
        [BlubMember(8)]
        public uint Unk1 { get; set; }

        [BlubMember(9)]
        public ushort Unk2 { get; set; }

        [BlubMember(10)]
        public byte Unk3 { get; set; }

        [BlubMember(11)]
        public uint MissionId { get; set; }

        [BlubMember(12)]
        public byte Unk4 { get; set; }
    }

    [BlubContract]
    public class CNickCheckReqMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Nickname { get; set; }
    }

    [BlubContract]
    public class CItemUseItemReqMessage : GameMessage
    {
        [BlubMember(0)]
        public UseItemAction Action { get; set; }

        [BlubMember(1)]
        public byte CharacterSlot { get; set; }

        [BlubMember(2)]
        public byte EquipSlot { get; set; }

        [BlubMember(3)]
        public ulong ItemId { get; set; }
    }

    [BlubContract]
    public class CRoomLeaveReqMessage : GameMessage
    {
        [BlubMember(0)]
        public RoomLeaveReason Reason { get; set; }
    }

    [BlubContract]
    public class CTimeSyncReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Time { get; set; }
    }

    [BlubContract]
    public class CAdminShowWindowReqMessage : GameMessage
    { }

    [BlubContract]
    public class C3012ReqMessage : GameMessage
    { }

    [BlubContract]
    public class CChannelEnterReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Channel { get; set; }
    }

    [BlubContract]
    public class CChannelLeaveReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Channel { get; set; }
    }

    [BlubContract]
    public class CChannelInfoReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ChannelInfoRequest Request { get; set; }

        [BlubMember(1)]
        public uint Key { get; set; }
    }

    [BlubContract]
    public class CRoomEnterReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint RoomId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Password { get; set; }

        [BlubMember(2)]
        public byte Mode { get; set; }

        [BlubMember(3)]
        public byte Unk1 { get; set; }
    }

    [BlubContract]
    public class CPlayerInfoReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CItemBuyItemReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ShopItemDto[] Items { get; set; }
    }

    [BlubContract]
    public class CItemRepairItemReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ulong[] Items { get; set; }
    }

    [BlubContract]
    public class CItemRefundItemReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }
    }

    [BlubContract]
    public class CAdminActionReqMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Command { get; set; }
    }

    [BlubContract]
    public class CCharacterActiveEquipPresetReqMessage : GameMessage
    {
        [BlubMember(0)]
        public byte Unk { get; set; }
    }

    [BlubContract]
    public class CLicenseGainReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubNoticeChangeReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubInfoByIDReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubInfoByNameReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CItemInventoryInfoReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CTaskNotifyReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CTaskRequestReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CLicenseExerciseReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CItemUseCoinReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CItemUseEsperChipReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CPlayerBadUserReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class C3034ReqMessage : GameMessage
    { }

    [BlubContract]
    public class C3035ReqMessage : GameMessage
    { }

    [BlubContract]
    public class CNewShopUpdateCheckReqMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string VersionNewShopPrice { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string VersionNewShopEffect { get; set; }

        [BlubMember(2, typeof(StringSerializer))]
        public string VersionNewShopItem { get; set; }

        [BlubMember(3, typeof(StringSerializer))]
        public string VersionNewShopUniqueItem { get; set; }

        [BlubMember(4)]
        public uint ChecksumNewShopPrice { get; set; }

        [BlubMember(5)]
        public uint ChecksumNewShopEffect { get; set; }

        [BlubMember(6)]
        public uint ChecksumNewShopItem { get; set; }

        [BlubMember(7)]
        public uint ChecksumNewShopUniqueItem { get; set; }
    }

    [BlubContract]
    public class CItemUseChangeNickReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }

        [BlubMember(1, typeof(StringSerializer))]
        public string Nickname { get; set; }
    }

    [BlubContract]
    public class CItemUseRecordResetReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }
    }

    [BlubContract]
    public class CItemUseCoinFillingReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CPlayerFindInfoReqMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Nickname { get; set; }
    }

    [BlubContract]
    public class CItemDiscardItemReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }
    }

    [BlubContract]
    public class CItemUseCapsuleReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }
    }

    [BlubContract]
    public class CClubAddressReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubHistoryReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CItemUseChangeNickCancelReqMessage : GameMessage
    { }

    [BlubContract]
    public class CTutorialCompletedReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CCharacterFirstCreateReqMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Nickname { get; set; }

        [BlubMember(1, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CShoppingBasketActionReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Unk1 { get; set; }

        [BlubMember(1)]
        public uint Unk2 { get; set; }

        [BlubMember(2)]
        public ShopItemDto Item { get; set; }
    }

    [BlubContract]
    public class CShoppingBasketDeleteReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public ulong[] BasketIds { get; set; }
    }

    [BlubContract]
    public class CRandomShopUpdateCheckReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRandomShopRollingStartReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRoomInfoRequestReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint RoomId { get; set; }
    }

    [BlubContract]
    public class CNoteGiftItemReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CNoteImportuneItemReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CNoteGiftItemGainReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRoomQuickJoinReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Rule { get; set; }

        [BlubMember(1)]
        public uint Map { get; set; }

        [BlubMember(2)]
        public ushort WeaponLimit { get; set; }

        [BlubMember(3)]
        public ushort PlayerLimit { get; set; }
    }

    [BlubContract]
    public class CMoneyRefreshCashInfoReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CCardGambleReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CPromotionAttendanceGiftItemReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CPromotionCoinEventUseCoinReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CItemEnchantReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }

        [BlubMember(1, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CPromotionCardShuffleReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CBillingCashInfoReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CXTrapDetourReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CPromotionCouponEventReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CCollectBookUpdateCheckReqMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Date { get; set; }
    }

    [BlubContract]
    public class CCollectBookInventoryInfoReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CCollectBookItemRegistReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ArrayWithIntPrefixSerializer))]
        public CollectBookItemDto[] Items { get; set; }
    }

    [BlubContract]
    public class CCollectBookUseRewardReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CUseInstantItemReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }

        [BlubMember(1)]
        public ulong TargetItemId { get; set; }
    }

    [BlubContract]
    public class CUseInstantItemRemoveEffectReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }

        [BlubMember(1)]
        public uint Unk1 { get; set; }

        [BlubMember(2)]
        public uint Unk2 { get; set; }

        [BlubMember(3)]
        public uint EffectId { get; set; }
    }

    [BlubContract]
    public class CPromotionRouletteMachineStartReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CGameGuardCSAuthReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CGameGuardHackReportReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CPromotionXMasCardUseReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CPromotionNewYearCardUseReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CHackShieldMakeResponseReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CRoomMakeReq2Message : GameMessage
    {
        [BlubMember(0)]
        public uint Rule { get; set; }

        [BlubMember(1)]
        public byte Map { get; set; }

        [BlubMember(2)]
        public byte PlayerLimit { get; set; }

        [BlubMember(3)]
        public ushort ScoreLimit { get; set; }

        [BlubMember(4, typeof(TimeSpanSerializer))]
        public TimeSpan TimeLimit { get; set; }

        [BlubMember(5)]
        public uint WeaponLimit { get; set; }

        [BlubMember(6, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(7, typeof(StringSerializer))]
        public string Password { get; set; }

        [BlubMember(8)]
        public byte Observers { get; set; }

        [BlubMember(9)]
        public byte ObserverLimit { get; set; }

        [BlubMember(10)]
        public uint Unk1 { get; set; }

        [BlubMember(11)]
        public uint Unk2 { get; set; }

        [BlubMember(12)]
        public ushort Unk3 { get; set; }

        [BlubMember(13)]
        public uint Random { get; set; }

        [BlubMember(14)]
        public uint Settings { get; set; }

        [BlubMember(15)]
        public uint Unk4 { get; set; } // Clanshit?
    }

    [BlubContract]
    public class CAlchemyCombinationReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CAlchemyDecompositionReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong ItemId { get; set; }
    }

    [BlubContract]
    public class CPromotionItemPaymentReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CItemUseFillExpReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CDailyMissionRewardReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CDailyMissionInitReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Unk { get; set; }
    }

    [BlubContract]
    public class CDailyMissionNextStepReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CAchieveMissionReqMessage : GameMessage
    {
        [BlubMember(0)]
        public uint Unk { get; set; }
    }

    [BlubContract]
    public class CAchieveMissionRewardReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CBtcClearReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CNewItemEnchantReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CItemUseJewelItemReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CXignCodeAliveReqMessage : GameMessage
    {
        [BlubMember(0)]
        public ulong AccountId { get; set; }

        [BlubMember(1, typeof(ReadToEndSerializer))]
        public byte[] Data { get; set; }
    }

    [BlubContract]
    public class CEsperEnchantReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CMatchStartReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CMatchStopReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CMatchListReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CMatchInviteReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CBattleInvitesReceivedResultMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CReMatchReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CMatchVoteBeginMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CMatchClubMarkReqMessage : GameMessage
    {
        // Not sure...
        [BlubMember(0)]
        public uint ClanId { get; set; }

        [BlubMember(1, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CMatchPointReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CMatchRoomQuitReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubNoticePointRefreshReqMessage : GameMessage
    { }

    [BlubContract]
    public class CClubNoticeRecordRefreshReqMessage : GameMessage
    { }

    [BlubContract]
    public class CClubSearchRoomReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubStadiumEditMapDataReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubStadiumEditBlastinfoEditReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubStadiumInfoReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubStadiumSelectReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubOtherClubinfoReqMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Name { get; set; }
    }

    [BlubContract]
    public class CClubFASystemFAListReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubFASystemFARegisterReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubFASystemFARecordReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubFASystemFAScoutReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubFASystemFAScoutListReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CClubFASystemFAScoutAcceptReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CUnionMainUiReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CUnionSearchRoomReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CEsperEnchantPercentUpReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CUseEnchantChipReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CMoveEnchantChipReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }

    [BlubContract]
    public class CCheckHashKeyValueReqMessage : GameMessage
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Checksum { get; set; }
    }

    [BlubContract]
    public class CNewCheckDailyAttendanceReqMessage : GameMessage
    {
        [BlubMember(0, typeof(ReadToEndSerializer))]
        public byte[] Unk { get; set; }
    }
}
