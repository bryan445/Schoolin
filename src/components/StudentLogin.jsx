import React, { useState, memo } from "react";

function StudentLogin({ onLogin, title = "Student Login", type = "account", schoolId, isDarkMode }) {
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadStudentData = async (name, className) => {
      try {
        // Check if we're online
        if (!navigator.onLine) {
          setError("You are currently offline. Please check your internet connection.");
          return null;
        }
        
        // All schools now use the form grading system
        const filePrefix = 'form';
        
        // Add cache-busting parameter to force fresh data
        const cacheBuster = new Date().getTime();
        const response = await fetch(`/schools/classes/${schoolId}/${filePrefix}-${className}.json?t=${cacheBuster}`);
        
        if (!response.ok) {
          // Try alternative file structure for secondary schools that might still have the old structure
          if (!isPrimarySchool) {
            const altResponse = await fetch(`/schools/students-${schoolId}.json?t=${cacheBuster}`);
            if (altResponse.ok) {
              const data = await altResponse.json();
              
              // Search through all classes for the student
              for (const [classKey, students] of Object.entries(data)) {
                // Handle both array of students and direct student objects
                const studentArray = Array.isArray(students) ? students : [students];
                
                const student = studentArray.find(s => {
                  if (!s || !s.name) return false;
                  
                  const nameMatch = s.name.toLowerCase() === name.toLowerCase();
                  
                  // Check various class formats
                  const classLower = s.class?.toLowerCase() || "";
                  const inputClassLower = className.toLowerCase();
                  
                  const classMatch =
                    classLower === `form ${inputClassLower}` ||
                    classLower === `grade ${inputClassLower}` ||
                    classLower === `form${inputClassLower}` ||
                    classLower === `grade${inputClassLower}` ||
                    classKey.toLowerCase() === `form ${inputClassLower}` ||
                    classKey.toLowerCase() === `grade ${inputClassLower}`;
                    
                  return nameMatch && classMatch;
                });
                
                if (student) {
                  return student;
                }
              }
            }
          }
          
          throw new Error(`Failed to load student data for ${filePrefix} ${className}`);
        }
        
        const students = await response.json();
        
        // Handle both array of students and direct student objects
        const studentArray = Array.isArray(students) ? students : [students];
        
        const student = studentArray.find(s => {
          if (!s || !s.name) return false;
          
          const nameMatch = s.name.toLowerCase() === name.toLowerCase();
          
          // Check class match
          const classLower = s.class?.toLowerCase() || "";
          const inputClassLower = className.toLowerCase();
          
          const classMatch =
            classLower === `form ${inputClassLower}` ||
            classLower === `grade ${inputClassLower}` ||
            classLower === `form${inputClassLower}` ||
            classLower === `grade${inputClassLower}`;
            
          return nameMatch && classMatch;
        });
        
        return student || null;
      } catch (error) {
        console.error('Error loading student data:', error);
        setError(error.message);
        return null;
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName.trim() || !studentClass.trim()) {
      setError("Please enter your name and class");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const student = await loadStudentData(studentName.trim(), studentClass.trim());
      
      if (student) {
        onLogin(student);
      } else {
        setError("Student not found. Please check your name and class.");
      }
    } catch (error) {
      setError(`Error loading student data: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      zIndex: 1000
    },
    modal: {
      backgroundColor: isDarkMode ? "#2d3748" : "white",
      borderRadius: "15px",
      padding: "30px",
      minWidth: "400px",
      boxShadow: isDarkMode
        ? "0 20px 60px rgba(0,0,0,0.5)"
        : "0 20px 60px rgba(0,0,0,0.3)",
      animation: "slideIn 0.3s ease"
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      color: isDarkMode ? "#e2e8f0" : "#333"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    },
    input: {
      padding: "12px 15px",
      fontSize: "16px",
      border: isDarkMode ? "2px solid #4a5568" : "2px solid #e1e1e1",
      borderRadius: "8px",
      outline: "none",
      transition: "border-color 0.3s ease",
      backgroundColor: isDarkMode ? "#4a5568" : "white",
      color: isDarkMode ? "#e2e8f0" : "#333"
    },
    button: {
      padding: "12px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      color: "white",
      background: isDarkMode
        ? "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)"
        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      marginTop: "10px"
    },
    cancelButton: {
      padding: "8px 15px",
      fontSize: "14px",
      color: isDarkMode ? "#a0aec0" : "#666",
      background: "transparent",
      border: isDarkMode ? "1px solid #4a5568" : "1px solid #ddd",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "10px"
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      justifyContent: "space-between"
    },
    error: {
      color: "#dc3545",
      fontSize: "14px",
      marginBottom: "10px",
      textAlign: "center",
      padding: "8px",
      backgroundColor: isDarkMode ? "#2d1e22" : "#fff5f5",
      borderRadius: "4px",
      border: "1px solid #dc3545"
    },
    helpText: {
      fontSize: "12px",
      color: isDarkMode ? "#a0aec0" : "#666",
      textAlign: "center",
      marginBottom: "15px"
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{title}</h2>
        <div style={styles.helpText}>
          Enter your full name and class to access your account
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter your full name (e.g., John Mwamba)"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#e1e1e1"}
            autoFocus
            aria-label="Student full name"
            aria-required="true"
            required
          />
          
          <input
            type="text"
            placeholder="Enter your class number (e.g., 4)"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#e1e1e1"}
            aria-label="Student class number"
            aria-required="true"
            required
          />
          
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}
          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={() => onLogin(null)}
              style={styles.cancelButton}
              aria-label="Cancel login"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.button}
              disabled={isSubmitting}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              aria-label={type === "results" ? "View results" : "View account"}
            >
              {isSubmitting ? "Loading..." : `View ${type === "results" ? "Results" : "Account"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(StudentLogin);
