import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js"; // Import AuthContext
import "./Navbar.css";
import logo from "../pages/logo.png"; // Adjusted path

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for redirection
  const { isLoggedIn, logout } = useContext(AuthContext); // Use authentication state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getLinkClass = (path) => (location.pathname === path ? "active" : "");

  const toggleDropdown = (state) => {
    setIsDropdownOpen(state);
  };

  const handleNavigation = (event, path) => {
    if (!isLoggedIn) {
      event.preventDefault();
      navigate("/login");
    }
  };

  const handleLogout = () => {
    // Clear authentication data
    logout();
    localStorage.removeItem("token");
    sessionStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  const servicesMenu = [
    { label: "GMR Tool", path: "/gmr" },
    { label: "Quiz", path: "/quiz" },
    { label: "Library", path: "/library" },
    { label: "Growth", path: "/growth" },
    { label: "Plans", path: "/plans" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo (Now Logs Out the User) */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo" onClick={handleLogout}>
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>

          {/* Navigation Links */}
          <nav className="navbar-links">
            <ul>
              <li><Link to="/moodtracker" className={getLinkClass("/moodtracker")} onClick={(e) => handleNavigation(e, "/moodtracker")}>MoodTracker</Link></li>
              <li><Link to="/connect" className={getLinkClass("/connect")} onClick={(e) => handleNavigation(e, "/connect")}>Connect</Link></li>
              <li><Link to="/emergency" className={getLinkClass("/emergency")} onClick={(e) => handleNavigation(e, "/emergency")}>Emergency</Link></li>
              <li><Link to="/ai" className={getLinkClass("/ai")} onClick={(e) => handleNavigation(e, "/ai")}>AI</Link></li>

              {/* Services Dropdown */}
              <li className="dropdown" onMouseEnter={() => toggleDropdown(true)} onMouseLeave={() => toggleDropdown(false)}>
                <Link to="#" className={getLinkClass("/services")}>Services ▼</Link>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    {servicesMenu.map((item, index) => (
                      <li key={index}>
                        <Link to={item.path} className={getLinkClass(item.path)} onClick={(e) => handleNavigation(e, item.path)}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {/* Authentication Buttons */}
        <div className="navbar-right">
          {!isLoggedIn ? (
            <Link to="/login" className="navbar-button">Login/Register</Link>
          ) : (
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
