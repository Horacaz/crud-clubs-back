import {Request, Response, Express} from "express"
import ClubService from "../services/ClubService";
import AbstractController from "../../abstractController";
import multer from "multer";

export default class ClubController extends AbstractController {
    public uploadMiddleWare: typeof multer
    public ClubService: ClubService
    constructor(uploadMiddleWare: typeof multer, ClubService: ClubService) {
        super();
        this.ClubService = ClubService;
        this.uploadMiddleWare = uploadMiddleWare; 
    }

        setupRoutes(app: Express){
            app.get("/api", this.home.bind(this));
            app.get("/api/club/:id", this.getClub.bind(this));
            app.post("/api/club/", this.addClub.bind(this));
            app.patch("/api/club/:id", this.editClub.bind(this));
            app.delete("/api/club/:id", this.deleteClub.bind(this));
        }
        async home(req: Request, res: Response){
        const allClubs = await this.ClubService.getAllClubs();
        res.status(200).send({status: "Okey", data: allClubs}) ;
    }
    
        async getClub(req: Request, res: Response){
        const club = await this.ClubService.getClub(Number(req.params.id));
        res.status(200).send({status: "Okey", data: club}) ;
    }
    
        async addClub(req: Request, res: Response){
        this.ClubService.addClub(req.params.crest, req.body);
        res.status(200).send({status: "Okey"}) ;
    }
        async editClub(req: Request, res: Response){
        this.ClubService.editClub(req.params.crest, Number(req.params.id), req.body);
        res.status(200).send({status: "Okey"}) ;   
    }
    
        async deleteClub(req: Request, res: Response){
        this.ClubService.deleteClub(Number(req.params.id));
        res.status(200).send({status: "Okey"}) ;
    }
}
