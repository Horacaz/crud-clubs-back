import {Request, Response} from "express"
import ClubTeamsServices from "../services/ClubTeamsServices";

const getAllClubTeams = (req: Request, res: Response) => {
    const allClubTeams = ClubTeamsServices.getAllClubTeams();
    res.status(200).send({status: "Okey", data: allClubTeams}) ;
}

export default { getAllClubTeams };