import { t } from 'elysia';

export const UserSchema = t.Object({
  id: t.Optional(t.String()),
  email: t.String(),
  picture: t.String(),
  givenName: t.String(),
  familyName: t.String(),
});
