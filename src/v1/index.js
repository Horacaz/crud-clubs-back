const express = require("express");
const v1ClubTeamsRouter = require("./routes/clubTeams");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/clubTeams", v1ClubTeamsRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})