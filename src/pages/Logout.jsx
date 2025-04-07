import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google"; // Import Google logout function
import "./logout.css";

const Logout = () => {
  const [message, setMessage] = useState("Logging out...");
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Logout from Google account
    googleLogout(); // This will log the user out of Google authentication
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.disableAutoSelect(); // Ensures Google account selection on next login
    }

    // Update message
    setTimeout(() => {
      setMessage("You have been successfully logged out.");
    }, 500);

    // Redirect to login page after 2 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>{message}</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
