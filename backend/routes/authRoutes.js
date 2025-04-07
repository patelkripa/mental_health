import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ensure the file extension is .js

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "❌ User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "✅ Registration successful!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "❌ Server error during registration." });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "❌ Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "❌ Invalid email or password." });

    const token = generateToken(user._id);

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
    res.json({ token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "❌ Server error during login." });
  }
});

// Google Authentication
router.post("/google-auth", async (req, res) => {
  const { name, email, googleId, profilePicture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, googleId, profilePicture });
      await user.save();
    } else if (!user.googleId) {
      // If user exists but doesn't have googleId, update it
      user.googleId = googleId;
      await user.save();
    }

    const token = generateToken(user._id);

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
    res.json({ token, user });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "❌ Server error during Google authentication." });
  }
});

// Logout User (Clears session cookie)
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "✅ Logout successful!" });
});

export default router; // ✅ Use ES module export
