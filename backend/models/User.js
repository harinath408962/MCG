const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  totalPoints: { type: Number, default: 0 },
  cheatCount: { type: Number, default: 0 },
  greatCount: { type: Number, default: 0 },
  dailyLastPlayed: { type: String, default: "" }, // yyyy-mm-dd
});

module.exports = mongoose.model("User", UserSchema);
