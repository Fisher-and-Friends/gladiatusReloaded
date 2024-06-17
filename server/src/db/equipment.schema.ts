import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { EquipmentType } from '../interfaces/equipmentType.enum';
import { enumToList } from '../utils/enum';

export const equipmentsTable = sqliteTable('equipments', {
  id: text('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  image: text('image').notNull(),
  name: text('name').notNull(),
  type: text('type', { enum: enumToList(EquipmentType) }).notNull(),
  stats: text('stats', { mode: 'json' }).notNull(),
  level: integer('level').notNull(),
});
