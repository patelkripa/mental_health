import React, { useState, useEffect, useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "./Login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (registeredUser) {
      setEmail(registeredUser.email || "");
      setPassword(registeredUser.password || "");
      localStorage.removeItem("registeredUser");
    }
  }, []);

  // Handle Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      login(response.data.token, response.data.user);
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError(error.response?.data?.message || "❌ Invalid email or password.");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In Success
  const handleGoogleSuccess = async (response) => {
    setLoading(true);
    setError("");

    try {
      if (response.credential) {
        const decoded = jwtDecode(response.credential);

        const googleResponse = await axios.post(
          "http://localhost:5000/api/auth/google-auth",
          { email: decoded.email, googleId: decoded.sub, name: decoded.name },
          { withCredentials: true }
        );

        login(googleResponse.data.token, googleResponse.data.user);
        setMessage("✅ Google login successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError("❌ Google authentication failed.");
      }
    } catch (error) {
      setError("❌ Google authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Left Panel - Background Image and Text */}
      <div className="leftPanel">
        <h1 className="heading">Welcome to Bliss!</h1>
        <p>We are here to help you and always feel free to contact us in any situation.</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="rightPanel">
        <h1 className="welcome">Sign in</h1>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Google Login */}
        <div className="googleLogin">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("❌ Google Sign-In failed.")} />
        </div>

        {/* Register Link */}
        <p className="register">
          Don't have an account?{" "}
          <button className="registerLink" onClick={() => navigate("/register")}>
            Register now
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
