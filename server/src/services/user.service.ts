import * as queries from '../db/user.queries';
import { User } from '../interfaces/user.interface';

export const create = async (user: User): Promise<string> => {
  console.log('Create user', user);
  return await queries.create(user);
};

export const getById = async (id: string): Promise<User> => {
  console.log('Get by id', id);
  return await queries.getById(id);
};

export const getByEmail = async (email: string): Promise<User> => {
  console.log('Get by email', email);
  return await queries.getByEmail(email);
};
