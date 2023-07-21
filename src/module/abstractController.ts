import {Request, Response} from "express"
export default abstract class AbstractController {
    abstract home(req: Request, res: Response): void;
    abstract addClub(req: Request, res: Response): void;
    abstract getClub(req: Request, res: Response): void;
    abstract deleteClub(req: Request, res: Response): void;
    abstract editClub(req: Request, res: Response): void;
}