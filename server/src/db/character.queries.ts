import { eq } from 'drizzle-orm';
import { db } from './db';
import { SelectCharacter, charactersTable } from './schema';
import { Character } from '../interfaces/character.interface';

export async function getByUserId(
  id: SelectCharacter['userId']
): Promise<Character> {
  const result = await db
    .select()
    .from(charactersTable)
    .where(eq(charactersTable.userId, id || ''));

  if (result) {
    return result[0];
  }

  throw new Error('Failed to get character.');
}
