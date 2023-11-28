import { Database } from "better-sqlite3";
import fs from "fs";
import path from "path";
import { IClub, DBClub } from "../../../../types/club";
import AbstractRepository from "../abstractRepository";
import { mapClubEntityFromDB } from "../../mappers/clubMapper";

export default class ClubRepository extends AbstractRepository {
  db: Database;

  constructor(database: Database) {
    super();
    this.db = database;
  }

  async getAllClubs() {
    const statement = this.db.prepare(
      "SELECT id, name, country, short_name, tla, crest_url, address, phone, website, email, founded, club_colors, venue FROM clubs",
    );
    const rows = statement.all();
    const clubs = rows.map((row) => mapClubEntityFromDB(row as DBClub));
    return clubs;
  }

  async getClub(clubId: number) {
    const statement = this.db.prepare(
      "SELECT id, name, country, short_name, tla, crest_url, address, phone, website, email, founded, club_colors, venue FROM clubs WHERE id = ?",
    );
    const row = statement.get(clubId);
    const club = mapClubEntityFromDB(row as DBClub);
    return club;
  }

  async addClub(clubData: IClub) {
    const statement = this.db.prepare(`
      INSERT INTO clubs
      (name, crest_url, country, short_name, tla, address, phone, website, email, founded, club_colors, venue)
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
    const clubFields = [
      clubData.name,
      clubData.crestUrl,
      clubData.country,
      clubData.shortName,
      clubData.tla,
      clubData.address,
      clubData.phone,
      clubData.website,
      clubData.email,
      clubData.founded,
      clubData.clubColors,
      clubData.venue,
    ];
    statement.run(clubFields);
  }

  async deleteClub(clubId: number) {
    const crestStatement = this.db.prepare(
      `SELECT crest_url FROM clubs WHERE id = ${clubId}`,
    );
    const crestRow = (await crestStatement.get()) as { crest_url: string };

    const clubStatement = this.db.prepare("DELETE FROM clubs WHERE id = ?");
    const clubToDelete = clubId;
    clubStatement.run(clubToDelete);
    if (crestRow.crest_url) {
      try {
        fs.unlinkSync(path.resolve(crestRow.crest_url as string));
      } catch (error) {
        throw new Error("Couldn't delete Crest Image");
      }
    }
  }

  async editClub(clubData: IClub, clubId: number) {
    const clubEditFields = {
      crest_url: clubData.crestUrl,
      name: clubData.name,
      country: clubData.country,
      short_name: clubData.shortName,
      tla: clubData.tla,
      address: clubData.address,
      phone: clubData.phone,
      website: clubData.website,
      email: clubData.email,
      founded: clubData.founded,
      club_colors: clubData.clubColors,
      venue: clubData.venue,
    };

    const updateFields = Object.entries(clubEditFields)
      .filter(([, value]) => value !== "" && value !== null)
      .map(([key]) => `${key} = @${key}`);

    const statement = this.db.prepare(`
        UPDATE clubs SET 
        ${updateFields.join(", ")}
        WHERE id = ?
    `);

    statement.run(clubId, clubEditFields);
  }
}
