import * as queries from '../db/character.queries';
import { Character } from '../interfaces/character.interface';

export const getByUserId = async (id: string): Promise<Character> => {
  console.log('Get by id', id);
  return await queries.getByUserId(id);
};
