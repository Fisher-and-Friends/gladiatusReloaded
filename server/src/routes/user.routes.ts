import Elysia, { t } from 'elysia';
import { create, getById } from '../services/user.service';

const userRoutes = new Elysia().group('/user', (app) =>
  app.get('/:id', ({ params: { id } }) => getById(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
);

export { userRoutes };
