const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const Journal = mongoose.model("growthJournal", JournalSchema);
module.exports = Journal;
