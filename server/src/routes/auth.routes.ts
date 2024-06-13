import Elysia from 'elysia';
import { oauth2 } from 'elysia-oauth2';
import { getEnv } from '../utils/env';
import { nocache } from '../middlewares/nocache';
import { AuthError } from '../errors/auth.error';
import { jwt } from '@elysiajs/jwt';
import { User } from '../interfaces/user.interface';
import { createCookie, decodeJWT } from '../utils/jwt';
import { GoogleUserInfo } from '../interfaces/googleUserInfo.interface';

const GOOGLE_CLIENT_ID = getEnv('GOOGLE_CLIENT_ID', 'string');
const GOOGLE_CLIENT_SECRET = getEnv('GOOGLE_CLIENT_SECRET', 'string');
const GOOGLE_REDIRECT_URL = getEnv('GOOGLE_REDIRECT_URL', 'string');
const APP_URL = getEnv('APP_URL', 'string');
const JWT_SECRET = getEnv('JWT_SECRET', 'string');

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

      cookie.authToken.set(await createCookie(jwt.sign, user, 1));
      cookie.refreshToken.set(await createCookie(jwt.sign, user, 240));
    } catch (error) {
      console.error(error);
      throw new AuthError('Failed to authenticate.');
    }

    return redirect(APP_URL);
  });

export { authRoutes };
