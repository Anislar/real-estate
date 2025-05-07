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
  PaymentStatusEnum,
  ApplicationStatusEnum,
  PropertyTypeEnum,
  AmenitytEnum,
  HighlightEnum,
};
