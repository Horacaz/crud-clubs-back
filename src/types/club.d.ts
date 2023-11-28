export interface IClub {
  id?: number;
  country: string;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string | null;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: number;
  clubColors: string;
  venue: string;
}

export interface DBClub {
  id: number;
  country: string;
  name: string;
  short_name: string;
  tla: string;
  crest_url: string | null;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: number;
  club_colors: string;
  venue: string;
}
