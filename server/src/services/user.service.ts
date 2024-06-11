import * as queries from '../db/user.queries';

export const create = async (name: string, email: string) => {
  return await queries.create({ name, email });
};

export const getById = async (id: number) => {
  console.log('Get by id', id);
  return await queries.getById(id);
};
