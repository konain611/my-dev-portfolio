export interface Coordinates {
  lat: number;
  lng: number;
  label: string;
}

export interface Location {
  city: string;
  country: string;
  timezone: string;
  coordinates: Coordinates;
}

export interface Availability {
  available: boolean;
  label: string;
}

export interface AboutContent {
  lead: string;
  body: string;
  emphasis: string[];
}

export interface SpecRow {
  key: string;
  value: string;
}

export interface Profile {
  name: string;
  displayName: string;
  firstName: string;
  lastName: string;
  role: string;
  roleLine: string;
  email: string;
  phone: string;
  location: Location;
  availability: Availability;
  experience: string;
  status: string;
  summary: string;
  about: AboutContent;
  focus: string[];
  stack: string[];
  revision: string;
  edition: string;
  specs: SpecRow[];
  highestEducation?: string;
}
