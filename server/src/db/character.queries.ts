import { eq } from 'drizzle-orm';
import { db } from './db';
import { SelectCharacter, charactersTable } from './schema';
import { Character } from '../interfaces/character.interface';
import { CharacterCreationRequest } from '../interfaces/characterCreationRequest.interface';
import { CharacterCreationError } from '../errors/characterCreation.error';

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

export async function create(
  data: CharacterCreationRequest
): Promise<Character> {
  try {
    return (await db.insert(charactersTable).values(data).returning())[0];
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
    throw new CharacterCreationError('Failed to create character.', details);
  }
}
