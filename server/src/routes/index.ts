import Elysia from 'elysia';
import { userRoutes } from './user.routes';
import { APIError } from '../errors/apiError.error';

const routes = new Elysia()
  .get('/', () => 'UP')
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
  .use(userRoutes);

export { routes };
