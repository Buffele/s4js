using System;
using System.Collections.Generic;
using System.IO;
using BlubLib.Serialization;

namespace Netsphere.Network.Message.P2P
{
    public static class P2PMapper
    {
        private static readonly Dictionary<P2POpCode, Type> s_typeLookup = new Dictionary<P2POpCode, Type>();
        private static readonly Dictionary<Type, P2POpCode> s_opCodeLookup = new Dictionary<Type, P2POpCode>();

        static P2PMapper()
        {
            Create<PlayerSpawnReqMessage>(P2POpCode.PlayerSpawnReq);
            Create<PlayerSpawnAckMessage>(P2POpCode.PlayerSpawnAck);
            Create<AbilitySyncMessage>(P2POpCode.AbilitySync);
            Create<EquippingItemSyncMessage>(P2POpCode.EquippingItemSync);
            Create<DamageInfoMessage>(P2POpCode.DamageInfo);
            Create<DamageInfoRemoteGhostMessage>(P2POpCode.DamageInfoRemoteGhost);
            Create<SnapshotMessage>(P2POpCode.Snapshot);
            Create<StateSyncMessage>(P2POpCode.StateSync);
            Create<P2PEventMessageMessage>(P2POpCode.P2PEventMessage);
            Create<BgEffectMessage>(P2POpCode.BgEffect);
            Create<DefensivePowerMessage>(P2POpCode.DefensivePower);
            Create<BlastObjectMessage>(P2POpCode.BlastObject);
            Create<RebirthObjectMessage>(P2POpCode.RebirthObject);
            Create<ChangeTargetMessage>(P2POpCode.ChangeTarget);
            Create<MindEnergyMessage>(P2POpCode.MindEnergy);
            Create<DamageShieldMessage>(P2POpCode.DamageShield);
            Create<AimedPointMessage>(P2POpCode.AimedPoint);
            Create<OnOffMessage>(P2POpCode.OnOff);
            Create<SentryGunSpawnMessage>(P2POpCode.SentryGunSpawn);
            Create<SentryGunStateMessage>(P2POpCode.SentryGunState);
            Create<SentryGunDestructionMessage>(P2POpCode.SentryGunDestruction);
            Create<FlyStateSyncMessage>(P2POpCode.FlyStateSync);
            Create<GrenadeSpawnMessage>(P2POpCode.GrenadeSpawn);
            Create<GrenadeSnapShotMessage>(P2POpCode.GrenadeSnapshot);
            Create<GrenadeExplosionMessage>(P2POpCode.GrenadeExplosion);
            Create<ObstructionSpawnMessage>(P2POpCode.ObstructionSpawn);
            Create<ObstructionDestroyMessage>(P2POpCode.ObstructionDestroy);
            Create<ObstructionDamageMessage>(P2POpCode.ObstructionDamage);
            Create<SyncObjectObstructionMessage>(P2POpCode.SyncObjectObstruction);
            Create<BlastObjectSyncMessage>(P2POpCode.BlastObjectSync);
            Create<BallSyncMessage>(P2POpCode.BallSync);
            Create<BallSnapShotMessage>(P2POpCode.BallSnapshot);
            Create<ArcadeSyncMessage>(P2POpCode.ArcadeSync);
            Create<ArcadeFinMessage>(P2POpCode.ArcadeFin);
            Create<ArcadeSyncReqMessage>(P2POpCode.ArcadeSyncReq);
            Create<AttachArcadeItemMessage>(P2POpCode.AttachArcadeItem);
            Create<HPSyncMessage>(P2POpCode.HpSync);
            Create<DamageAiActorMessage>(P2POpCode.DamageAiActor);
            Create<ExposeClubMarkMessage>(P2POpCode.ExposeClubmark);
            Create<ReflectRateMessage>(P2POpCode.ReflectRate);
            Create<ConditionInfoMessage>(P2POpCode.ConditionInfo);
            Create<AbilityChangeSyncMessage>(P2POpCode.AbilityChangeSync);
            Create<WeaponInstallMessage>(P2POpCode.WeaponInstall);
            Create<PlayerRespawnIngameMessage>(P2POpCode.PlayerRespawnIngame);
            Create<P2PTotalMessage>(P2POpCode.P2PTotal);
            Create<OtherTotalMessage>(P2POpCode.OtherTotal);
            Create<EquippingItemSyncChangeMessage>(P2POpCode.EquippingItemSyncChange);
            Create<Unk57Message>(P2POpCode.Unk57);
        }

        public static void Create<T>(P2POpCode opCode)
            where T : P2PMessage, new()
        {
            var type = typeof (T);
            s_opCodeLookup.Add(type, opCode);
            s_typeLookup.Add(opCode, type);
        }

        public static P2PMessage GetMessage(byte[] data)
        {
            using (var r = data.ToBinaryReader())
            {
                var opCode = r.ReadEnum<P2POpCode>();

                Type type;
                if (s_typeLookup.TryGetValue(opCode, out type))
                {
                    return (P2PMessage)Serializer.Deserialize(r, type);
                }
                else
                {
                    throw new Exception($"Invalid opCode {opCode}");
                }
            }
        }

        public static P2POpCode GetOpCode<T>()
            where T : P2PMessage
        {
            return GetOpCode(typeof (T));
        }

        public static P2POpCode GetOpCode(Type type)
        {
            return s_opCodeLookup[type];
        }
    }
}