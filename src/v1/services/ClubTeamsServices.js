const ClubTeams = require("../database/ClubTeams");

const getAllClubTeams = () => {
    const allClubTeams =  ClubTeams.getAllClubTeams();
    return allClubTeams;
}

module.exports = {getAllClubTeams};