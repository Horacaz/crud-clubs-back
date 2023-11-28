import { IClub, DBClub } from "../../../types/club";
import Club from "../entities/club";

export function mapClubEntityFromDB(data: DBClub): IClub {
  return new Club({
    id: data.id,
    country: data.country,
    name: data.name,
    shortName: data.short_name,
    tla: data.tla,
    crestUrl: data.crest_url,
    address: data.address,
    phone: data.phone,
    website: data.website,
    email: data.email,
    founded: data.founded,
    clubColors: data.club_colors,
    venue: data.venue,
  });
}

export function mapClubDataToEntity(clubData: IClub): IClub {
  return new Club({
    country: clubData.country,
    name: clubData.name,
    shortName: clubData.shortName,
    crestUrl: clubData.crestUrl,
    tla: clubData.tla,
    address: clubData.address,
    phone: clubData.phone,
    website: clubData.website,
    email: clubData.email,
    founded: clubData.founded,
    clubColors: clubData.clubColors,
    venue: clubData.venue,
  });
}
