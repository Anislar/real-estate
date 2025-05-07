"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantProperties = exports.tenantFavorites = exports.payment = exports.lease = exports.application = exports.location = exports.tenant = exports.manager = exports.property = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const utils_1 = require("../utils");
// --------------------------------------------> USER <--------------------------------------------
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 256 }),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    phoneNumber: (0, pg_core_1.text)('phoneNumber').notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    isEmailVerified: (0, pg_core_1.boolean)('is_email_verified').default(false).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
});
// --------------------------------------------> PROPERTIES <--------------------------------------------
exports.property = (0, pg_core_1.pgTable)('properties', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    pricePerMonth: (0, pg_core_1.doublePrecision)('price_per_month').notNull(),
    securityDeposit: (0, pg_core_1.doublePrecision)('security_deposit').notNull(),
    applicationFee: (0, pg_core_1.doublePrecision)('application_fee').notNull(),
    photoUrls: (0, pg_core_1.text)('photo_urls').array().notNull(),
    isPetsAllowed: (0, pg_core_1.boolean)('is_pets_allowed').default(false).notNull(),
    isParkingIncluded: (0, pg_core_1.boolean)('is_parking_included').default(false).notNull(),
    beds: (0, pg_core_1.integer)('beds').notNull(),
    baths: (0, pg_core_1.doublePrecision)('baths').notNull(),
    squareFeet: (0, pg_core_1.integer)('square_feet').notNull(),
    propertyType: (0, utils_1.PropertyTypeEnum)('property_type').notNull(),
    postedDate: (0, pg_core_1.timestamp)('posted_date', { withTimezone: true }).defaultNow(),
    averageRating: (0, pg_core_1.doublePrecision)('average_rating').default(0),
    numberOfReviews: (0, pg_core_1.integer)('number_of_reviews').default(0),
    locationId: (0, pg_core_1.integer)('location_id')
        .notNull()
        .references(() => exports.location.id),
    managerId: (0, pg_core_1.integer)('manager_id')
        .notNull()
        .references(() => exports.manager.id, { onDelete: 'cascade' }),
});
// --------------------------------------------> MANAGER <--------------------------------------------
exports.manager = (0, pg_core_1.pgTable)('manager', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id')
        .notNull()
        .references(() => exports.users.id, { onDelete: 'cascade' }),
});
// --------------------------------------------> TENANT <--------------------------------------------
exports.tenant = (0, pg_core_1.pgTable)('tenant', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id')
        .notNull()
        .references(() => exports.users.id, { onDelete: 'cascade' })
        .unique(),
});
// --------------------------------------------> LOCATION <--------------------------------------------
exports.location = (0, pg_core_1.pgTable)('location', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    address: (0, pg_core_1.varchar)('address', { length: 255 }).notNull(),
    city: (0, pg_core_1.varchar)('city', { length: 255 }).notNull(),
    state: (0, pg_core_1.varchar)('state', { length: 255 }).notNull(),
    country: (0, pg_core_1.varchar)('country', { length: 255 }).notNull(),
    postalCode: (0, pg_core_1.varchar)('postalCode', { length: 255 }).notNull(),
    coordinates: (0, pg_core_1.text)('coordinates').notNull(),
});
// --------------------------------------------> APPLICATION <--------------------------------------------
exports.application = (0, pg_core_1.pgTable)('application', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    applicationDate: (0, pg_core_1.timestamp)('application_date', {
        withTimezone: true,
    }).defaultNow(),
    status: (0, utils_1.ApplicationStatusEnum)('application_status').notNull(),
    message: (0, pg_core_1.varchar)('message', { length: 255 }),
    leaseId: (0, pg_core_1.integer)('lease_id')
        .notNull()
        .references(() => exports.lease.id, { onDelete: 'cascade' }),
    tenantId: (0, pg_core_1.integer)('tenant_id')
        .notNull()
        .references(() => exports.tenant.id, { onDelete: 'cascade' }),
    userId: (0, pg_core_1.integer)('user_id')
        .notNull()
        .references(() => exports.users.id, { onDelete: 'cascade' }),
    propertyId: (0, pg_core_1.integer)('property_id')
        .notNull()
        .references(() => exports.property.id, { onDelete: 'cascade' }),
});
// --------------------------------------------> LEASE <--------------------------------------------
exports.lease = (0, pg_core_1.pgTable)('lease', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    startDate: (0, pg_core_1.timestamp)('start_date', { withTimezone: true }).notNull(),
    endDate: (0, pg_core_1.timestamp)('end_date', { withTimezone: true }).notNull(),
    rent: (0, pg_core_1.doublePrecision)().notNull(),
    deposit: (0, pg_core_1.doublePrecision)().notNull(),
    tenantId: (0, pg_core_1.integer)('tenant_id')
        .notNull()
        .references(() => exports.tenant.id, { onDelete: 'cascade' }),
    propertyId: (0, pg_core_1.integer)('property_id')
        .notNull()
        .references(() => exports.property.id, { onDelete: 'cascade' }),
});
// --------------------------------------------> PAYMENT <--------------------------------------------
exports.payment = (0, pg_core_1.pgTable)('payment', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    amountDue: (0, pg_core_1.doublePrecision)().notNull(),
    amountOaid: (0, pg_core_1.doublePrecision)().notNull(),
    dueDate: (0, pg_core_1.timestamp)('due_date', { withTimezone: true }).notNull(),
    paymentDate: (0, pg_core_1.timestamp)('payment_date', { withTimezone: true }).notNull(),
    paymentStatus: (0, utils_1.PaymentStatusEnum)('payment_status').notNull(),
    leaseId: (0, pg_core_1.integer)('lease_id')
        .notNull()
        .references(() => exports.lease.id, { onDelete: 'cascade' }),
});
// --------------------------------------------> RELATION MANY_TO_MANY <--------------------------------------------
exports.tenantFavorites = (0, pg_core_1.pgTable)('tenant_favorites', {
    propertyId: (0, pg_core_1.integer)('property_id')
        .notNull()
        .references(() => exports.property.id, { onDelete: 'cascade' }),
    tenantId: (0, pg_core_1.integer)('tenant_id')
        .notNull()
        .references(() => exports.tenant.id, { onDelete: 'cascade' }),
});
exports.tenantProperties = (0, pg_core_1.pgTable)('tenant_properties', {
    propertyId: (0, pg_core_1.integer)('property_id')
        .notNull()
        .references(() => exports.property.id, { onDelete: 'cascade' }),
    tenantId: (0, pg_core_1.integer)('tenant_id')
        .notNull()
        .references(() => exports.tenant.id, { onDelete: 'cascade' }),
});
