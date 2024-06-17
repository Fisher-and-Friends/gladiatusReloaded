import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  picture: text('picture').notNull(),
  givenName: text('givenName').notNull(),
  familyName: text('familyName').notNull(),
  email: text('email').unique().notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
