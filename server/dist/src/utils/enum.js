"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightEnum = exports.AmenitytEnum = exports.PropertyTypeEnum = exports.ApplicationStatusEnum = exports.PaymentStatusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const HighlightEnum = (0, pg_core_1.pgEnum)('highlights', [
    'HighSpeedInternetAccess',
    'WasherDryer',
    'AirConditioning',
    'Heating',
    'SmokeFree',
    'CableReady',
    'SatelliteTV',
    'DoubleVanities',
    'TubShower',
    'Intercom',
    'SprinklerSystem',
    'RecentlyRenovated',
    'CloseToTransit',
    'GreatView',
    'QuietNeighborhood',
]);
exports.HighlightEnum = HighlightEnum;
const AmenitytEnum = (0, pg_core_1.pgEnum)('amenities', [
    'WasherDryer',
    'AirConditioning',
    'Dishwasher',
    'HighSpeedInternet',
    'HardwoodFloors',
    'WalkInClosets',
    'Microwave',
    'Refrigerator',
    'Pool',
    'Gym',
    'Parking',
    'PetsAllowed',
    'WiFi',
]);
exports.AmenitytEnum = AmenitytEnum;
const PropertyTypeEnum = (0, pg_core_1.pgEnum)('property_type', [
    'Rooms',
    'Tinyhouse',
    'Apartment',
    'Villa',
    'Townhouse',
    'Cottage',
]);
exports.PropertyTypeEnum = PropertyTypeEnum;
const ApplicationStatusEnum = (0, pg_core_1.pgEnum)('application_status', [
    'Pending',
    'Denied',
    'Approved',
]);
exports.ApplicationStatusEnum = ApplicationStatusEnum;
const PaymentStatusEnum = (0, pg_core_1.pgEnum)('payment_status', [
    'Pending',
    'Paid',
    'Overdue',
    'PartiallyPaid',
]);
exports.PaymentStatusEnum = PaymentStatusEnum;
