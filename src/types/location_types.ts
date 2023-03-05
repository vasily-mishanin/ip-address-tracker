export interface LocationData {
  ip: string;
  isp: string;
  location: {
    city: string;
    country: string;
    timezone: string;
    region: string;
    lat: number;
    lng: number;
    geonameId: number;
  };
  code?: string;
  message?: string;
}
