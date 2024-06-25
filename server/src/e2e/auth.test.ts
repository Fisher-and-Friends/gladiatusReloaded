import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';
import { routes } from '../routes';

const ROOT_URL = 'http://localhost/auth';

describe('route auth/google', () => {
  it('should redirect always', async () => {
    const app = new Elysia().use(routes);

    const response = await app.handle(new Request(ROOT_URL + '/google'));

    expect(response.status).toBe(302);
    expect(response.headers.has('location')).toBe(true);
  });
});

describe('route auth/google/callback', () => {
  it('should fail when no input is supplied', async () => {
    const app = new Elysia().use(routes);

    const response = await app.handle(
      new Request(ROOT_URL + '/google/callback')
    );

    expect(response.status).toBe(400);
    expect((await response.json()).message).toBe('Failed to authenticate.');
  });

  it('should fail when invalid input is supplied', async () => {
    const app = new Elysia().use(routes);

    const response = await app.handle(
      new Request(ROOT_URL + '/google/callback', {
        headers: {
          Cookie: 'state=123; codeVerifier=123',
        },
      })
    );

    expect(response.status).toBe(400);
    expect((await response.json()).message).toBe('Failed to authenticate.');
  });
});

describe('route auth/refresh', () => {
  it('should fail when no refreshToken is present', async () => {
    const app = new Elysia().use(routes);

    const response = await app.handle(new Request(ROOT_URL + '/refresh'));

    expect(response.status).toBe(400);
    expect((await response.json()).message).toBe('Missing refresh token.');
  });
  it('should fail when refreshToken is invalid', async () => {
    const app = new Elysia().use(routes);

    const response = await app.handle(
      new Request(ROOT_URL + '/refresh', {
        headers: {
          Cookie: 'refreshToken=ecud;',
        },
      })
    );

    expect(response.status).toBe(400);
    expect((await response.json()).message).toBe('Refresh token invalid.');
  });
});
