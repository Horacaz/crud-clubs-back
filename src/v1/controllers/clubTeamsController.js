const ClubTeamsServices = require("../services/ClubTeamsServices");
//these are the http methods, handled by the router,
const getAllClubTeams = (req, res) => {
    const allClubTeams = ClubTeamsServices.getAllClubTeams();
    res.status(200).send({status: "Okey", data: allClubTeams}) ;
}

module.exports = { getAllClubTeams };