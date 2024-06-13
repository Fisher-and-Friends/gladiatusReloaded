import { eq } from 'drizzle-orm';
import { db } from './db';
import { SelectUser, usersTable, InsertUser } from './schema';
import { UserCreationError } from '../errors/userCreation.error';

export async function create(data: InsertUser) {
  try {
    await db.insert(usersTable).values(data);
  } catch (error: any) {
    console.error(error);

    const message = error.message.split(': ');
    console.log(message);
    console.log(message[2]);
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

export async function getById(id: SelectUser['id']): Promise<{
  id: number;
  name: string;
  email: string;
}> {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  if (result && result.length === 1) {
    return result[0];
  }

  throw new Error('Failed to get user.');
}
