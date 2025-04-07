import express from "express";
import { v4 as uuidv4 } from "uuid";
import ConnectEntry from "../models/ConnectEntry.js";

const router = express.Router();

// Therapist List with Specializations
const therapists = [
  { name: "Dr. Smith", email: "drsmith@example.com", concerns: ["Anxiety", "Depression"] },
  { name: "Dr. Johnson", email: "drjohnson@example.com", concerns: ["Stress Management", "Relationship Issues"] },
  { name: "Dr. Patel", email: "drpatel@example.com", concerns: ["Depression", "Self-Esteem Issues"] },
];

// API to get available concerns
router.get("/concerns", (req, res) => {
  const uniqueConcerns = [...new Set(therapists.flatMap((t) => t.concerns))];
  res.json(uniqueConcerns);
});

// Generate meeting link
const generateMeetingLink = (platform) => {
  if (platform === "Zoom") {
    return `https://zoom.us/j/${uuidv4().replace(/-/g, "").slice(0, 10)}`;
  } else if (platform === "Google Meet") {
    return `https://meet.google.com/${uuidv4().slice(0, 3)}-${uuidv4().slice(3, 6)}-${uuidv4().slice(6, 9)}`;
  }
  return null;
};

// Assign therapist
const getLeastRecentlyUsedTherapist = async (concern) => {
  const availableTherapists = therapists.filter((t) => t.concerns.includes(concern));
  if (availableTherapists.length === 0) return null;

  const lastAssignedTherapists = await ConnectEntry.find({ concern }).sort({ date: -1 }).limit(availableTherapists.length);
  const assignedTherapistNames = lastAssignedTherapists.map((entry) => entry.therapist);
  const unassignedTherapists = availableTherapists.filter((t) => !assignedTherapistNames.includes(t.name));

  return unassignedTherapists.length > 0 ? unassignedTherapists[0] : availableTherapists[0];
};

// Create connection request
router.post("/", async (req, res) => {
  try {
    const { name, concern, platform } = req.body;
    if (!name || !concern || !platform) {
      return res.status(400).json({ error: "Name, Concern, and Platform are required" });
    }

    const assignedTherapist = await getLeastRecentlyUsedTherapist(concern);
    if (!assignedTherapist) {
      return res.status(500).json({ error: "No therapist available for the selected concern." });
    }

    const meetingLink = generateMeetingLink(platform);
    if (!meetingLink) {
      return res.status(500).json({ error: "Failed to generate a meeting link" });
    }

    const newEntry = new ConnectEntry({
      name,
      concern,
      platform,
      therapist: assignedTherapist.name,
      meetingLink,
    });

    const savedEntry = await newEntry.save();

    res.status(201).json({
      message: "✅ Therapist assigned and meeting link generated!",
      therapist: assignedTherapist.name,
      meetingLink,
      data: savedEntry,
    });
  } catch (error) {
    console.error("❌ Error connecting to therapist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get latest connection request
router.get("/", async (req, res) => {
  try {
    const entry = await ConnectEntry.findOne().sort({ date: -1 });
    if (!entry) {
      return res.status(404).json({ message: "No concerns found." });
    }
    res.status(200).json(entry);
  } catch (error) {
    console.error("❌ Error fetching concern:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
