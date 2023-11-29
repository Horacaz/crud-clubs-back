import Database, { Database as TDatabase } from "better-sqlite3";
import fs from "fs";
import ClubRepository from "../ClubRepository";
import Club from "../../../entities/club";

let sqlLiteDBMock: TDatabase;

beforeEach(() => {
  sqlLiteDBMock = new Database(":memory:");
  const migration = fs.readFileSync("./src/config/setup.sql", "utf-8");
  sqlLiteDBMock.exec(migration);
});

describe("ClubRepository", () => {
  test("saving a club should generate an unique id", async () => {
    const repository = new ClubRepository(sqlLiteDBMock);
    const clubData = new Club({
      name: "test",
      shortName: "test",
      tla: "test",
      address: "test",
      phone: "test",
      website: "test",
      email: "test",
      founded: 2000,
      clubColors: "test",
      venue: "test",
      country: "test",
      crestUrl: "test",
    });
    const club = await repository.addClub(clubData);

    expect(club.lastInsertRowid).toEqual(1);
  });

  test("editing fields of an existing club should update the club", async () => {
    const repository = new ClubRepository(sqlLiteDBMock);
    const clubData = new Club({
      name: "test",
      shortName: "test",
      tla: "test",
      address: "test",
      phone: "test",
      website: "test",
      email: "test",
      founded: 2000,
      clubColors: "test",
      venue: "test",
      country: "test",
      crestUrl: "test",
    });

    await repository.addClub(clubData);

    const newClubData = new Club({
      name: "newClubEdited",
      shortName: "",
      tla: "",
      address: "",
      phone: "",
      website: "",
      email: "",
      founded: 2023,
      clubColors: "",
      venue: "",
      country: "",
      crestUrl: "",
    });
    await repository.editClub(newClubData, 1);
    const editedClub = await repository.getClub(1);
    expect(editedClub.name).toEqual(newClubData.name);
    expect(editedClub.founded).toEqual(newClubData.founded);
    expect(editedClub.country).toEqual(clubData.country);
  });

  test("deleting a club should delete the club", async () => {
    const repository = new ClubRepository(sqlLiteDBMock);
    const clubData = new Club({
      name: "test",
      shortName: "test",
      tla: "test",
      address: "test",
      phone: "test",
      website: "test",
      email: "test",
      founded: 2000,
      clubColors: "test",
      venue: "test",
      country: "test",
      crestUrl: null,
    });

    await repository.addClub(clubData);
    await repository.addClub(clubData);
    const totalOfClubs = await repository.getAllClubs();
    expect(totalOfClubs.length).toEqual(2);
    await repository.deleteClub(1);
    const totalOfClubsAfterDelete = await repository.getAllClubs();
    expect(totalOfClubsAfterDelete.length).toEqual(1);
    expect(totalOfClubsAfterDelete[0].id).toEqual(2);
  });
  test("should retrive all added clubs", async () => {
    const repository = new ClubRepository(sqlLiteDBMock);
    const clubData = new Club({
      name: "test",
      shortName: "test",
      tla: "test",
      address: "test",
      phone: "test",
      website: "test",
      email: "test",
      founded: 2000,
      clubColors: "test",
      venue: "test",
      country: "test",
      crestUrl: null,
    });
    await repository.addClub(clubData);
    await repository.addClub(clubData);
    const totalOfClubs = await repository.getAllClubs();
    expect(totalOfClubs.length).toEqual(2);
  });
  test("should get a club", async () => {
    const repository = new ClubRepository(sqlLiteDBMock);
    const clubData = new Club({
      name: "test",
      shortName: "test",
      tla: "test",
      address: "test",
      phone: "test",
      website: "test",
      email: "test",
      founded: 2000,
      clubColors: "test",
      venue: "test",
      country: "test",
      crestUrl: null,
    });
    await repository.addClub(clubData);
    const club = await repository.getClub(1);
    expect(club.name).toEqual(clubData.name);
  });

  test("deleting the crest of a club should throw if it doesn't exist", async () => {
    const repository = new ClubRepository(sqlLiteDBMock);
    const club = new Club({
      name: "test",
      shortName: "test",
      tla: "test",
      address: "test",
      phone: "test",
      website: "test",
      email: "test",
      founded: 2000,
      clubColors: "test",
      venue: "test",
      country: "test",
      crestUrl: "test",
    });
    await repository.addClub(club);
    try {
      await repository.deleteClub(1);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toEqual(Error("Couldn't delete Crest Image"));
    }
  });
});
