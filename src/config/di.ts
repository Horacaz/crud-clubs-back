import DIContainer, { object, use, factory } from "rsdi";
import path from "path";
import multer from "multer";
import Database from "better-sqlite3";
import {
  ClubController,
  ClubService,
  ClubRepository,
} from "../module/club/module";

function configureMulter() {
  const multerImagesStorage =
    process.env.MULTER_IMAGES_STORAGE || "./public/images";
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, multerImagesStorage);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  return upload;
}

function setupDatabase() {
  const db = new Database(process.env.DB_PATH as string, {
    verbose: console.log,
  });
  return db;
}

export default function configureDI() {
  const container: DIContainer = new DIContainer();
  container.add({
    multer: factory(configureMulter),
    Database: factory(setupDatabase),
    ClubRepository: object(ClubRepository).construct(use("Database")),
    ClubService: object(ClubService).construct(use("ClubRepository")),
    ClubController: object(ClubController).construct(
      use("multer"),
      use("ClubService"),
    ),
  });
  return container;
}
