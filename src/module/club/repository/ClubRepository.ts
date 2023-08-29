import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import IClub from "../../../types/club";
export default class ClubRepository {
  uuid: typeof uuidv4;
  filesystem: typeof fs;
  jsonUrl: string;

  constructor(uuid: typeof uuidv4, filesystem: typeof fs, jsonURL: string) {
    this.uuid = uuid;
    (this.filesystem = filesystem), (this.jsonUrl = jsonURL);
  }
  async getAllClubs() {
    const teamsData = await JSON.parse(fs.readFileSync(this.jsonUrl, "utf-8"));
    return teamsData;
  }

  async getClub(id: number) {
    const clubs = await JSON.parse(fs.readFileSync(this.jsonUrl, "utf-8"));
    const clubId = Number(id);
    const clubData: IClub = clubs.filter(
      (club: IClub) => club.id === clubId
    )[0];
    return clubData;
  }

  async addClub(data: IClub, crest?: Express.Multer.File) {
    console.log(crest);
    const teams = await JSON.parse(fs.readFileSync(this.jsonUrl, "utf-8"));
    const lastId = teams[teams.length - 1].id;
    const newTeam = {
      id: lastId + 1,
      area: {
        name: data.country || null,
      },
      name: data.name || null,
      shortName: data.shortName || null,
      tla: data.tla || null,
      crestUrl: `/images/${crest?.originalname}` || null,
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
    fs.writeFileSync(this.jsonUrl, JSON.stringify(teams));
  }

  async deleteClub(IdClubToDelete: number) {
    const clubs = await JSON.parse(fs.readFileSync(this.jsonUrl, "utf-8"));
    const filteredClubs = clubs.filter(
      (team: IClub) => team.id !== IdClubToDelete
    );
    fs.writeFileSync(this.jsonUrl, JSON.stringify(filteredClubs));
  }

  async editClub(data: IClub, teamId: number, crest?: Express.Multer.File) {
    const teams = await JSON.parse(fs.readFileSync(this.jsonUrl, "utf-8"));
    const teamToEdit = teams.filter((team: IClub) => team.id === teamId)[0];
    const filteredData = Object.entries(data).filter(
      (entry) => entry[1] !== ""
    );
    const parsedData = Object.fromEntries(filteredData);
    const editedTeam = Object.assign(teamToEdit, parsedData);
    editedTeam.lastUpdated = new Date();
    if (parsedData.country) editedTeam.area.name = parsedData.country;
    if (crest) editedTeam.crestUrl = `/images/${crest?.originalname}`;
    fs.writeFileSync(this.jsonUrl, JSON.stringify(teams));
  }
}
