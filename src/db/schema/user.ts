import {
  serial,
  text,
  varchar,
  pgTable as table,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = table('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phoneNumber').notNull(),
  password: text('password').notNull(),
  isEmailVerified: boolean('is_email_verified').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
