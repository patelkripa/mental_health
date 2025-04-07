const express = require("express");
const Journal = require("../models/Journal");

const router = express.Router();

// Create journal entry
router.post("/", async (req, res) => {
  try {
    if (!req.body.content) {
      return res.status(400).json({ error: "Content field is required" });
    }
    const newEntry = new Journal({ content: req.body.content });
    const savedEntry = await newEntry.save();
    res.status(201).json({ message: "✅ Journal entry saved!", data: savedEntry });
  } catch (error) {
    console.error("❌ Error saving journal entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get latest journal entry
router.get("/", async (req, res) => {
  try {
    const entry = await Journal.findOne().sort({ date: -1 });
    if (!entry) {
      return res.status(404).json({ message: "No journal entries found." });
    }
    res.status(200).json(entry);
  } catch (error) {
    console.error("❌ Error fetching journal entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
