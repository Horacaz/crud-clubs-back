const express = require("express");
const ClubTeams  = require("../controllers/clubTeamsController");

const router = express.Router();

router.get("/", ClubTeams.getAllClubTeams);


module.exports = router;