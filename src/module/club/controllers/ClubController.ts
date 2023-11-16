import { Request, Response, Express } from "express";
import { Multer } from "multer";
import ClubService from "../services/ClubService";
import AbstractController from "../../abstractController";

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
    app.patch("/api/club/:id", this.editClub.bind(this));
    app.delete("/api/club/:id", this.deleteClub.bind(this));
  }

  async home(req: Request, res: Response) {
    const allClubs = await this.clubService.getAllClubs();
    res.status(200).send({ status: "Okey", data: allClubs });
  }

  async getClub(req: Request, res: Response) {
    const club = await this.clubService.getClub(Number(req.params.id));
    res.status(200).send({ status: "Okey", data: club });
  }

  async addClub(req: Request, res: Response) {
    if (req.file) {
      this.clubService.addClub(req.body, req.file);
      res.status(200).send({ status: "Okey" });
    } else {
      this.clubService.addClub(req.body);
      res.status(200).send({ status: "Okey" });
    }
  }

  async editClub(req: Request, res: Response) {
    if (req.file) {
      this.clubService.editClub(req.body, Number(req.params.id), req.file);
      res.status(200).send({ status: "Okey" });
    } else {
      this.clubService.editClub(req.body, Number(req.params.id));
      res.status(200).send({ status: "Okey" });
    }
  }

  async deleteClub(req: Request, res: Response) {
    this.clubService.deleteClub(Number(req.params.id));
    res.status(200).send({ status: "Okey" });
  }
}
