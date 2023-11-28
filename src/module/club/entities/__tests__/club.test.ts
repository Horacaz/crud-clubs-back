import { IClub } from "../../../../types/club";
import Club from "../club";

const clubMock: IClub = {
  id: 1,
  country: "country",
  name: "name",
  shortName: "shortName",
  tla: "tla",
  crestUrl: "crestUrl",
  address: "address",
  phone: "phone",
  website: "website",
  email: "email",
  founded: 1,
  clubColors: "clubColors",
  venue: "venue",
};

describe("Club", () => {
  test("should create an instance of Club", () => {
    const club = new Club(clubMock);
    expect(club).toBeInstanceOf(Club);
  });
});
