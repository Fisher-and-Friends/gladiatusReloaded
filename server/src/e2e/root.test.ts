import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';
import { routes } from '../routes';

const ROOT_URL = 'http://localhost/';

describe('route /', () => {
  it('should return "UP" always', async () => {
    const app = new Elysia().use(routes);

    const response = await app
      .handle(new Request(ROOT_URL))
      .then((res) => res.text());

    expect(response).toBe('UP');
  });
});
