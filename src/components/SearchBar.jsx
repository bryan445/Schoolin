import React, { memo } from "react";

function SearchBar({ value, onChange, isDarkMode }) {
  const styles = {
    container: {
      position: "relative",
      maxWidth: "500px",
      width: "100%"
    },
    input: {
      width: "100%",
      padding: "15px 50px 15px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "25px",
      boxShadow: isDarkMode
        ? "0 4px 15px rgba(0,0,0,0.3)"
        : "0 4px 15px rgba(0,0,0,0.1)",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: isDarkMode ? "#4a5568" : "white",
      color: isDarkMode ? "#e2e8f0" : "#333"
    },
    searchIcon: {
      position: "absolute",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "18px",
      color: isDarkMode ? "#a0aec0" : "#666",
      pointerEvents: "none"
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search schools by name or location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.input}
        onFocus={(e) => {
          e.target.style.boxShadow = isDarkMode
            ? "0 6px 20px rgba(0,0,0,0.4)"
            : "0 6px 20px rgba(0,0,0,0.15)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = isDarkMode
            ? "0 4px 15px rgba(0,0,0,0.3)"
            : "0 4px 15px rgba(0,0,0,0.1)";
          e.target.style.transform = "translateY(0)";
        }}
        aria-label="Search schools by name or location"
      />
      <div style={styles.searchIcon}>🔍</div>
    </div>
  );
}

export default memo(SearchBar);
