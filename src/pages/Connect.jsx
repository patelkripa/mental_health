import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaBrain, FaVideo } from "react-icons/fa";
import axios from "axios";
import { MoodContext } from "../context/MoodContext";
import "./Connect.css";

const Connect = () => {
  const { setMood } = useContext(MoodContext);
  const [name, setName] = useState("");
  const [concern, setConcern] = useState("");
  const [concerns, setConcerns] = useState([]);
  const [platform, setPlatform] = useState("Zoom");
  const [message, setMessage] = useState("");
  const [therapist, setTherapist] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const quotes = [
    "Your feelings are valid. Healing takes time.",
    "You are not alone. Reach out and connect.",
    "Mental health is just as important as physical health.",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/connect/concerns");
        setConcerns(response.data);
      } catch (error) {
        console.error("Error fetching concerns:", error);
        setError("Failed to load concerns. Please refresh the page.");
      }
    };
    fetchConcerns();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/connect", {
        name,
        concern,
        platform,
      });
      setMessage(response.data.message);
      setTherapist(response.data.therapist);
      setMeetingLink(response.data.meetingLink);
      setMood(concern);
      sessionStorage.setItem("lastConnectedConcern", concern);

      // ❌ No redirect now, so the page stays here
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setError("Error finding a therapist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connect-page">
      <div className="connect-left">
        <h1>Prioritize Your Mental Health</h1>
        <p className="quote">{quotes[quoteIndex]}</p>
      </div>
      <div className="connect-form">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Enter your name"
            className="connect-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaBrain className="input-icon" />
          <select
            className="connect-input"
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            required
          >
            <option value="">Select Concern</option>
            {concerns.length > 0 ? (
              concerns.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))
            ) : (
              <option disabled>Loading concerns...</option>
            )}
          </select>
        </div>
        <div className="input-group">
          <FaVideo className="input-icon" />
          <select
            className="connect-input"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="Zoom">Zoom</option>
            <option value="Google Meet">Google Meet</option>
          </select>
        </div>
        <button
          className="connect-button"
          onClick={handleSubmit}
          disabled={!concern || !name || loading}
        >
          {loading ? "Finding Therapist..." : "Find a Therapist"}
        </button>

        {/* ✅ Message/Link section */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        {therapist && <p>Assigned Therapist: {therapist}</p>}
        {meetingLink && (
  <p>
    Your meeting link:{"https://meet.google.com/ugx-pfyx-omx "}
    <a href={meetingLink} target="_blank" rel="noopener noreferrer">
      Join Here
    </a>
  </p>
)}

      </div>
    </div>
  );
};

export default Connect;
