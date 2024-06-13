import Elysia from 'elysia';
import { oauth2 } from 'elysia-oauth2';
import { getEnv } from '../utils/env';

const authRoutes = new Elysia()
  .use(
    oauth2({
      Google: [
        getEnv('GOOGLE_CLIENT_ID', 'string'),
        getEnv('GOOGLE_CLIENT_SECRET', 'string'),
        getEnv('GOOGLE_REDIRECT_URL', 'string'),
      ],
    })
  )
  .get('/auth/google', ({ oauth2 }) => oauth2.redirect('Google'))
  .get('/auth/google/callback', async ({ oauth2, cookie }) => {
    console.log('ONE\n\n\n', oauth2, cookie);
    const token = await oauth2.authorize('Google');
    console.log(token);

    return {
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
      token_type: 'Bearer',
      id_token: token.idToken,
      scope: 'openid',
    };
  });

export { authRoutes };
