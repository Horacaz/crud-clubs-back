import { IClub } from "../../../types/club";
import ClubRepository from "../repository/sqlite/ClubRepository";
import AbstractService from "./abstractService";

export default class ClubService implements AbstractService {
  public ClubRepository: ClubRepository;

  constructor(Repository: ClubRepository) {
    this.ClubRepository = Repository;
  }

  async getAllClubs() {
    const allClubTeams = await this.ClubRepository.getAllClubs();
    return allClubTeams;
  }

  async getClub(clubId: number) {
    const clubtoGet = await this.ClubRepository.getClub(clubId);
    return clubtoGet;
  }

  async addClub(club: IClub) {
    this.ClubRepository.addClub(club);
  }

  async editClub(club: IClub, clubId: number) {
    const dataToEdit = club;
    this.ClubRepository.editClub(dataToEdit, clubId);
  }

  async deleteClub(clubId: number) {
    const clubToDelete = clubId;
    this.ClubRepository.deleteClub(clubToDelete);
  }
}
