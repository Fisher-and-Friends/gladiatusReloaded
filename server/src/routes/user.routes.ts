import Elysia, { t } from 'elysia';
import { create, getById } from '../services/user.service';

const userRoutes = new Elysia().group('/user', (app) =>
  app
    .get('/:id', ({ params: { id } }) => getById(id), {
      params: t.Object({
        id: t.Numeric(),
      }),
    })
    .post('/', ({ body: { name, email } }) => create(name, email), {
      body: t.Object({
        name: t.String({
          minLength: 3,
          maxLength: 20,
          pattern: '^\\w*[ *\\w*]*$',
        }),
        email: t.String({ format: 'email' }),
      }),
    })
);

export { userRoutes };
