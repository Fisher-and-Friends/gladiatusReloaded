import * as queries from '../db/user.queries';
import { User } from '../interfaces/user.interface';

/**
 *
 * @param user the user details from which we create the user
 * @returns the user id of the created user
 */
export const create = async (user: User): Promise<string> => {
  console.log('Create user', user);
  return await queries.create(user);
};

/**
 *
 * @param id the d of the user we are searching for
 * @returns the user entity
 */
export const getById = async (id: string): Promise<User> => {
  console.log('Get by id', id);
  return (await queries.getById(id)) || null;
};

/**
 *
 * @param email the email of the user we are searching for
 * @returns the user entity
 */
export const getByEmail = async (email: string): Promise<User> => {
  console.log('Get by email', email);
  return (await queries.getByEmail(email)) || null;
};
