import {
  serial,
  integer,
  timestamp,
  doublePrecision,
  varchar,
  text,
  boolean,
  pgTable as table,
} from 'drizzle-orm/pg-core';
import { location } from './location';
import { manager } from './manager';
import { Amenity, Highlight, PropertyType } from './enum-type';

export const property = table('properties', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  pricePerMonth: doublePrecision('price_per_month').notNull(),
  securityDeposit: doublePrecision('security_deposit').notNull(),
  applicationFee: doublePrecision('application_fee').notNull(),
  photoUrls: text('photo_urls').array().notNull(),
  amenities: Amenity('amenities').array().notNull(),
  highlights: Highlight('highlights').array().notNull(),
  isPetsAllowed: boolean('is_pets_allowed').default(false).notNull(),
  isParkingIncluded: boolean('is_parking_included').default(false).notNull(),
  beds: integer('beds').notNull(),
  baths: doublePrecision('baths').notNull(),
  squareFeet: integer('square_feet').notNull(),
  propertyType: PropertyType('property_type').notNull(),
  postedDate: timestamp('posted_date', { withTimezone: true }).defaultNow(),
  averageRating: doublePrecision('average_rating').default(0),
  numberOfReviews: integer('number_of_reviews').default(0),
  locationId: integer('location_id')
    .notNull()
    .references(() => location.id),
  managerId: integer('manager_id')
    .notNull()
    .references(() => manager.id),
});
