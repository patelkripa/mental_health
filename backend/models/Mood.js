import mongoose from "mongoose";

// ✅ Mood Schema
const moodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  intensity: { type: Number, required: true, min: 1, max: 10 },
  date: { type: Date, default: Date.now },
});

// ✅ Create Mood Model
const Mood = mongoose.models.Mood || mongoose.model("Mood", moodSchema);

export default Mood;
