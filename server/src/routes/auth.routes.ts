import Elysia, { t } from 'elysia';
import { oauth2 } from 'elysia-oauth2';
import { getEnv } from '../utils/env';
import { nocache } from '../middlewares/nocache';
import { AuthError } from '../errors/auth.error';
import { jwt } from '@elysiajs/jwt';
import { User } from '../interfaces/user.interface';
import { createCookie, decodeJWT } from '../utils/jwt';
import { GoogleUserInfo } from '../interfaces/googleUserInfo.interface';
import dayjs from 'dayjs';
import * as userService from '../services/user.service';

const GOOGLE_CLIENT_ID = getEnv('GOOGLE_CLIENT_ID', 'string');
const GOOGLE_CLIENT_SECRET = getEnv('GOOGLE_CLIENT_SECRET', 'string');
const GOOGLE_REDIRECT_URL = getEnv('GOOGLE_REDIRECT_URL', 'string');
const APP_URL = getEnv('APP_URL', 'string');
const JWT_SECRET = getEnv('JWT_SECRET', 'string');
const JWT_AUTH_TTL = getEnv('JWT_AUTH_TTL', 'number');
const JWT_REFRESH_TTL = getEnv('JWT_REFRESH_TTL', 'number');

const authRoutes = new Elysia()
  .use(nocache)
  .use(
    jwt({
      name: 'jwt',
      secret: JWT_SECRET,
    })
  )
  .use(
    oauth2({
      Google: [GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL],
    })
  )
  .get('/auth/google', ({ oauth2 }) =>
    oauth2.redirect('Google', { scopes: ['email', 'profile'] })
  )
  .get('/auth/google/callback', async ({ oauth2, redirect, jwt, cookie }) => {
    try {
      const token = await oauth2.authorize('Google');
      const { email, picture, given_name, family_name } =
        decodeJWT<GoogleUserInfo>(token.idToken);

      const user: User = {
        email: email,
        picture: picture,
        givenName: given_name,
        familyName: family_name,
      };

      let existingUser: User = await userService.getByEmail(email);

      if (!existingUser) {
        existingUser = { ...user, id: await userService.create(user) };
      }

      cookie.authToken.set(
        await createCookie(jwt.sign, existingUser, JWT_AUTH_TTL)
      );
      cookie.refreshToken.set(
        await createCookie(jwt.sign, { id: existingUser.id }, JWT_REFRESH_TTL)
      );
    } catch (error) {
      console.error(error);
      throw new AuthError('Failed to authenticate.');
    }

    return redirect(APP_URL);
  })
  .post(
    '/auth/refresh',
    async ({ cookie, jwt, body }) => {
      // TODO: no any
      const token = (await jwt.verify(body.refreshToken)) as any;

      if (token?.expires < dayjs().unix()) {
        throw new AuthError('Refresh token expired.');
      }

      const id = token.id;
      let user: User = await userService.getById(id);
      cookie.authToken.set(await createCookie(jwt.sign, user, JWT_AUTH_TTL));
      cookie.refreshToken.set(
        await createCookie(jwt.sign, { id }, JWT_REFRESH_TTL)
      );
    },
    {
      body: t.Object({
        refreshToken: t.String(),
      }),
    }
  );

export { authRoutes };
