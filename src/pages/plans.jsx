import React, { useContext } from "react";
import "./plans.css";
import { MoodContext } from "../context/MoodContext";

const Plans = () => {
  const { mood } = useContext(MoodContext); // Get mood from context

  const plans = {
    happy: ["Plan a fun activity.", "Spend time with loved ones.", "Write about what makes you happy."],
    sad: ["Schedule time for self-care.", "Talk to a close friend.", "Try a relaxing activity."],
    angry: ["Practice mindfulness.", "Go for a workout.", "Write down your feelings."],
    anxious: ["Try a structured routine.", "Do a short meditation.", "Break tasks into small steps."],
    neutral: ["Organize your day.", "Try a new hobby.", "Plan a relaxing evening."],
  };

  return (
    <div className="plans-container">
      <h2 className="plans-title">Today's Plan</h2>
      <div className="plans-inputs">
        {mood && plans[mood] ? (
          plans[mood].map((plan, index) => (
            <input key={index} type="text" defaultValue={plan} className="plan-input" />
          ))
        ) : (
          <p>Please track your mood first!</p>
        )}
      </div>
    </div>
  );
};

export default Plans;
