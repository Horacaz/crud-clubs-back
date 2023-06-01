const DB = require("./db.json");

const getAllClubTeams = () => {
    return DB;
}

module.exports =  { getAllClubTeams };