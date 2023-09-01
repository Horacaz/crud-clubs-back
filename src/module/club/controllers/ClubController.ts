import { Request, Response, Express } from "express";
import ClubService from "../services/ClubService";
import AbstractController from "../../abstractController";
import { Multer } from "multer";

export default class ClubController extends AbstractController {
  public uploadMiddleWare: Multer;
  public ClubService: ClubService;
  constructor(uploadMiddleWare: Multer, ClubService: ClubService) {
    super();
    this.uploadMiddleWare = uploadMiddleWare;
    this.ClubService = ClubService;
  }

  setupRoutes(app: Express) {
    app.get("/api", this.home.bind(this));
    app.get("/api/club/:id", this.getClub.bind(this));
    app.post(
      "/api/club",
      this.uploadMiddleWare.single("crest"),
      this.addClub.bind(this)
    );
    app.patch("/api/club/:id", this.editClub.bind(this));
    app.delete("/api/club/:id", this.deleteClub.bind(this));
  }
  async home(req: Request, res: Response) {
    const allClubs = await this.ClubService.getAllClubs();
    res.status(200).send({ status: "Okey", data: allClubs });
  }

  async getClub(req: Request, res: Response) {
    const club = await this.ClubService.getClub(Number(req.params.id));
    res.status(200).send({ status: "Okey", data: club });
  }

  async addClub(req: Request, res: Response) {
    if (req.file) {
      this.ClubService.addClub(req.body, req.file);
      res.status(200).send({ status: "Okey" });
    } else {
      this.ClubService.addClub(req.body);
      res.status(200).send({ status: "Okey" });
    }
  }
  async editClub(req: Request, res: Response) {
    if (req.file) {
      this.ClubService.editClub(req.body, Number(req.params.id), req.file);
      res.status(200).send({ status: "Okey" });
    } else {
      this.ClubService.editClub(req.body, Number(req.params.id));
      res.status(200).send({ status: "Okey" });
    }
  }

  async deleteClub(req: Request, res: Response) {
    this.ClubService.deleteClub(Number(req.params.id));
    res.status(200).send({ status: "Okey" });
  }
}
