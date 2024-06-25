import Elysia from 'elysia';
import { userRoutes } from './user.routes';
import { APIError } from '../errors/apiError.error';
import { authRoutes } from './auth.routes';
import { authGuard } from '../middlewares/authGuard';
import { characterRoutes } from './character.routes';

const routes = new Elysia()
  .get('/', () => 'UP', {
    detail: {
      description: `Healthcheck that returns "UP" if all is good.`,
      tags: ['public'],
    },
  })
  .error('API_ERROR', APIError)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'API_ERROR':
        set.status = 400;
        return {
          message: error.message,
          details: error.details,
        };
    }
  })
  .use(authRoutes)
  .group('/api', (app) =>
    app.use(authGuard).use(userRoutes).use(characterRoutes)
  );

export { routes };
