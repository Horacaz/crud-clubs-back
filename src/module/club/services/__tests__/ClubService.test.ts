import ClubRepository from "../../repository/sqlite/ClubRepository";
import ClubService from "../ClubService";
import { IClub } from "../../../../types/club";

beforeAll(() => {
  jest.clearAllMocks();
});

const mockedRepositoryInstance = {
  getAllClubs: jest.fn(),
  getClub: jest.fn(),
  addClub: jest.fn(),
  editClub: jest.fn(),
  deleteClub: jest.fn(),
} as unknown as jest.Mocked<ClubRepository>;

const service = new ClubService(mockedRepositoryInstance);

describe("ClubService", () => {
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
  test("addClub should call the addClub method once", async () => {
    const clubToAdd = {
      name: "clubTest",
    } as IClub;
    service.addClub(clubToAdd);
    expect(mockedRepositoryInstance.addClub).toHaveBeenCalledTimes(1);
    expect(mockedRepositoryInstance.addClub).toHaveBeenCalledWith(clubToAdd);
  });
  test("editClub should call the editClub method once", async () => {
    const clubEditFields = {
      name: "newClubName",
    } as IClub;
    const clubId = 1;
    service.editClub(clubEditFields, clubId);
    expect(mockedRepositoryInstance.editClub).toHaveBeenCalledTimes(1);
    expect(mockedRepositoryInstance.editClub).toHaveBeenCalledWith(
      clubEditFields,
      clubId,
    );
  });
  test("deleteClub should call the deleteClub method once", async () => {
    const clubId = 1;
    service.deleteClub(clubId);
    expect(mockedRepositoryInstance.deleteClub).toHaveBeenCalledTimes(1);
    expect(mockedRepositoryInstance.deleteClub).toHaveBeenCalledWith(clubId);
  });
});
