require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/game", require("./routes/game"));
app.use("/leaderboard", require("./routes/leaderboard"));

app.get("/", (req, res) => res.send("MathCalc Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));
