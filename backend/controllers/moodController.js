import Mood from "../models/mood.js";

// ✅ Save a new mood entry
export const saveMood = async (req, res) => {
  try {
    const { mood, intensity } = req.body;

    // Validation
    if (!mood || intensity === undefined || intensity < 1 || intensity > 10) {
      return res.status(400).json({ error: "Invalid input. Mood and intensity (1-10) are required." });
    }

    // Save to database
    const newMood = new Mood({ mood, intensity });
    await newMood.save();

    res.status(201).json({ message: "Mood entry saved successfully!", mood: newMood });
  } catch (error) {
    console.error("Error saving mood entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get all mood entries (sorted by latest)
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    console.error("Error fetching moods:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
