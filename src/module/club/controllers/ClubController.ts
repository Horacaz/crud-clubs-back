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
            app.get("api/club/:id", this.getClub.bind(this));
            app.post("api/club", this.addClub.bind(this));
            app.put("api/club/:id", this.editClub.bind(this));
            app.delete("api/club/:id", this.deleteClub.bind(this));
        }
        async home(req: Request, res: Response){
        const allClubs = await this.ClubService.getAllClubs();
        res.status(200).send({status: "Okey", data: allClubs}) ;
    }
    
        getClub(req: Request, res: Response){
        const club = this.ClubService.getClub(Number(req.params.id));
        res.status(200).send({status: "Okey", data: club}) ;
    }
    
        addClub(req: Request, res: Response){
        this.ClubService.addClub(req.params.crest, req.body);
        res.status(200).send({status: "Okey"}) ;
    }
        editClub(req: Request, res: Response){
        this.ClubService.editClub(req.params.crest, Number(req.params.id), req.body);
        res.status(200).send({status: "Okey"}) ;   
    }
    
        deleteClub(req: Request, res: Response){
        this.ClubService.deleteClub(Number(req.params.id));
        res.status(200).send({status: "Okey"}) ;
    }
}
