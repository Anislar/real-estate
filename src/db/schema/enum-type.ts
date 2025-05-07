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
export { PaymentStatus, PropertyType, Amenity, Highlight, ApplicationStatus };
