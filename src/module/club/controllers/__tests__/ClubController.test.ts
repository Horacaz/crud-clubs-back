import { Request, Response } from "express";
import multer, { Multer } from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import ClubRepository from "../../repository/ClubRepository";
import ClubController from "../ClubController";
import ClubService from "../../services/ClubService";

jest.mock("../../repository/ClubRepository");
jest.mock("uuid");
jest.mock("fs");
jest.mock("../../services/ClubService");

const MockedClubRepository = ClubRepository as jest.MockedClass<
  typeof ClubRepository
>;
const mockedRepositoryInstance = new MockedClubRepository(
  uuidv4,
  fs,
  "test.json",
);

const mockedMulterInstance = multer() as jest.Mocked<Multer>;
const mockedClubService = new ClubService(
  mockedRepositoryInstance,
) as jest.Mocked<ClubService>;
const controller = new ClubController(mockedMulterInstance, mockedClubService);

describe("ClubController", () => {
  const mockReq = {
    params: {
      id: 1,
    },
  } as unknown as jest.Mocked<Request>;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as jest.Mocked<Response>;

  test("ClubController.home", () => {
    controller.home(mockReq, mockRes);
    expect(mockedClubService.getAllClubs).toHaveBeenCalledTimes(1);
  });

  test("ClubController.getClub", () => {
    controller.getClub(mockReq, mockRes);
    expect(mockedClubService.getClub).toHaveBeenCalledTimes(1);
    expect(mockedClubService.getClub).toHaveBeenCalledWith(1);
  });

  test("ClubController.addClub", () => {
    controller.addClub(mockReq, mockRes);
    expect(mockedClubService.addClub).toHaveBeenCalledTimes(1);
  });

  test("ClubController.editClub", () => {
    controller.editClub(mockReq, mockRes);
    expect(mockedClubService.editClub).toHaveBeenCalledTimes(1);
  });

  test("ClubController.deleteClub", () => {
    controller.deleteClub(mockReq, mockRes);
    expect(mockedClubService.deleteClub).toHaveBeenCalledTimes(1);
    expect(mockedClubService.deleteClub).toHaveBeenCalledWith(1);
  });
});
