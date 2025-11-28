const mongoose = require("mongoose");

const GameRecordSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  mode: String,
  time: Number,
  correct: Number,
  wrong: Number,
  skip: Number,
  accuracy: Number,
  points: Number,
  timestamp: Number,
  wrongAnswers: Array,
});

module.exports = mongoose.model("GameRecord", GameRecordSchema);
