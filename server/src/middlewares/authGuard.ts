import Elysia from 'elysia';
import { AuthError } from '../errors/auth.error';
import dayjs from 'dayjs';
import jwt from '@elysiajs/jwt';
import { getEnv } from '../utils/env';

const JWT_SECRET = getEnv('JWT_SECRET', 'string');

export const authGuard = (app: Elysia) => {
  return app
    .use(
      jwt({
        name: 'jwt',
        secret: JWT_SECRET,
      })
    )
    .onBeforeHandle(async ({ jwt, cookie }) => {
      if (!cookie.authToken.value) {
        throw new AuthError('Missing auth token.');
      }
      // TODO: no any
      const token = (await jwt.verify(cookie.authToken.value)) as any;

      if (token?.expires < dayjs().unix()) {
        throw new AuthError('Auth token invalid.');
      }
    });
};
