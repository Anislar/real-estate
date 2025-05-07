import { serial, integer, pgTable as table } from 'drizzle-orm/pg-core';
import { users } from './user';

// --------------------------------------------> MANAGER <--------------------------------------------
export const manager = table('manager', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});
