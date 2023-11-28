import { Request, Response, Express } from "express";
import { Multer } from "multer";
import ClubService from "../services/ClubService";
import AbstractController from "./abstractController";
import { mapClubDataToEntity } from "../mappers/clubMapper";

export default class ClubController extends AbstractController {
  public uploadMiddleWare: Multer;

  public clubService: ClubService;

  constructor(uploadMiddleWare: Multer, clubService: ClubService) {
    super();
    this.uploadMiddleWare = uploadMiddleWare;
    this.clubService = clubService;
  }

  setupRoutes(app: Express) {
    app.get("/api", this.home.bind(this));
    app.get("/api/club/:id", this.getClub.bind(this));
    app.post(
      "/api/club",
      this.uploadMiddleWare.single("crest"),
      this.addClub.bind(this),
    );
    app.patch(
      "/api/club/:id",
      this.uploadMiddleWare.single("crest"),
      this.editClub.bind(this),
    );
    app.delete("/api/club/:id", this.deleteClub.bind(this));
  }

  async home(req: Request, res: Response) {
    const allClubs = await this.clubService.getAllClubs();
    res.status(200).send({ status: "200", data: allClubs });
  }

  async getClub(req: Request, res: Response) {
    const clubId = Number(req.params.id);
    const club = await this.clubService.getClub(clubId);
    res.status(200).send({ status: "200", data: club });
  }

  async addClub(req: Request, res: Response) {
    const club = mapClubDataToEntity(req.body);
    club.crestUrl = req.file?.path || null;

    this.clubService.addClub(club);
    res.status(200).send({ status: "200", message: "Club Added" });
  }

  async editClub(req: Request, res: Response) {
    const clubId = Number(req.params.id);
    const club = mapClubDataToEntity(req.body);
    club.crestUrl = req.file?.path || null;
    this.clubService.editClub(club, clubId);
    res.status(200).send({ status: "200", message: "Club Edited" });
  }

  async deleteClub(req: Request, res: Response) {
    const clubId = Number(req.params.id);

    this.clubService.deleteClub(clubId);
    res.status(200).send({ status: "200", message: "Club Deleted" });
  }
}
