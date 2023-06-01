import express, {Express} from "express"
import dotenv from "dotenv";
import router from "./routes/clubTeams";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/clubTeams", router);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})