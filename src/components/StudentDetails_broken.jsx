import React, { useState, memo } from "react";

function StudentDetails({ student, type, onClose, isDarkMode }) {
  const [activeSection, setActiveSection] = useState("term");
  const [selectedTerm, setSelectedTerm] = useState(() => {
    // Set default to first available term
    if (student.results && !student.results.subjects) {
      const availableTerms = Object.keys(student.results || {});
      return availableTerms.length > 0 ? availableTerms[0] : "term1";
    }
    return "term1";
  });
  const [selectedAssessment, setSelectedAssessment] = useState("firstAssessment");
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getGradeFromMark = (mark) => {
    if (mark >= 90) return "A+";
    if (mark >= 80) return "A";
    if (mark >= 70) return "A-";
    if (mark >= 65) return "B+";
    if (mark >= 55) return "B";
    if (mark >= 50) return "B-";
    if (mark >= 45) return "C+";
    if (mark >= 40) return "C";
    if (mark >= 35) return "C-";
    if (mark >= 30) return "D+";
    if (mark >= 25) return "D";
    return "F";
  };

  const getPointsFromMark = (mark) => {
    if (mark >= 80) return 1;
    if (mark >= 70) return 2;
    if (mark >= 65) return 3;
    if (mark >= 60) return 4;
    if (mark >= 55) return 5;
    if (mark >= 50) return 6;
    if (mark >= 45) return 7;
    if (mark >= 40) return 8;
    return 9;
  };

  const isForm3Or4Student = () => {
    const classStr = student.class?.toLowerCase() || "";
    return classStr === "form 3" || classStr === "form 4" || 
           classStr === "grade 3" || classStr === "grade 4";
  };

  const getSubjectNames = () => {
    if (student.results && Object.keys(student.results).length > 0) {
      // Check for simple subjects structure (Grade schools)
      if (student.results.subjects) {
        return Object.keys(student.results.subjects);
      }
      
      // Check for term-based structure (Form schools)
      const firstTerm = Object.values(student.results)[0];
      if (firstTerm && firstTerm.firstAssessment) {
        return Object.keys(firstTerm.firstAssessment).filter(key => 
          !['date', 'average'].includes(key)
        );
      }
    }
    return ['english', 'mathematics', 'science', 'history', 'geography'];
  };

  const hasTermBasedResults = () => {
    return student.results && !student.results.subjects && 
           Object.keys(student.results).some(key => key.startsWith('term'));
  };

  const hasSimpleResults = () => {
    return student.results && student.results.subjects;
  };

  const subjects = getSubjectNames();
  
  // Use actual student data
  const data = {
    results: student.results || {},
    personalInfo: {
      studentId: student.id,
      dateOfBirth: student.dateOfBirth,
      guardianName: student.guardian,
      guardianPhone: student.phone,
      address: student.address,
      enrollmentDate: student.admissionDate,
      status: "Active"
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
      maxWidth: "600px",
      width: "90%",
      maxHeight: "80vh",
      overflowY: "auto",
      boxShadow: isDarkMode
        ? "0 20px 60px rgba(0,0,0,0.5)"
        : "0 20px 60px rgba(0,0,0,0.3)"
    },
    header: {
      borderBottom: isDarkMode ? "2px solid #4a5568" : "2px solid #f0f0f0",
      paddingBottom: "20px",
      marginBottom: "25px"
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: isDarkMode ? "#e2e8f0" : "#333",
      marginBottom: "10px"
    },
    studentInfo: {
      backgroundColor: isDarkMode ? "#4a5568" : "#f8f9fa",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px"
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
      fontSize: "14px"
    },
    label: {
      fontWeight: "600",
      color: isDarkMode ? "#cbd5e0" : "#666"
    },
    value: {
      color: isDarkMode ? "#e2e8f0" : "#333"
    },
    resultsTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    },
    tableHeader: {
      backgroundColor: "#667eea",
      color: "white",
      padding: "12px",
      textAlign: "left"
    },
    tableCell: {
      padding: "10px 12px",
      borderBottom: isDarkMode ? "1px solid #4a5568" : "1px solid #eee"
    },
    grade: {
      fontWeight: "bold",
      padding: "4px 8px",
      borderRadius: "4px",
      color: "white"
    },
    summary: {
      backgroundColor: isDarkMode ? "#2d3748" : "#e8f5e8",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px"
    },
    closeButton: {
      padding: "10px 20px",
      backgroundColor: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      float: "right"
    },
    tabs: {
      display: "flex",
      borderBottom: isDarkMode ? "2px solid #4a5568" : "2px solid #f0f0f0",
      marginBottom: "20px"
    },
    tab: {
      padding: "12px 20px",
      cursor: "pointer",
      borderBottom: "3px solid transparent",
      fontSize: "14px",
      fontWeight: "500",
      color: isDarkMode ? "#cbd5e0" : "#666",
      transition: "all 0.3s ease",
      marginRight: "10px"
    },
    activeTab: {
      color: "#667eea",
      borderBottomColor: "#667eea",
      fontWeight: "600"
    },
    scrollSection: {
      maxHeight: "300px",
      overflowY: "auto",
      padding: "10px",
      border: isDarkMode ? "1px solid #4a5568" : "1px solid #e1e1e1",
      borderRadius: "8px",
      marginBottom: "15px"
    },
    termCard: {
      backgroundColor: isDarkMode ? "#4a5568" : "#f8f9fa",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "15px",
      border: isDarkMode ? "1px solid #4a5568" : "1px solid #e1e1e1"
    },
    termHeader: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: isDarkMode ? "#e2e8f0" : "#333",
      marginBottom: "10px"
    },
    compactTable: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "13px"
    },
    compactCell: {
      padding: "6px 8px",
      borderBottom: isDarkMode ? "1px solid #4a5568" : "1px solid #eee"
    },
    finalResultCard: {
      backgroundColor: isDarkMode ? "#2d3748" : "#e8f5e8",
      padding: "20px",
      borderRadius: "10px",
      border: isDarkMode ? "2px solid #4a5568" : "2px solid #28a745"
    },
    promotionBadge: {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold",
      color: "white",
      marginTop: "10px"
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "#28a745";
    if (grade.startsWith("B")) return "#17a2b8";
    if (grade.startsWith("C")) return "#ffc107";
    return "#dc3545";
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title} id="student-details-title">
            {type === "results" ? "Academic Results" : "Account Details"}
          </h2>
          <div style={styles.studentInfo}>
            <div style={styles.infoRow}>
              <span style={styles.label}>Student Name:</span>
              <span style={styles.value}>{student.name}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Class:</span>
              <span style={styles.value}>{student.class}</span>
            </div>
          </div>
        </div>

        {type === "results" ? (
          <div>
            {hasSimpleResults() ? (
              // Simple results structure for Grade schools
              <div>
                <div style={styles.summary}>
                  <h3>Academic Results</h3>
                  <div style={styles.infoRow}>
                    <span style={styles.label}>Overall Performance:</span>
                    <span style={styles.value}>{student.results.remarks || 'No remarks available'}</span>
                  </div>
                </div>

                <table style={styles.resultsTable}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Subject</th>
                      <th style={styles.tableHeader}>Marks</th>
                      <th style={styles.tableHeader}>{isForm3Or4Student() ? "Points" : "Grade"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => {
                      const mark = student.results.subjects[subject] || 0;
                      const grade = getGradeFromMark(mark);
                      const points = getPointsFromMark(mark);
                      return (
                        <tr key={subject}>
                          <td style={styles.tableCell}>
                            {subject.charAt(0).toUpperCase() + subject.slice(1)}
                          </td>
                          <td style={styles.tableCell}>{mark}/100</td>
                          <td style={styles.tableCell}>
                            {isForm3Or4Student() ? (
                              <span
                                style={{
                                  ...styles.grade,
                                  backgroundColor: points <= 3 ? "#28a745" : points <= 6 ? "#17a2b8" : points <= 8 ? "#ffc107" : "#dc3545"
                                }}
                              >
                                {points}
                              </span>
                            ) : (
                              <span
                                style={{
                                  ...styles.grade,
                                  backgroundColor: getGradeColor(grade)
                                }}
                              >
                                {grade}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {isForm3Or4Student() && (
                  <div style={styles.summary}>
                    <div style={styles.infoRow}>
                      <span style={styles.label}>Final Points:</span>
                      <span style={{
                        ...styles.value,
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#667eea"
                      }}>
                        {student.results.finalPoints !== undefined ? 
                          student.results.finalPoints : 'Not set'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Term-based results structure for Form schools
              <div>
                {/* Term Selection */}
                <div style={styles.tabs}>
                  {Object.keys(data.results).map((termKey) => (
                    <div
                      key={termKey}
                      style={{
                        ...styles.tab,
                        ...(selectedTerm === termKey ? styles.activeTab : {})
                      }}
                      onClick={() => setSelectedTerm(termKey)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedTerm(termKey);
                        }
                      }}
                      aria-selected={selectedTerm === termKey}
                    >
                      {termKey.replace('term', 'Term ')}
                    </div>
                  ))}
                </div>

                {/* Assessment Type Selection */}
                {data.results[selectedTerm] && data.results[selectedTerm].firstAssessment && (
                  <div>
                    <div style={{
                      ...styles.tabs,
                      borderTop: "1px solid #f0f0f0",
                      paddingTop: "10px",
                      marginTop: "10px"
                    }}>
                      <div
                        style={{
                          ...styles.tab,
                          ...(selectedAssessment === "firstAssessment" ? styles.activeTab : {})
                        }}
                        onClick={() => setSelectedAssessment("firstAssessment")}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedAssessment("firstAssessment");
                          }
                        }}
                        aria-selected={selectedAssessment === "firstAssessment"}
                      >
                        First Assessment
                      </div>
                      <div
                        style={{
                          ...styles.tab,
                          ...(selectedAssessment === "secondAssessment" ? styles.activeTab : {})
                        }}
                        onClick={() => setSelectedAssessment("secondAssessment")}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedAssessment("secondAssessment");
                          }
                        }}
                        aria-selected={selectedAssessment === "secondAssessment"}
                      >
                        Second Assessment
                      </div>
                      <div
                        style={{
                          ...styles.tab,
                          ...(selectedAssessment === "finalExam" ? styles.activeTab : {})
                        }}
                        onClick={() => setSelectedAssessment("finalExam")}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedAssessment("finalExam");
                          }
                        }}
                        aria-selected={selectedAssessment === "finalExam"}
                      >
                        📋 Final Exam
                      </div>
                      <div
                        style={{
                          ...styles.tab,
                          ...(selectedAssessment === "termSummary" ? styles.activeTab : {})
                        }}
                        onClick={() => setSelectedAssessment("termSummary")}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedAssessment("termSummary");
                          }
                        }}
                        aria-selected={selectedAssessment === "termSummary"}
                      >
                        Term Summary
                      </div>
                    </div>

                    {/* Display Selected Assessment Results */}
                    {selectedAssessment !== "termSummary" ? (
                      <div>
                        <div style={styles.summary}>
                          <h3>{selectedTerm.replace('term', 'Term ')} - {selectedAssessment.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                          
                          {data.results[selectedTerm][selectedAssessment] && (
                            <>
                              <div style={styles.infoRow}>
                                <span style={styles.label}>Assessment Date:</span>
                                <span style={styles.value}>
                                  {data.results[selectedTerm][selectedAssessment].date ? 
                                    formatDate(data.results[selectedTerm][selectedAssessment].date) : 'N/A'}
                                </span>
                              </div>
                              <div style={styles.infoRow}>
                                <span style={styles.label}>Average Score:</span>
                                <span style={styles.value}>{data.results[selectedTerm][selectedAssessment].average}%</span>
                              </div>
                            </>
                          )}
                        </div>

                        <table style={styles.resultsTable}>
                          <thead>
                            <tr>
                              <th style={styles.tableHeader}>Subject</th>
                              <th style={styles.tableHeader}>Marks</th>
                              <th style={styles.tableHeader}>{isForm3Or4Student() ? "Points" : "Grade"}</th>
                              {selectedAssessment !== "finalExam" && (
                                <th style={styles.tableHeader}>Progress</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {subjects.map((subject) => {
                              const currentData = data.results[selectedTerm][selectedAssessment];
                              const mark = currentData[subject] || 0;
                              const grade = getGradeFromMark(mark);
                              const points = getPointsFromMark(mark);
                              
                              // Calculate progress if not final exam
                              let progress = null;
                              if (selectedAssessment !== "finalExam") {
                                const previousAssessment = selectedAssessment === "secondAssessment" ? "firstAssessment" : null;
                                if (previousAssessment && data.results[selectedTerm][previousAssessment]) {
                                  const previousMark = data.results[selectedTerm][previousAssessment][subject] || 0;
                                  progress = mark - previousMark;
                                }
                              }

                              return (
                                <tr key={subject}>
                                  <td style={styles.tableCell}>
                                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                                  </td>
                                  <td style={styles.tableCell}>{mark}/100</td>
                                  <td style={styles.tableCell}>
                                    {isForm3Or4Student() ? (
                                      <span
                                        style={{
                                          ...styles.grade,
                                          backgroundColor: points <= 3 ? "#28a745" : points <= 6 ? "#17a2b8" : points <= 8 ? "#ffc107" : "#dc3545"
                                        }}
                                      >
                                        {points}
                                      </span>
                                    ) : (
                                      <span
                                        style={{
                                          ...styles.grade,
                                          backgroundColor: getGradeColor(grade)
                                        }}
                                      >
                                        {grade}
                                      </span>
                                    )}
                                  </td>
                                  {selectedAssessment !== "finalExam" && (
                                    <td style={styles.tableCell}>
                                      <span style={{
                                        color: progress >= 0 ? "#28a745" : "#dc3545",
                                        fontWeight: "bold"
                                      }}>
                                        {progress >= 0 ? '+' : ''}{progress}
                                      </span>
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      // Term Summary View
                      <div>
                        <div style={styles.summary}>
                          <div style={styles.infoRow}>
                            <span style={styles.label}>Final Points:</span>
                            <span style={{
                              ...styles.value,
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              color: "#667eea"
                            }}>
                              {data.results[selectedTerm]?.finalPoints !== undefined ? 
                                data.results[selectedTerm].finalPoints : 'Not set'}
                            </span>
                          </div>
                        </div>
                        </span>
                      </div>
                    </div>

                    {/* Assessment Comparison Table */}
                    <table style={styles.resultsTable}>
                      <thead>
                        <tr>
                          <th style={styles.tableHeader}>Subject</th>
                          <th style={styles.tableHeader}>1st Assessment</th>
                          <th style={styles.tableHeader}>2nd Assessment</th>
                          <th style={styles.tableHeader}>Final Exam</th>
                          <th style={styles.tableHeader}>Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects.map((subject) => {
                          const first = data.results[selectedTerm].firstAssessment?.[subject] || 0;
                          const second = data.results[selectedTerm].secondAssessment?.[subject] || 0;
                          const final = data.results[selectedTerm].finalExam?.[subject] || 0;
                          const progress = final - first;
                          return (
                            <tr key={subject}>
                              <td style={styles.tableCell}>
                                {subject.charAt(0).toUpperCase() + subject.slice(1)}
                              </td>
                              <td style={styles.tableCell}>{first}</td>
                              <td style={styles.tableCell}>{second}</td>
                              <td style={styles.tableCell}>{final}</td>
                              <td style={styles.tableCell}>
                                <span style={{ 
                                  color: progress >= 0 ? "#28a745" : "#dc3545",
                                  fontWeight: "bold"
                                }}>
                                  {progress >= 0 ? '+' : ''}{progress}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* If no assessment data available */}
            {(!data.results[selectedTerm] || !data.results[selectedTerm].firstAssessment) && (
              <div style={styles.summary}>
                <h3>No Results Available</h3>
                <p>Assessment results for this term are not yet available.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Financial Information Only */}
            <div style={{ ...styles.summary, backgroundColor: "#e8f5e8" }}>
              <h3 style={{ marginBottom: "15px", color: "#333" }}>💰 Financial Information</h3>
              
              <div style={styles.infoRow}>
                <span style={styles.label}>Total Fees Owed:</span>
                <span style={styles.value}>MK {student.fees?.totalOwed?.toLocaleString() || 'N/A'}</span>
              </div>
              
              <div style={styles.infoRow}>
                <span style={styles.label}>Total Fees Paid:</span>
                <span style={{
                  ...styles.value,
                  color: "#28a745",
                  fontWeight: "bold"
                }}>
                  MK {student.fees?.totalPaid?.toLocaleString() || 'N/A'}
                </span>
              </div>
              
              <div style={styles.infoRow}>
                <span style={styles.label}>Outstanding Balance:</span>
                <span style={{
                  ...styles.value,
                  color: student.fees?.balance > 0 ? "#dc3545" : "#28a745",
                  fontWeight: "bold",
                  fontSize: "1.1rem"
                }}>
                  MK {student.fees?.balance?.toLocaleString() || 'N/A'}
                </span>
              </div>
              
              {student.fees?.nextPaymentDue && (
                <div style={styles.infoRow}>
                  <span style={styles.label}>Next Payment Due:</span>
                  <span style={{
                    ...styles.value,
                    color: "#667eea",
                    fontWeight: "600"
                  }}>
                    {new Date(student.fees.nextPaymentDue).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
              
              <div style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: student.fees?.balance === 0 ? "#d4edda" : "#fff3cd",
                borderRadius: "8px",
                border: `2px solid ${student.fees?.balance === 0 ? "#28a745" : "#ffc107"}`
              }}>
                <div style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: student.fees?.balance === 0 ? "#155724" : "#856404",
                  textAlign: "center"
                }}>
                  {student.fees?.balance === 0 ? "✅ FEES FULLY PAID" : "⚠️ OUTSTANDING BALANCE"}
                </div>
                {student.fees?.balance > 0 && (
                  <div style={{
                    fontSize: "0.9rem",
                    color: "#856404",
                    textAlign: "center",
                    marginTop: "8px"
                  }}>
                    Please settle the outstanding balance by the due date.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#5a6fd8"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#667eea"}
          aria-label="Close student details"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default memo(StudentDetails);
