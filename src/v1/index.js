const express = require("express");
const dotenv = require("dotenv");
const v1ClubTeamsRouter = require("./routes/clubTeams");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/clubTeams", v1ClubTeamsRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})