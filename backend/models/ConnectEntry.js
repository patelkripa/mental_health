import mongoose from "mongoose";

const connectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  concern: { type: String, required: true },
  platform: { type: String, enum: ["Zoom", "Google Meet"], required: true },
  therapist: { type: String, required: true },
  meetingLink: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Prevent model overwrite error in hot reload environments
const ConnectEntry = mongoose.models.ConnectEntry || mongoose.model("ConnectEntry", connectSchema);

export default ConnectEntry;
