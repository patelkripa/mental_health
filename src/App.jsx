import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Importing Contexts
import { MoodProvider } from "./context/MoodContext";
import { AuthProvider } from "./context/AuthContext.js";

// Importing components and pages
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import MoodTracker from "./pages/MoodTracker";
import Connect from "./pages/Connect";
import Emergency from "./pages/Emergency";
import Ai from "./components/Ai";
import GMR from "./pages/gmr";
import Quiz from "./pages/quiz";
import Plans from "./pages/plans";
import Library from "./pages/library";
import Growth from "./pages/growth";

// Import ProtectedRoute to secure pages
import ProtectedRoute from "./routes/ProtectedRoute";

const PreventBackNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      if (location.pathname !== "/") {
        navigate("/", { replace: true }); // Redirect to Home Page
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [location, navigate]);

  return null;
};

function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <GoogleOAuthProvider clientId="150322607096-o5o140qa59bjg26akabdta0cf6l15nae.apps.googleusercontent.com">
      <AuthProvider>
        <MoodProvider>
          <Router>
            <PreventBackNavigation />
            <Navbar />
            <div className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes - Accessible after login */}
                <Route path="/moodtracker" element={<ProtectedRoute><MoodTracker apiData={apiData} /></ProtectedRoute>} />
                <Route path="/connect" element={<ProtectedRoute><Connect /></ProtectedRoute>} />
                <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
                <Route path="/ai" element={<ProtectedRoute><Ai /></ProtectedRoute>} />
                <Route path="/gmr" element={<ProtectedRoute><GMR /></ProtectedRoute>} />
                <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
                <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
                <Route path="/growth" element={<ProtectedRoute><Growth /></ProtectedRoute>} />
                <Route path="/plans" element={<ProtectedRoute><Plans apiData={apiData} /></ProtectedRoute>} />

                {/* Logout Route */}
                <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </MoodProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
