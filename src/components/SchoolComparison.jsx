import React, { useState, useEffect, memo } from "react";

function SchoolComparison({ schools, onClose, onRemoveSchool, isDarkMode }) {
  const [schoolData, setSchoolData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check if we're online
        if (!navigator.onLine) {
          throw new Error("You are currently offline. Please check your internet connection.");
        }
        
        const data = {};
        for (const school of schools) {
          const cacheBuster = new Date().getTime();
          const response = await fetch(`/schools/${school.id}.json?t=${cacheBuster}`);
          if (!response.ok) {
            throw new Error(`Failed to load data for ${school.name}`);
          }
          data[school.id] = await response.json();
        }
        setSchoolData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (schools.length > 0) {
      fetchSchoolData();
    }
  }, [schools]);

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkMode ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "20px"
    },
    modal: {
      backgroundColor: isDarkMode ? "#2d3748" : "white",
      borderRadius: "15px",
      padding: "30px",
      width: "90%",
      maxWidth: "1200px",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: isDarkMode
        ? "0 20px 60px rgba(0,0,0,0.5)"
        : "0 20px 60px rgba(0,0,0,0.3)"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
      borderBottom: isDarkMode ? "2px solid #4a5568" : "2px solid #f0f0f0",
      paddingBottom: "15px"
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: isDarkMode ? "#e2e8f0" : "#333"
    },
    closeButton: {
      padding: "8px 15px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px"
    },
    loading: {
      textAlign: "center",
      padding: "40px",
      fontSize: "1.5rem",
      color: isDarkMode ? "#a3b1e0" : "#667eea"
    },
    error: {
      textAlign: "center",
      padding: "40px",
      fontSize: "1.2rem",
      color: "#dc3545",
      backgroundColor: isDarkMode ? "#2d1e22" : "#fff5f5",
      borderRadius: "8px",
      border: "1px solid #dc3545"
    },
    tableContainer: {
      overflowX: "auto"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "30px"
    },
    tableHeader: {
      backgroundColor: "#667eea",
      color: "white",
      padding: "15px",
      textAlign: "left",
      fontWeight: "bold"
    },
    tableCell: {
      padding: "12px 15px",
      borderBottom: isDarkMode ? "1px solid #4a5568" : "1px solid #eee",
      textAlign: "left"
    },
    schoolHeaderCell: {
      padding: "15px",
      textAlign: "center",
      fontWeight: "bold",
      backgroundColor: isDarkMode ? "#4a5568" : "#f8f9fa"
    },
    removeButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "12px"
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: isDarkMode ? "#e2e8f0" : "#333",
      margin: "25px 0 15px 0",
      paddingBottom: "10px",
      borderBottom: isDarkMode ? "1px solid #4a5568" : "1px solid #eee"
    }
  };

  if (loading) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <div style={styles.loading}>Loading school comparison data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <div style={styles.header}>
            <h2 style={styles.title}>School Comparison</h2>
            <button style={styles.closeButton} onClick={onClose} aria-label="Close error message">×</button>
          </div>
          <div style={styles.error}>Error: {error}</div>
        </div>
      </div>
    );
  }

  // Prepare data for comparison
  const comparisonData = [
    { field: "Location", values: schools.map(school => schoolData[school.id]?.location || "N/A") },
    { field: "Motto", values: schools.map(school => schoolData[school.id]?.motto || "N/A") },
    { field: "Fees (per term)", values: schools.map(school => schoolData[school.id]?.fees || "N/A") },
    { field: "About", values: schools.map(school => schoolData[school.id]?.about?.substring(0, 100) + "..." || "N/A") }
  ];

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>School Comparison</h2>
          <button style={styles.closeButton} onClick={onClose} aria-label="Close school comparison">×</button>
        </div>
        
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Feature</th>
                {schools.map((school, index) => (
                  <th key={index} style={styles.schoolHeaderCell}>
                    <div>{school.name}</div>
                    <button
                      style={styles.removeButton}
                      onClick={() => onRemoveSchool(school.id)}
                      aria-label={`Remove ${school.name} from comparison`}
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index}>
                  <td style={{ ...styles.tableCell, fontWeight: "bold" }}>{item.field}</td>
                  {item.values.map((value, valueIndex) => (
                    <td key={valueIndex} style={styles.tableCell}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <h3 style={styles.sectionTitle}>Fee Structure Comparison</h3>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Fee Category</th>
                {schools.map((school, index) => (
                  <th key={index} style={styles.schoolHeaderCell}>{school.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...styles.tableCell, fontWeight: "bold" }}>Nursery</td>
                {schools.map((school, index) => (
                  <td key={index} style={styles.tableCell}>
                    {schoolData[school.id]?.detailedFees?.nursery?.total || "N/A"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ ...styles.tableCell, fontWeight: "bold" }}>Primary</td>
                {schools.map((school, index) => (
                  <td key={index} style={styles.tableCell}>
                    {schoolData[school.id]?.detailedFees?.primary?.total || "N/A"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ ...styles.tableCell, fontWeight: "bold" }}>Secondary</td>
                {schools.map((school, index) => (
                  <td key={index} style={styles.tableCell}>
                    {schoolData[school.id]?.detailedFees?.secondary?.total || "N/A"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default memo(SchoolComparison);