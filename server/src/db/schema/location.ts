import { serial, varchar, text, pgTable as table } from 'drizzle-orm/pg-core';

// --------------------------------------------> LOCATION <--------------------------------------------
export const location = table('location', {
  id: serial('id').primaryKey(),
  address: varchar('address', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  state: varchar('state', { length: 255 }).notNull(),
  country: varchar('country', { length: 255 }).notNull(),
  postalCode: varchar('postalCode', { length: 255 }).notNull(),
  coordinates: text('coordinates').notNull(),
});
