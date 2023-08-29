import ClubRepository from "../repository/ClubRepository";
import IClub from "../../../types/club";
export default class ClubService {
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

  addClub(club: IClub, crest?: Express.Multer.File) {
    const clubData = club;
    this.ClubRepository.addClub(clubData, crest);
  }

  editClub(club: IClub, clubId: number, crest?: Express.Multer.File) {
    const dataToEdit = club;
    this.ClubRepository.editClub(dataToEdit, clubId, crest);
  }

  deleteClub(clubId: number) {
    const clubToDelete = clubId;
    this.ClubRepository.deleteClub(clubToDelete);
  }
}
