import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// ✅ Define Emergency Therapist Schema (Separate Collection in Bliss DB)
const emergencyTherapistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
});

const EmergencyTherapist =
  mongoose.models.EmergencyTherapist ||
  mongoose.model("EmergencyTherapist", emergencyTherapistSchema, "emergencyTherapists"); // Explicit collection name

// ✅ Get all emergency therapists
router.get("/", async (req, res) => {
  try {
    const therapists = await EmergencyTherapist.find();
    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Add a new emergency therapist
router.post("/", async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "⚠️ Name and phone are required" });
  }

  try {
    const newTherapist = new EmergencyTherapist({ name, phone });
    const savedTherapist = await newTherapist.save();
    res.status(201).json(savedTherapist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
