import ClubRepository from "../repository/ClubRepository";
import IClub from "../../../types/club";
export default class ClubService {
  public ClubRepository: ClubRepository;
  constructor(Repository: ClubRepository) {
    this.ClubRepository = Repository;
  }
    async getAllClubs(){
      const allClubTeams =  await this.ClubRepository.getAllClubs();
      return allClubTeams;
    }

    getClub(clubId: number){
      const clubtoGet = this.ClubRepository.getClub(clubId);
      return clubtoGet;
    }

    addClub(crest: string, club: IClub){
      const clubData = club
      this.ClubRepository.addClub(crest, clubData);
    }

    editClub(crest: string, clubId: number, club: IClub){
      const dataToEdit = club;
      this.ClubRepository.editClub(crest, clubId, dataToEdit); 
    }

    deleteClub(clubId: number){
      const clubToDelete = clubId;
      this.ClubRepository.deleteClub(clubToDelete);
    }
}