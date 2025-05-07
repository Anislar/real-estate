import {
  serial,
  integer,
  timestamp,
  doublePrecision,
  pgTable as table,
} from 'drizzle-orm/pg-core';
import { tenant } from './tenant';
import { property } from './properties';

// --------------------------------------------> LEASE <--------------------------------------------
export const lease = table('lease', {
  id: serial('id').primaryKey(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),
  rent: doublePrecision('rent').notNull(),
  deposit: doublePrecision('deposit').notNull(),
  propertyId: integer('property_id')
    .notNull()
    .references(() => property.id),
  tenantCognitoId: integer('tenant_id')
    .notNull()
    .references(() => tenant.id),
});
