require('dotenv').configDotenv();
const express = require("express");
const client = require("./DB/connection");
const app = express();
app.use(express.json());
let cors = require("cors");
app.use(cors());
client();
const routes = require("./modules/request.router");
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Hello Instagram CPA!"));
app.use("/api/v1", routes);
app.listen(port, "0.0.0.0", () => 
   console.log("Server is running on port " + port)
);