import { Multer } from "multer";
import { Request, Response } from "express";
import ClubController from "../ClubController";
import ClubService from "../../services/ClubService";

const multerMock = {
  single: jest.fn(),
} as unknown as jest.Mocked<Multer>;

const serviceMock = {
  getAllClubs: jest.fn(),
  getClub: jest.fn(),
  addClub: jest.fn(),
  editClub: jest.fn(),
  deleteClub: jest.fn(),
} as unknown as jest.Mocked<ClubService>;

const controller = new ClubController(multerMock, serviceMock);

const mockReq = {
  params: {
    id: 1,
  },
  body: {
    name: "test",
    code: "test",
    shortName: "test",
    tla: "test",
    address: "test",
    phone: "test",
    website: "test",
    email: "test",
    founded: 1,
    clubColors: "test",
    venue: "test",
    lastUpdated: "test",
    crestUrl: "test",
  },
} as unknown as jest.Mocked<Request>;
const mockRes = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as unknown as jest.Mocked<Response>;

describe("ClubController", () => {
  test("ClubController.home", () => {
    controller.home(mockReq, mockRes);
    expect(serviceMock.getAllClubs).toHaveBeenCalledTimes(1);
  });

  test("ClubController.getClub", () => {
    controller.getClub(mockReq, mockRes);
    expect(serviceMock.getClub).toHaveBeenCalledTimes(1);
    expect(serviceMock.getClub).toHaveBeenCalledWith(1);
  });

  test("ClubController.addClub", () => {
    controller.addClub(mockReq, mockRes);
    expect(serviceMock.addClub).toHaveBeenCalledTimes(1);
  });

  test("ClubController.editClub", () => {
    controller.editClub(mockReq, mockRes);
    expect(serviceMock.editClub).toHaveBeenCalledTimes(1);
  });

  test("ClubController.deleteClub", () => {
    controller.deleteClub(mockReq, mockRes);
    expect(serviceMock.deleteClub).toHaveBeenCalledTimes(1);
    expect(serviceMock.deleteClub).toHaveBeenCalledWith(1);
  });
});
