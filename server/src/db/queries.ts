import { eq } from 'drizzle-orm';
import { db } from './db';
import { SelectUser, usersTable, InsertUser } from './schema';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}
