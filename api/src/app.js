const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const interestController = require("./controllers/interestController.js");

require("dotenv").config();
app.use(cors());

app.get("/api/v1/interests", interestController.getInterests);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
