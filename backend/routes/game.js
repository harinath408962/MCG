const express = require("express");
const router = express.Router();
const GameRecord = require("../models/GameRecord");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// Save game result
router.post("/save", auth, async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.id;

    // Save match record
    const record = new GameRecord(data);
    await record.save();

    // Update user stats
    const user = await User.findById(req.user.id);
    user.totalPoints += data.points;

    if (data.points / data.time >= 45) user.greatCount++;
    if (data.usedCalculator) user.cheatCount++;

    // Daily last played check
    if (data.mode === "daily") {
      const today = new Date().toISOString().slice(0, 10);
      user.dailyLastPlayed = today;
    }

    await user.save();

    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get user history for dashboard
router.get("/history", auth, async (req, res) => {
  const history = await GameRecord.find({ userId: req.user.id });
  res.json(history);
});

module.exports = router;
