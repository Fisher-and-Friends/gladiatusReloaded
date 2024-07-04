import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './user.schema';
import { equipmentsTable } from './equipment.schema';

export const charactersTable = sqliteTable('characters', {
  id: text('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .references(() => usersTable.id)
    .notNull()
    .unique(),
  armourId: text('armour').references(() => equipmentsTable.id),
  leggingsId: text('leggings').references(() => equipmentsTable.id),
  helmetId: text('helmet').references(() => equipmentsTable.id),
  bootsId: text('boots').references(() => equipmentsTable.id),
  glovesId: text('gloves').references(() => equipmentsTable.id),
  shieldId: text('shield').references(() => equipmentsTable.id),
  weaponId: text('weapon').references(() => equipmentsTable.id),
  amuletId: text('amulet').references(() => equipmentsTable.id),
  name: text('name').unique().notNull(),
  strength: integer('strength').notNull().default(1),
  dexterity: integer('dexterity').notNull().default(1),
  agility: integer('agility').notNull().default(1),
  constitution: integer('constitution').notNull().default(1),
  intelligence: integer('intelligence').notNull().default(1),
  health: integer('health').notNull().default(50),
  level: integer('level').notNull().default(1),
  experience: integer('experience').notNull().default(0),
  money: integer('money').notNull().default(0),
});

export type SelectCharacter = typeof charactersTable.$inferSelect;
