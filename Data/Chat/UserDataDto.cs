using BlubLib.Serialization;
using BlubLib.Serialization.Serializers;
using ProudNet.Serializers;

namespace Netsphere.Network.Data.Chat
{
    [BlubContract]
    public class UserDataDto
    {
        [BlubMember(0, typeof(StringSerializer))]
        public string Name { get; set; }

        [BlubMember(1)]
        public ulong AccountId { get; set; }

        [BlubMember(2)]
        public uint Exp { get; set; }

        [BlubMember(3)]
        public uint ClanId { get; set; }

        [BlubMember(4, typeof(StringSerializer))]
        public string ClanMarkId { get; set; }

        [BlubMember(5, typeof(StringSerializer))]
        public string ClanName { get; set; }

        [BlubMember(6)]
        public uint Level { get; set; }

        [BlubMember(7)]
        public uint Playtime { get; set; }

        [BlubMember(8)]
        public uint MatchesPlayed { get; set; }

        [BlubMember(9)]
        public uint MatchesWon { get; set; }

        [BlubMember(10)]
        public uint MatchesLost { get; set; }

        [BlubMember(11)]
        public uint Unk1 { get; set; }

        [BlubMember(12)]
        public uint Unk2 { get; set; }

        [BlubMember(13)]
        public uint Unk3 { get; set; }

        [BlubMember(14)]
        public GeneralUserDataDto GeneralStats { get; set; }

        [BlubMember(15)]
        public TDUserDataDto TDStats { get; set; }

        [BlubMember(16)]
        public DMUserDataDto DMStats { get; set; }

        [BlubMember(17)]
        public BRUserDataDto BattleRoyalStats { get; set; }

        [BlubMember(18)]
        public ChaserUserDataDto ChaserStats { get; set; }

        [BlubMember(19)]
        public CaptainUserDataDto CaptainStats { get; set; }

        [BlubMember(20)]
        public SiegeUserDataDto SiegeStats { get; set; }

        [BlubMember(21)]
        public ArenaUserDataDto ArenaStats { get; set; }

        [BlubMember(22)]
        public CharacterGender Gender { get; set; }

        [BlubMember(23, typeof(ArrayWithScalarSerializer))]
        public ItemUserDataDto[] Clothes { get; set; }

        [BlubMember(24, typeof(ArrayWithScalarSerializer))]
        public ItemUserDataDto[] Weapons { get; set; }

        [BlubMember(25, typeof(ArrayWithScalarSerializer))]
        public ItemUserDataDto[] Skills { get; set; }

        public UserDataDto()
        {
            TDStats = new TDUserDataDto();
            DMStats = new DMUserDataDto();
            BattleRoyalStats = new BRUserDataDto();
            ChaserStats = new ChaserUserDataDto();
            CaptainStats = new CaptainUserDataDto();
            SiegeStats = new SiegeUserDataDto();
            ArenaStats = new ArenaUserDataDto();
        }
    }
}
