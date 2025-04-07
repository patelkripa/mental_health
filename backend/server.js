import "dotenv/config"; // Load environment variables
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import axios from "axios"; // For AI chatbot API
import "./config/passportconfig.js"; // Load Passport Strategy

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import connectRoutes from "./routes/connectRoutes.js";
import therapistRoutes from "./routes/therapists.js";
import moodRoutes from "./routes/moodRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"; // AI Chatbot Routes

// Import Models
import Therapist from "./models/Therapist.js";
import Chat from "./models/chatModel.js";

// Initialize Express App
const app = express();

/* ------------------------- Middleware ------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* ------------------------- MongoDB Connection ------------------------- */
mongoose.set("strictQuery", false);

console.log("🔄 Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
  .then(() => console.log("✅ MongoDB (Bliss Database) connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ------------------------- Routes ------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/connect", connectRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/chatbot", chatRoutes); // AI Chatbot API route

/* ------------------------- Therapist API ------------------------- */
// Fetch All Therapists
app.get("/api/therapists", async (req, res) => {
  try {
    console.log("📢 GET /api/therapists request received");
    const therapists = await Therapist.find();
    res.json(therapists);
  } catch (error) {
    console.error("❌ Error fetching therapists:", error.message);
    res.status(500).json({ error: "⚠️ Internal Server Error" });
  }
});

// Add a New Therapist
app.post("/api/therapists", async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "⚠️ Name and phone are required" });
    }
    const newTherapist = new Therapist({ name, phone });
    await newTherapist.save();
    res.status(201).json({ message: "✅ Therapist added successfully!", therapist: newTherapist });
  } catch (error) {
    console.error("❌ Error adding therapist:", error.message);
    res.status(500).json({ error: "⚠️ Internal Server Error" });
  }
});

/* ------------------------- Google Authentication Routes ------------------------- */
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
  (req, res) => res.redirect("http://localhost:3000/")
);

// Logout Route
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("http://localhost:3000/");
    });
  });
});

// Get Current Authenticated User
app.get("/auth/user", (req, res) => {
  req.user ? res.json(req.user) : res.status(401).json({ error: "Not authenticated" });
});

/* ------------------------- Growth Page Backend ------------------------- */
const journalSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Journal = mongoose.models.Journal || mongoose.model("Journal", journalSchema);

app.post("/api/growth", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required" });

    const newEntry = new Journal({ content });
    await newEntry.save();
    res.status(201).json({ message: "✅ Journal entry saved successfully!", entry: newEntry });
  } catch (error) {
    console.error("Error saving journal entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/growth", async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* ------------------------- AI Chatbot API ------------------------- */
app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "⚠️ Message is required" });

  try {
    console.log(`Sending request to Ollama: ${message}`);



    const response = await axios.post("http://localhost:11434/api/generate", {
      model: process.env.CHATBOT_MODEL || "mistral", // Use model from .env
      prompt: message,
      stream: false,
    });

    const botResponse = response.data.response || "🤖 No response received.";

    console.log("✅ Ollama Response:", botResponse);

    // Save chat conversation to MongoDB
    const chatEntry = new Chat({ userMessage: message, botResponse });
    await chatEntry.save();

    res.json({ response: botResponse });
  } catch (error) {
    console.error("❌ Chatbot API Error:", error.message);
    res.status(500).json({ error: "⚠️ Chatbot service unavailable. Please check Ollama and try again." });
  }
});

/* ------------------------- Server Health Check ------------------------- */
app.get("/", (req, res) => res.send("🔥 Backend server is running!"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on http://localhost:${PORT}'));