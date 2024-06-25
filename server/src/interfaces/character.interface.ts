export interface Character {
  id: string;
  userId: string;
  armourId: string | null;
  leggingsId: string | null;
  helmetId: string | null;
  bootsId: string | null;
  glovesId: string | null;
  shieldId: string | null;
  weaponId: string | null;
  amuletId: string | null;
  name: string;
  strength: number;
  dexterity: number;
  agility: number;
  constitution: number;
  intelligence: number;
  health: number;
  level: number;
  experience: number;
  money: number;
}
