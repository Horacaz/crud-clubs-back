export default interface IClub {
  id: number;
  area?: {
    id: number;
    name: string;
  };
  country?: string;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}
