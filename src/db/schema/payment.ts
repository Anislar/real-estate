import {
  serial,
  integer,
  timestamp,
  doublePrecision,
  pgTable as table,
} from 'drizzle-orm/pg-core';
import { lease } from './lease';
import { PaymentStatus } from './enum-type';

// --------------------------------------------> PAYMENT <--------------------------------------------
export const payment = table('payment', {
  id: serial('id').primaryKey(),
  amountDue: doublePrecision('amount_due').notNull(),
  amountPaid: doublePrecision('amount_paid').notNull(),
  dueDate: timestamp('due_date', { withTimezone: true }).notNull(),
  paymentDate: timestamp('payment_date', { withTimezone: true }).notNull(),
  paymentStatus: PaymentStatus('payment_status').notNull(),
  leaseId: integer('lease_id')
    .notNull()
    .references(() => lease.id),
});
