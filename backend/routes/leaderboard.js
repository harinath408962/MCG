const express = require("express");
const router = express.Router();
const GameRecord = require("../models/GameRecord");
const User = require("../models/User");

// Best scores per mode
router.get("/best", async (req, res) => {
  const modes = ["easy", "medium", "hard", "pro", "legend"];

  const output = {};

  for (const m of modes) {
    const best = await GameRecord.find({ mode: m })
      .sort({ correct: -1 })
      .limit(1);

    output[m] = best[0] || null;
  }

  res.json(output);
});

// Total points ranking
router.get("/total", async (req, res) => {
  const ranking = await User.find()
    .sort({ totalPoints: -1 })
    .select("username totalPoints");

  res.json(ranking);
});

module.exports = router;
