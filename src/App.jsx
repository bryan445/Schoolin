import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SchoolPage from "./SchoolPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a preference in localStorage
    const savedPreference = localStorage.getItem("darkMode");
    if (savedPreference !== null) {
      setIsDarkMode(JSON.parse(savedPreference));
      return;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    
    // Apply class to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: isDarkMode ? "#1a202c" : "transparent",
      color: isDarkMode ? "#e2e8f0" : "inherit"
    }}>
      <div style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000
      }}>
        <button
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            padding: "10px 15px",
            backgroundColor: isDarkMode ? "#e2e8f0" : "#1a202c",
            color: isDarkMode ? "#1a202c" : "#e2e8f0",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
        <Route path="/school/:schoolId" element={<SchoolPage isDarkMode={isDarkMode} />} />
      </Routes>
    </div>
  );
}

export default App;
