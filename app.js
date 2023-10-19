require("dotenv");
const express = require("express");
const client = require("./DB/connection");
const app = express();
app.use(express.json());
let cors = require("cors");
app.use(cors());
client();
app.get("/", (req, res) => res.send("Hello Instagram CPA!"));
const port = 7000;
app.listen(port, "0.0.0.0", () => 
   console.log("Server is running on port " + port)
);