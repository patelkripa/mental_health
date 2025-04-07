import React, { useState } from "react";
import axios from "axios";
import "./Growth.css";

const Growth = () => {
  const [entry, setEntry] = useState("");

  const handleSave = async () => {
    try {
      if (!entry.trim()) {
        alert("Please enter some text before saving.");
        return;
      }

      await axios.post("http://localhost:5000/api/growth", { content: entry });

      alert("✅ Journal entry saved!");
      setEntry(""); // Clear the textarea
    } catch (error) {
      console.error("❌ Error saving entry:", error);
      alert("Error saving journal entry. Please try again.");
    }
  };

  return (
    <div className="journal-container">
      <h1 className="journal-title">Growth Journal</h1>
      <textarea
        className="journal-textarea"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts here..."
      />
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Growth;
