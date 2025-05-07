import { pgEnum } from 'drizzle-orm/pg-core';

const Highlight = pgEnum('highlights', [
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

const Amenity = pgEnum('amenities', [
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
const PropertyType = pgEnum('property_type', [
  'Rooms',
  'Tinyhouse',
  'Apartment',
  'Villa',
  'Townhouse',
  'Cottage',
]);
const ApplicationStatus = pgEnum('application_status', [
  'Pending',
  'Denied',
  'Approved',
]);
const PaymentStatus = pgEnum('payment_status', [
  'Pending',
  'Paid',
  'Overdue',
  'PartiallyPaid',
]);
// ---------------------------------------- TypeScript Enums ----------------------------------------

// TypeScript Enums for application logic
enum HighlightEnum {
  HighSpeedInternetAccess = 'HighSpeedInternetAccess',
  WasherDryer = 'WasherDryer',
  AirConditioning = 'AirConditioning',
  Heating = 'Heating',
  SmokeFree = 'SmokeFree',
  CableReady = 'CableReady',
  SatelliteTV = 'SatelliteTV',
  DoubleVanities = 'DoubleVanities',
  TubShower = 'TubShower',
  Intercom = 'Intercom',
  SprinklerSystem = 'SprinklerSystem',
  RecentlyRenovated = 'RecentlyRenovated',
  CloseToTransit = 'CloseToTransit',
  GreatView = 'GreatView',
  QuietNeighborhood = 'QuietNeighborhood',
}

enum AmenitytEnum {
  WasherDryer = 'WasherDryer',
  AirConditioning = 'AirConditioning',
  Dishwasher = 'Dishwasher',
  HighSpeedInternet = 'HighSpeedInternet',
  HardwoodFloors = 'HardwoodFloors',
  WalkInClosets = 'WalkInClosets',
  Microwave = 'Microwave',
  Refrigerator = 'Refrigerator',
  Pool = 'Pool',
  Gym = 'Gym',
  Parking = 'Parking',
  PetsAllowed = 'PetsAllowed',
  WiFi = 'WiFi',
}

enum PropertyTypeEnum {
  Rooms = 'Rooms',
  Tinyhouse = 'Tinyhouse',
  Apartment = 'Apartment',
  Villa = 'Villa',
  Townhouse = 'Townhouse',
  Cottage = 'Cottage',
}

enum ApplicationStatusEnum {
  Pending = 'Pending',
  Denied = 'Denied',
  Approved = 'Approved',
}

enum PaymentStatusEnum {
  Pending = 'Pending',
  Paid = 'Paid',
  Overdue = 'Overdue',
  PartiallyPaid = 'PartiallyPaid',
}

export {
  PaymentStatus,
  ApplicationStatus,
  PropertyType,
  Amenity,
  Highlight,
  PaymentStatusEnum,
  ApplicationStatusEnum,
  PropertyTypeEnum,
  AmenitytEnum,
  HighlightEnum,
};
