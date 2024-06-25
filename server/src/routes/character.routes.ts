import Elysia, { t } from 'elysia';
import { decodeJWT } from '../utils/jwt';
import { User } from '../interfaces/user.interface';
import { getByUserId } from '../services/character.service';
import { APIError } from '../errors/apiError.error';
import { CharacterSchema } from '../schemas/character.schema';

const characterRoutes = new Elysia().group('/character', (app) =>
  app.get(
    '/',
    async ({ cookie }) => {
      console.log(cookie);
      const user: User = decodeJWT(cookie.authToken.value);
      if (!user?.id) {
        console.error('Invalid user.', user);
        throw new APIError('Invalid user.');
      }

      const character = await getByUserId(user.id);
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
);

export { characterRoutes };
