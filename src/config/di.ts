import DIContainer, { object, use } from "rsdi";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs"
import multer from "multer";
import {ClubController, ClubService, ClubRepository} from "../module/club/module"

export default function configureDI(){
    const container: DIContainer = new DIContainer();
    container.add({
        "uuidv4": uuidv4,
        "fs": fs,
        "multer": multer,
        "JSON_CLUB_PATH": process.env.JSON_CLUB_PATH,
        "ClubRepository": object(ClubRepository).construct(use("uuidv4"), use("fs"), use("JSON_CLUB_PATH")),
        "ClubService": object(ClubService).construct(use("ClubRepository")),
        "ClubController": object(ClubController).construct(use("multer"),use("ClubService")),
    })
    return container
}
