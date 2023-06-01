import ClubTeams from "../database/ClubTeams";

const getAllClubTeams = () => {
    const allClubTeams =  ClubTeams.getAllClubTeams();
    return allClubTeams;
}

export default {getAllClubTeams};