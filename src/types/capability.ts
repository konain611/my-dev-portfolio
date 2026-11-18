export interface CapabilityItem {
  code: string;
  name: string;
  application: string;
}

export interface CapabilityGroup {
  code: string;
  discipline: string;
  note: string;
  items: CapabilityItem[];
}
