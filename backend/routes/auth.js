const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.json({ error: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hash,
    });

    await user.save();

    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    const passOK = await bcrypt.compare(password, user.password);
    if (!passOK) return res.json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Login success",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
