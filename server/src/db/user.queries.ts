import { eq } from 'drizzle-orm';
import { db } from './db';
import { SelectUser, usersTable, InsertUser } from './schema';
import { UserCreationError } from '../errors/userCreation.error';
import { User } from '../interfaces/user.interface';

export async function create(data: InsertUser): Promise<string> {
  try {
    return (await db.insert(usersTable).values(data)).toJSON().lastInsertRowid;
  } catch (error: any) {
    console.error(error);

    const message = error.message.split(': ');
    let details = {};
    if (message[2]?.includes('UNIQUE')) {
      details = {
        error: 'duplicate',
        field: message[3],
      };
    }
    throw new UserCreationError('Failed to create user.', details);
  }
}

export async function getById(id: SelectUser['id']): Promise<User> {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  if (result) {
    return result[0];
  }

  throw new Error('Failed to get user.');
}

export async function getByEmail(email: SelectUser['email']): Promise<User> {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (result) {
    return result[0];
  }

  throw new Error('Failed to get user.');
}
