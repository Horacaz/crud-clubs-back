import { IClub } from "../../../types/club";

export default class Club implements IClub {
  id: number | undefined;

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

  constructor(club: IClub) {
    this.id = club.id;
    this.country = club.country;
    this.name = club.name;
    this.shortName = club.shortName;
    this.tla = club.tla;
    this.crestUrl = club.crestUrl;
    this.address = club.address;
    this.phone = club.phone;
    this.website = club.website;
    this.email = club.email;
    this.founded = club.founded;
    this.clubColors = club.clubColors;
    this.venue = club.venue;
  }
}
