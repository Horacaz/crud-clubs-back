import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import configureDI from "./config/di";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

const container = configureDI();
const clubController = container.get("ClubController");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

clubController.setupRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
