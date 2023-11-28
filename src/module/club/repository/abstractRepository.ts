import { IClub } from "../../../types/club";

export default abstract class AbstractRepository {
  abstract getAllClubs(): Promise<IClub[]>;
  abstract getClub(id: number): Promise<IClub>;
  abstract addClub(data: IClub, crest?: Express.Multer.File): void;
  abstract deleteClub(id: number): void;
  abstract editClub(data: IClub, id: number, crest?: Express.Multer.File): void;
}
