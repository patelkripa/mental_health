const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ---------------------- HELPER FUNCTIONS ----------------------

// Generate JWT Token (Valid for 30 Days)
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Set token in HTTP-Only Cookie (30 Days)
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ---------------------- REGISTER USER ----------------------
exports.register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    email = email.trim().toLowerCase();
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate token and set cookie
    const token = generateToken(user._id);
    setTokenCookie(res, token);

    res.status(201).json({ success: true, message: "User registered successfully", token, user });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ---------------------- LOGIN USER ----------------------
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    email = email.trim().toLowerCase();
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // If user registered via Google, prevent normal login
    if (user.googleId) {
      return res.status(401).json({ success: false, message: "Use Google Sign-In" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate token and set cookie
    const token = generateToken(user._id);
    setTokenCookie(res, token);

    res.json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ---------------------- GOOGLE AUTH CALLBACK ----------------------
exports.googleAuth = async (req, res) => {
  try {
    let { googleId, name, email, profilePhoto } = req.body;

    // Validate input
    if (!googleId || !name || !email) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    email = email.trim().toLowerCase();

    // Check if user already exists with Google ID
    let user = await User.findOne({ googleId });

    // If user does not exist, create a new one
    if (!user) {
      user = await User.create({ name, email, googleId, profilePhoto });
    }

    // Generate token and set cookie
    const token = generateToken(user._id);
    setTokenCookie(res, token);

    res.json({ success: true, message: "Google authentication successful", token, user });
  } catch (error) {
    console.error("❌ Google Auth Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ---------------------- LOGOUT USER ----------------------
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  res.json({ success: true, message: "Logged out successfully" });
};

// ---------------------- CHECK AUTH STATUS ----------------------
exports.checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("❌ Auth Check Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
