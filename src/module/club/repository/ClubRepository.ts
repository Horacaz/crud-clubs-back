import { v4 as uuidv4 } from 'uuid';
import fs from "fs"
import IClub from '../../../types/club';
export default class ClubRepository{
  uuid: typeof uuidv4;
  filesystem: typeof fs;
  jsonUrl: string;

  constructor(uuid: typeof uuidv4, filesystem: typeof fs, jsonURL: string){
    this.uuid= uuid;
    this.filesystem = filesystem,
    this.jsonUrl = jsonURL
  }
  async getAllClubs(){
    const teamsData = await JSON.parse(fs.readFileSync(this.jsonUrl, "utf-8"));
    return teamsData;
  }

  async getClub(id: number){
    const clubs = await JSON.parse(this.jsonUrl);
    const clubId = Number(id);
    const clubData: IClub = clubs.filter((club: IClub) => club.id === clubId)[0];
    return clubData;
  }

  async addClub (crest: string, data: IClub) {
    const teams = await JSON.parse(this.jsonUrl);
    const lastId = teams[teams.length - 1].id;
    const newTeam = {
          id: lastId + 1,
          area: {
            name: data.area.name || null,
          },
          name: data.name || null,
          shortName: data.shortName || null,
          tla: data.tla || null,
          crestUrl: `/images/${crest}` || null,
          address: data.address || null,
          phone: data.phone || null,
          website: data.website || null,
          email: data.email || null,
          founded: data.founded || null,
          clubColors: data.clubColors || null,
          venue: data.venue || null,
          lastUpdated: new Date().toLocaleString(),
  };

    teams.push(newTeam);
    fs.writeFileSync("./db.json", JSON.stringify(teams));
  }
    
  deleteClub = async (IdClubToDelete: number) => {
    const clubs = await JSON.parse(this.jsonUrl);
    const filteredClubs = clubs.filter((team: IClub) => team.id !== IdClubToDelete);
    fs.writeFileSync("./db.json", JSON.stringify(filteredClubs));
  }
    
  editClub = async (crest: string, teamId: number, data: IClub) => {
    const teams = await JSON.parse(this.jsonUrl);
    const teamToEdit = teams.filter((team: IClub) => team.id === teamId)[0];
    const filteredData = Object.entries(data).filter((entry) => entry[1] !== "");
    const parsedData = Object.fromEntries(filteredData);
    const editedTeam = Object.assign(teamToEdit, parsedData);
    editedTeam.lastUpdated = new Date();
    if (parsedData.country) editedTeam.area.name = parsedData.country;
    if(crest) editedTeam.crestUrl = `/images/${crest}`;
    fs.writeFileSync("./db.json", JSON.stringify(teams));
    }
}
