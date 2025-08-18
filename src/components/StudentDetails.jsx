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

  // Get the class/grade information from either field
  const getStudentClass = () => {
    return student.class || student.grade || '';
  };

  // Check if student is in Grade 3 or 4 (formerly Form 3 or 4)
    const isForm3Or4Student = () => {
      const className = getStudentClass().toLowerCase();
      return className.includes('form 3') || className.includes('form 4') ||
             className.includes('grade 3') || className.includes('grade 4');
    };

  // Helper functions to detect data structure
  const hasSimpleResults = () => {
    return student.results && student.results.subjects;
  };

  const hasTermBasedResults = () => {
    return student.results && !student.results.subjects && 
           Object.keys(student.results).some(key => key.startsWith('term'));
  };

  // Get subject names based on data structure
    const getSubjectNames = () => {
      if (student.results && Object.keys(student.results).length > 0) {
        // Check for simple subjects structure (Grade schools)
        if (student.results.subjects) {
          return Object.keys(student.results.subjects);
        }
        
        // Check for term-based structure (Form schools)
        const firstTerm = Object.values(student.results)[0];
        if (firstTerm) {
          // Chisomo structure with assessments
          if (firstTerm.firstAssessment) {
            return Object.keys(firstTerm.firstAssessment).filter(key =>
              !['date', 'average'].includes(key)
            );
          }
          // Ekhaya structure with direct letter grades
          else {
            return Object.keys(firstTerm).filter(key =>
              !['overall'].includes(key)
            );
          }
        }
      }
      return ['english', 'mathematics', 'science', 'history', 'geography'];
    };

  const subjects = getSubjectNames();
  const data = { results: student.results || {} };

  // Check if we have assessment-based structure (Chisomo) or direct grades (Ekhaya)
  const firstTerm = student.results ? Object.values(student.results)[0] : null;
  const isAssessmentBased = firstTerm && firstTerm.firstAssessment;

  // Grading functions
  const getGradeFromMark = (mark) => {
    if (mark >= 80) return "A";
    if (mark >= 70) return "B";
    if (mark >= 60) return "C";
    if (mark >= 50) return "D";
    if (mark >= 40) return "E";
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

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A": return "#28a745";
      case "B": return "#17a2b8";
      case "C": return "#ffc107";
      case "D": return "#fd7e14";
      case "E": return "#dc3545";
      case "F": return "#6c757d";
      default: return "#6c757d";
    }
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "20px"
    },
    modal: {
      backgroundColor: isDarkMode ? "#2d3748" : "#ffffff",
      color: isDarkMode ? "#e2e8f0" : "#2d3748",
      borderRadius: "12px",
      padding: "30px",
      maxWidth: "90vw",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      border: isDarkMode ? "1px solid #4a5568" : "1px solid #e2e8f0"
    },
    header: {
      borderBottom: isDarkMode ? "2px solid #4a5568" : "2px solid #e2e8f0",
      paddingBottom: "20px",
      marginBottom: "25px"
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#667eea",
      marginBottom: "10px"
    },
    subtitle: {
      fontSize: "1.1rem",
      color: isDarkMode ? "#a0aec0" : "#718096",
      marginBottom: "15px"
    },
    tabs: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "20px",
      borderBottom: isDarkMode ? "1px solid #4a5568" : "1px solid #e2e8f0",
      paddingBottom: "10px"
    },
    tab: {
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "500",
      transition: "all 0.2s",
      backgroundColor: isDarkMode ? "#4a5568" : "#f7fafc",
      color: isDarkMode ? "#e2e8f0" : "#4a5568",
      border: isDarkMode ? "1px solid #718096" : "1px solid #e2e8f0"
    },
    activeTab: {
      backgroundColor: "#667eea",
      color: "#ffffff",
      border: "1px solid #667eea"
    },
    summary: {
      backgroundColor: isDarkMode ? "#4a5568" : "#f8f9fa",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px",
      border: isDarkMode ? "1px solid #718096" : "1px solid #e9ecef"
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      flexWrap: "wrap"
    },
    label: {
      fontWeight: "600",
      color: isDarkMode ? "#cbd5e0" : "#495057",
      marginRight: "10px"
    },
    value: {
      fontWeight: "500",
      color: isDarkMode ? "#e2e8f0" : "#212529"
    },
    resultsTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "15px",
      backgroundColor: isDarkMode ? "#2d3748" : "#ffffff",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },
    tableHeader: {
      backgroundColor: isDarkMode ? "#4a5568" : "#f8f9fa",
      color: isDarkMode ? "#e2e8f0" : "#495057",
      padding: "12px",
      textAlign: "left",
      fontWeight: "600",
      borderBottom: isDarkMode ? "2px solid #718096" : "2px solid #dee2e6"
    },
    tableCell: {
      padding: "10px 12px",
      borderBottom: isDarkMode ? "1px solid #4a5568" : "1px solid #dee2e6",
      color: isDarkMode ? "#e2e8f0" : "#495057"
    },
    grade: {
      padding: "4px 8px",
      borderRadius: "4px",
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: "0.85rem"
    },
    closeButton: {
      backgroundColor: "#667eea",
      color: "#ffffff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
      marginTop: "20px",
      transition: "background-color 0.2s"
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {student.firstName} {student.lastName}
          </h2>
          <p style={styles.subtitle}>
            {student.class ? 'Class' : 'Grade'}: {getStudentClass()} | ID: {student.id}
          </p>
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
                                <span style={styles.value}>{student.results.remarks || student.results.overall || 'No remarks available'}</span>
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
                                          // Check if we have simple subjects structure or direct letter grades
                                          const hasSubjectsField = student.results.subjects;
                                          let mark, grade, points;
                                          
                                          if (hasSubjectsField) {
                                            // Simple subjects structure with numeric scores
                                            mark = student.results.subjects[subject] || 0;
                                            grade = getGradeFromMark(mark);
                                            points = getPointsFromMark(mark);
                                          } else {
                                            // Direct letter grades structure
                                            mark = 0; // Not applicable
                                            grade = student.results[subject] || 'N/A';
                                            points = 0; // Not applicable
                                          }
                                          
                                          return (
                                            <tr key={subject}>
                                              <td style={styles.tableCell}>
                                                {subject.charAt(0).toUpperCase() + subject.slice(1)}
                                              </td>
                                              <td style={styles.tableCell}>
                                                {hasSubjectsField ? `${mark}/100` : 'N/A'}
                                              </td>
                                              <td style={styles.tableCell}>
                                                {isForm3Or4Student() && hasSubjectsField ? (
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

                {isForm3Or4Student() && student.results.finalPoints !== undefined && (
                  <div style={styles.summary}>
                    <div style={styles.infoRow}>
                      <span style={styles.label}>Final Points:</span>
                      <span style={{
                        ...styles.value,
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#667eea"
                      }}>
                        {student.results.finalPoints}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : hasTermBasedResults() ? (
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
                      📊 {termKey.replace('term', 'Term ')}
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
                        📝 First Assessment
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
                        📄 Second Assessment
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
                        📊 Term Summary
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
                                                          // Check if we have assessment-based structure (Chisomo) or direct grades (Ekhaya)
                                                          
                                                          let mark, grade, points;
                                                          if (isAssessmentBased) {
                                                            // Chisomo structure with assessments
                                                            const currentData = data.results[selectedTerm][selectedAssessment];
                                                            mark = currentData[subject] || 0;
                                                            grade = getGradeFromMark(mark);
                                                            points = getPointsFromMark(mark);
                                                          } else {
                                                            // Ekhaya structure with direct letter grades
                                                            const termData = data.results[selectedTerm];
                                                            grade = termData[subject] || 'N/A';
                                                            // For Ekhaya, we don't have numeric marks or points calculation
                                                            mark = 0; // Not applicable for letter grades
                                                            points = 0; // Not applicable for letter grades
                                                          }
                                                          
                                                          // Calculate progress if not final exam (only for assessment-based structure)
                                                          let progress = null;
                                                          if (isAssessmentBased && selectedAssessment !== "finalExam") {
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
                                                                <td style={styles.tableCell}>
                                                                  {isAssessmentBased ? `${mark}/100` : 'N/A'}
                                                                </td>
                                                                <td style={styles.tableCell}>
                                                                  {isForm3Or4Student() && isAssessmentBased ? (
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
                                                                {isAssessmentBased && selectedAssessment !== "finalExam" && (
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
                                                <h3>Term Summary - {selectedTerm.replace('term', 'Term ')}</h3>
                                                {isAssessmentBased && data.results[selectedTerm] && data.results[selectedTerm].termAverage !== undefined ? (
                                                  <div style={styles.infoRow}>
                                                    <span style={styles.label}>Term Average:</span>
                                                    <span style={styles.value}>{data.results[selectedTerm].termAverage}%</span>
                                                  </div>
                                                ) : null}
                                                {isForm3Or4Student() && isAssessmentBased && data.results[selectedTerm] && data.results[selectedTerm].finalPoints !== undefined ? (
                                                  <div style={styles.infoRow}>
                                                    <span style={styles.label}>Final Points:</span>
                                                    <span style={{
                                                      ...styles.value,
                                                      fontSize: "1.2rem",
                                                      fontWeight: "bold",
                                                      color: "#667eea"
                                                    }}>
                                                      {data.results[selectedTerm].finalPoints}
                                                    </span>
                                                  </div>
                                                ) : !isForm3Or4Student() && !isAssessmentBased && data.results[selectedTerm] ? (
                                                  <div style={styles.infoRow}>
                                                    <span style={styles.label}>Term Grade:</span>
                                                    <span style={styles.value}>{data.results[selectedTerm].overall || 'N/A'}</span>
                                                  </div>
                                                ) : null}
                                                {isAssessmentBased && data.results[selectedTerm] && data.results[selectedTerm].position !== undefined ? (
                                                  <div style={styles.infoRow}>
                                                    <span style={styles.label}>Class Position:</span>
                                                    <span style={styles.value}>
                                                      {data.results[selectedTerm].position} out of {data.results[selectedTerm].totalStudents}
                                                    </span>
                                                  </div>
                                                ) : null}
                                              </div>
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
              <div>No Results Available</div>
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
