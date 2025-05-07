import {
  serial,
  integer,
  timestamp,
  text,
  pgTable as table,
} from 'drizzle-orm/pg-core';
import { tenant } from './tenant';
import { ApplicationStatus } from '../../utils';
import { lease } from './lease';
import { property } from './properties';

// --------------------------------------------> APPLICATION <--------------------------------------------
export const application = table('application', {
  id: serial('id').primaryKey(),
  applicationDate: timestamp('application_date', {
    withTimezone: true,
  }).defaultNow(),
  status: ApplicationStatus('application_status').notNull(),
  propertyId: integer('property_id')
    .notNull()
    .references(() => property.id),
  tenantId: integer('tenant_id')
    .notNull()
    .references(() => tenant.id),
  message: text('message'),
  leaseId: integer('lease_id')
    .notNull()
    .references(() => lease.id),
});
