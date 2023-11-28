import { IClub, DBClub } from "../../../../types/club";
import { mapClubDataToEntity, mapClubEntityFromDB } from "../clubMapper";
import Club from "../../entities/club";

const clubFromDBMock: DBClub = {
  id: 1,
  name: "name",
  country: "country",
  short_name: "short_name",
  tla: "tla",
  crest_url: "crest_url",
  address: "address",
  phone: "phone",
  website: "website",
  email: "email",
  founded: 1,
  club_colors: "club_colors",
  venue: "venue",
};

const clubData: IClub = {
  id: 1,
  name: "name",
  country: "country",
  shortName: "short_name",
  tla: "tla",
  crestUrl: "crest_url",
  address: "address",
  phone: "phone",
  website: "website",
  email: "email",
  founded: 1,
  clubColors: "club_colors",
  venue: "venue",
};

describe("mapClubDataToEntity", () => {
  test("maps club data to entity", () => {
    const club = mapClubDataToEntity(clubData);
    expect(club).toBeInstanceOf(Club);
  });
});

describe("mapClubEntityFromDB", () => {
  test("maps club from db to entity", () => {
    const club = mapClubEntityFromDB(clubFromDBMock);
    expect(club).toBeInstanceOf(Club);
    expect(club).toEqual(clubData);
  });
});
