import express from "express";
import { saveMood, getMoods } from "../controllers/moodController.js";

const router = express.Router();

// ✅ POST: Save mood entry
router.post("/", saveMood);

// ✅ GET: Retrieve all mood entries
router.get("/", getMoods);

export default router; // ✅ Default export