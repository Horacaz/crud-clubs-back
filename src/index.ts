import express, { Express } from "express";
import dotenv from "dotenv";
import configureDI from "./config/di";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

const container = configureDI();
const clubController = container.get("ClubController");

app.use(express.json());
app.use(cors());
clubController.setupRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
