import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import usePreventBackNavigation from "../hooks/usePreventBackNavigation";
import "./Emergency.css";

const Emergency = () => {
  usePreventBackNavigation("/"); // Prevents back navigation
  
  const defaultTherapists = useMemo(() => [
    { name: "Dr. Charmi Patel", phone: "+91 6352743219" },
    { name: "Dr. Pooja Mojidra", phone: "+91 8401429560" },
    { name: "Dr. Kripa Patel", phone: "+91 8980833400" }
  ], []);

  const [therapists, setTherapists] = useState(defaultTherapists);

  useEffect(() => {
    fetch("http://localhost:5000/api/therapists")
      .then((response) => response.json())
      .then((data) => {
        setTherapists((prevTherapists) => [...prevTherapists, ...data]);
      })
      .catch((error) => console.error("Error fetching therapists:", error));
  }, [defaultTherapists]);

  return (
    <div className="emergency-container">
      <div className="emergency-header">
        <h1 className="emergency-title">Emergency Help</h1>
        <p className="emergency-description">
          What do you need help with? Please contact a therapist by clicking the button below.
        </p>
      </div>
      <div className="therapist-layout">
        <div className="therapist-top">
          {therapists.slice(0, 2).map((therapist, index) => (
            <div key={index} className="therapist-card">
              <h2 className="therapist-name">{therapist.name}</h2>
              <a href={`tel:${therapist.phone}`} className="call-button">
                Call Now
              </a>
            </div>
          ))}
        </div>
        {therapists.length > 2 && (
          <div className="therapist-bottom">
            <div className="therapist-card vertical-card">
              <h2 className="therapist-name">{therapists[2].name}</h2>
              <a href={`tel:${therapists[2].phone}`} className="call-button">
                Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div> 
  );
};

export default Emergency;
