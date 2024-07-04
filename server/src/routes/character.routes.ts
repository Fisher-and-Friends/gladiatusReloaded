import Elysia, { Cookie, t } from 'elysia';
import { decodeJWT } from '../utils/jwt';
import { User } from '../interfaces/user.interface';
import { create, getByUserId } from '../services/character.service';
import { APIError } from '../errors/apiError.error';
import { CharacterSchema } from '../schemas/character.schema';

function getUserId(cookie: Record<string, Cookie<string>>) {
  const user: User = decodeJWT(cookie.authToken.value);
  if (!user?.id) {
    console.error('Invalid user.', user);
    throw new APIError('Invalid user.');
  }
  return user.id;
}

const characterRoutes = new Elysia().group('/character', (app) =>
  app
    .get(
      '/',
      async ({ cookie }) => {
        const userId = getUserId(cookie);
        const character = await getByUserId(userId);
        return character || null;
      },
      {
        response: t.Nullable(CharacterSchema),
        detail: {
          description: `Returns the character of the current user.  
        In case the user has no character yet, null will be returned.`,
          tags: ['character'],
        },
      }
    )
    .post(
      '/',
      async ({ cookie, body: { name } }) => {
        const userId = getUserId(cookie);
        const character = await create({ userId, name });
        return character || null;
      },
      {
        body: t.Object({ name: t.String() }),
        response: t.Nullable(CharacterSchema),
        detail: {
          description: `Returns the character of the current user.  
        In case the user has no character yet, null will be returned.`,
          tags: ['character'],
        },
      }
    )
);

export { characterRoutes };
