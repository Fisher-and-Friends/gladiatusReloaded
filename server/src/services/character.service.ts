import * as queries from '../db/character.queries';
import { Character } from '../interfaces/character.interface';
import { CharacterCreationRequest } from '../interfaces/characterCreationRequest.interface';

/**
 *
 * @param id the id of the user whose character we want
 * @returns the character entity
 */
export const getByUserId = async (id: string): Promise<Character> => {
  console.log('Get by id', id);
  return (await queries.getByUserId(id)) || null;
};

/**
 *
 * @param request the character creation request
 * @returns the created full character entity
 */
export const create = async (
  request: CharacterCreationRequest
): Promise<Character> => {
  console.log('Create character', request);
  return await queries.create(request);
};
