import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MoodContext } from "../context/MoodContext";
import "animate.css";
import "./MoodTracker.css";

const MoodTracker = () => {
  const { setMood } = useContext(MoodContext);
  const [selectedMood, setSelectedMood] = useState("");
  const [intensity, setIntensity] = useState(1);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const activities = React.useMemo(() => ({
    happy: ["Celebrate your joy with a dance!", "Write down three things you're grateful for."],
    sad: ["Try journaling your thoughts.", "Listen to uplifting music."],
    angry: ["Practice deep breathing exercises.", "Take a short walk to cool down."],
    anxious: ["Try a 5-minute guided meditation.", "Do a grounding exercise like focusing on your senses."],
    neutral: ["Enjoy a favorite hobby for relaxation.", "Explore a new podcast or book."],
  }), []);

  const handleMoodChange = (event) => setSelectedMood(event.target.value);
  const handleIntensityChange = (event) => setIntensity(event.target.value);

  const saveMood = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/moods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: selectedMood, intensity }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  }, [selectedMood, intensity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedMood && activities[selectedMood]) {
      setLoading(true);
      const randomSuggestion = activities[selectedMood][Math.floor(Math.random() * activities[selectedMood].length)];
      setRecommendation(randomSuggestion);
      setMood(selectedMood);

      saveMood();

      setTimeout(() => {
        setLoading(false);
        navigate("/plans");
      }, 2000);
    } else {
      setRecommendation("Please select a valid mood.");
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => navigate("/");
  }, [navigate]);

  return (
    <div className="mood-tracker-wrapper">
      {/* Left Side - Text */}
      <div className="mood-tracker-text">
        <h1>Let's track your mood!!</h1>
        <p>Understanding how you feel is the first step toward a better day.</p>
      </div>

      {/* Right Side - Mood Tracker */}
      <div className="mood-tracker-container animate_animated animate_fadeIn">
        <h1 className="mood-tracker-title">Mood Tracker</h1>
        <form onSubmit={handleSubmit} className="mood-tracker-form">
          <div className="form-group">
            <label htmlFor="mood">How do you feel?</label>
            <select id="mood" value={selectedMood} onChange={handleMoodChange} required>
              <option value="" disabled>Select your mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="anxious">Anxious</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="intensity">Rate its intensity (1-10):</label>
            <input type="number" id="intensity" min="1" max="10" value={intensity} onChange={handleIntensityChange} required />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Saving..." : "Get Recommendation"}
          </button>
        </form>

        {recommendation && (
          <div className="recommendation-container">
            <h2>Recommended Activity:</h2>
            <p>{recommendation}</p>
            <p>Redirecting to Plans...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
