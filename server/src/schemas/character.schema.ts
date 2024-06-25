import { t } from 'elysia';

export const CharacterSchema = t.Object({
  id: t.String(),
  userId: t.String(),
  armourId: t.Nullable(t.String()),
  leggingsId: t.Nullable(t.String()),
  helmetId: t.Nullable(t.String()),
  bootsId: t.Nullable(t.String()),
  glovesId: t.Nullable(t.String()),
  shieldId: t.Nullable(t.String()),
  weaponId: t.Nullable(t.String()),
  amuletId: t.Nullable(t.String()),
  name: t.String(),
  strength: t.Numeric(),
  dexterity: t.Numeric(),
  agility: t.Numeric(),
  constitution: t.Numeric(),
  intelligence: t.Numeric(),
  health: t.Numeric(),
  level: t.Numeric(),
  experience: t.Numeric(),
  money: t.Numeric(),
});
