import { serial, integer, pgTable as table } from 'drizzle-orm/pg-core';
import { users } from './user';

// --------------------------------------------> TENANT <--------------------------------------------
export const tenant = table('tenant', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});
