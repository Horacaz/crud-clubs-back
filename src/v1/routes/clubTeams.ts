import express from "express"

import ClubTeams from "../controllers/clubTeamsController";

const router = express.Router();

router.get("/", ClubTeams.getAllClubTeams);

export default router;