import { IClub } from "../../../types/club";

export default abstract class AbstractService {
  abstract getAllClubs(): Promise<IClub[]>;
  abstract getClub(id: number): Promise<IClub>;
  abstract addClub(data: IClub): void;
  abstract deleteClub(id: number): void;
  abstract editClub(data: IClub, id: number, crest?: Express.Multer.File): void;
}
