import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import ClubRepository from "../../repository/ClubRepository";
import ClubService from "../ClubService";
import IClub from "../../../../types/club";

jest.mock("../../repository/ClubRepository");
jest.mock("uuid");
jest.mock("fs");

const MockedClubRepository = ClubRepository as jest.MockedClass<
  typeof ClubRepository
>;
const mockedRepositoryInstance = new MockedClubRepository(
  uuidv4,
  fs,
  "test.json",
);

describe("ClubService", () => {
  const service = new ClubService(mockedRepositoryInstance);
  test("getAllClubs should call the getAllClubs method once", async () => {
    await service.getAllClubs();
    expect(mockedRepositoryInstance.getAllClubs).toHaveBeenCalledTimes(1);
  });
  test("getClub should call the getClub method once", async () => {
    const clubId = 1;
    await service.getClub(1);
    expect(mockedRepositoryInstance.getClub).toHaveBeenCalledTimes(1);
    expect(mockedRepositoryInstance.getClub).toHaveBeenCalledWith(clubId);
  });
  test("addClub should call the addClub method once", () => {
    const clubToAdd = {
      name: "clubTest",
    } as IClub;
    const crestUndefined = undefined;
    service.addClub(clubToAdd, undefined);
    expect(mockedRepositoryInstance.addClub).toHaveBeenCalledTimes(1);
    expect(mockedRepositoryInstance.addClub).toHaveBeenCalledWith(
      clubToAdd,
      crestUndefined,
    );
  });
  test("editClub should call the editClub method once", () => {
    const clubEditFields = {
      name: "newClubName",
    } as IClub;
    const clubId = 1;
    const crestUndefined = undefined;
    service.editClub(clubEditFields, clubId, crestUndefined);
    expect(mockedRepositoryInstance.editClub).toHaveBeenCalledTimes(1);
    expect(mockedRepositoryInstance.editClub).toHaveBeenCalledWith(
      clubEditFields,
      clubId,
      crestUndefined,
    );
  });
  test("deleteClub should call the deleteClub method once", () => {
    const clubId = 1;
    service.deleteClub(clubId);
    expect(mockedRepositoryInstance.deleteClub).toHaveBeenCalledTimes(1);
    expect(mockedRepositoryInstance.deleteClub).toHaveBeenCalledWith(clubId);
  });
});
