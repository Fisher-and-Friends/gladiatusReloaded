import { Elysia } from 'elysia';
import { createUser } from './db/queries';

const result = await createUser({
  name: 'Marton',
  age: 22,
  email: `marton@mail${Math.floor(Math.random() * 1000000000)}.com`,
});
console.log(result);

const app = new Elysia().get('/', () => 'Hello Elysia').listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
