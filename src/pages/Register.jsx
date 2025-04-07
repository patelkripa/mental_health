import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  // State hooks for form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Load stored user credentials on page load (only if available)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setName(savedUser.name || "");
      setEmail(savedUser.email || "");
    }
  }, []);

  // Handle Normal Registration (Email + Password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );

      // Store registered credentials for auto-fill on login
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({ email, password })
      );

      localStorage.setItem("token", response.data.token);
      setMessage("✅ Registration successful! Redirecting to login...");

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("⚠️ Registration error:", error);
      setError(error.response?.data?.message || "❌ Something went wrong.");
    }
  };

  // Handle Google Sign-In Success
  const handleGoogleSuccess = async (response) => {
    try {
      if (response.credential) {
        const decoded = jwtDecode(response.credential);
        console.log("✅ Google User Data:", decoded);

        // Send Google user data to backend
        const googleResponse = await axios.post(
          "http://localhost:5000/api/auth/google-auth",
          {
            name: decoded.name,
            email: decoded.email,
            googleId: decoded.sub,
            profilePicture: decoded.picture,
          },
          { withCredentials: true }
        );

        localStorage.setItem("token", googleResponse.data.token);
        setMessage("✅ Google Sign-Up successful!");

        setTimeout(() => navigate("/Login"), 1500);
      } else {
        setError("❌ Google authentication failed.");
      }
    } catch (error) {
      console.error("⚠️ Google authentication error:", error);
      setError("❌ Google authentication failed. Please try again.");
    }
  };

  // Handle Google Sign-In Failure
  const handleGoogleFailure = () => {
    console.error("Google Sign-Up failed.");
    setError("❌ Google Sign-In failed. Please try again.");
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>

      <div className="google-login">
        <p>Or sign up with Google:</p>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} auto_select={false} />
      </div>
    </div>
  );
};

export default Register; 