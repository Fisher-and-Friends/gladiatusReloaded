import Elysia, { t } from 'elysia';
import { getById } from '../services/user.service';
import { UserSchema } from '../schemas/user.schema';

const userRoutes = new Elysia().group('/user', (app) =>
  app.get('/:id', ({ params: { id } }) => getById(id), {
    params: t.Object({
      id: t.String(),
    }),
    response: UserSchema,
    detail: {
      description: `Returns the user details for a given user id.  
      DEPRECATED: will be removed in future builds, since it is already in the \`authToken\`.`,
      tags: ['user'],
      deprecated: true,
    },
  })
);

export { userRoutes };
