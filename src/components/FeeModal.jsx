import React, { memo } from "react";

function FeeModal({ schoolData, onClose, isDarkMode }) {
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
      maxWidth: "700px",
      width: "90%",
      maxHeight: "85vh",
      overflowY: "auto",
      boxShadow: isDarkMode
        ? "0 20px 60px rgba(0,0,0,0.5)"
        : "0 20px 60px rgba(0,0,0,0.3)"
    },
    header: {
      borderBottom: isDarkMode ? "2px solid #4a5568" : "2px solid #f0f0f0",
      paddingBottom: "20px",
      marginBottom: "25px",
      textAlign: "center"
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: isDarkMode ? "#e2e8f0" : "#333",
      marginBottom: "10px"
    },
    schoolName: {
      fontSize: "1.2rem",
      color: isDarkMode ? "#a3b1e0" : "#667eea",
      fontWeight: "600"
    },
    levelSection: {
      marginBottom: "25px",
      padding: "20px",
      backgroundColor: isDarkMode ? "#4a5568" : "#f8f9fa",
      borderRadius: "10px",
      border: isDarkMode ? "1px solid #4a5568" : "1px solid #e9ecef"
    },
    levelTitle: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      color: isDarkMode ? "#a3b1e0" : "#667eea",
      marginBottom: "15px",
      textAlign: "center"
    },
    feeGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
      marginBottom: "15px"
    },
    feeItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 12px",
      backgroundColor: isDarkMode ? "#2d3748" : "white",
      borderRadius: "6px",
      border: isDarkMode ? "1px solid #4a5568" : "1px solid #e1e5e9"
    },
    feeLabel: {
      fontWeight: "500",
      color: isDarkMode ? "#cbd5e0" : "#495057"
    },
    feeAmount: {
      fontWeight: "600",
      color: "#28a745"
    },
    totalSection: {
      backgroundColor: isDarkMode ? "#2d3748" : "#e8f5e8",
      padding: "12px",
      borderRadius: "8px",
      marginTop: "10px",
      textAlign: "center"
    },
    totalLabel: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: isDarkMode ? "#e2e8f0" : "#155724"
    },
    additionalInfo: {
      backgroundColor: isDarkMode ? "#2d3748" : "#fff3cd",
      padding: "15px",
      borderRadius: "8px",
      marginTop: "20px",
      border: isDarkMode ? "1px solid #4a5568" : "1px solid #ffeaa7"
    },
    infoTitle: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: isDarkMode ? "#e2e8f0" : "#856404",
      marginBottom: "8px"
    },
    infoText: {
      fontSize: "0.95rem",
      lineHeight: "1.5",
      color: isDarkMode ? "#cbd5e0" : "#6c5700"
    },
    closeButton: {
      display: "block",
      margin: "20px auto 0",
      padding: "12px 24px",
      backgroundColor: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "background-color 0.3s ease"
    }
  };

  const renderFeeLevel = (levelData, key) => (
    <div key={key} style={styles.levelSection}>
      <div style={styles.levelTitle}>{levelData.level}</div>
      
      <div style={styles.feeGrid}>
        <div style={styles.feeItem}>
          <span style={styles.feeLabel}>Tuition Fee:</span>
          <span style={styles.feeAmount}>{levelData.tuitionFee}</span>
        </div>
        
        <div style={styles.feeItem}>
          <span style={styles.feeLabel}>Admission Fee:</span>
          <span style={styles.feeAmount}>{levelData.admissionFee}</span>
        </div>
        
        <div style={styles.feeItem}>
          <span style={styles.feeLabel}>Development Fee:</span>
          <span style={styles.feeAmount}>{levelData.developmentFee}</span>
        </div>
        
        <div style={styles.feeItem}>
          <span style={styles.feeLabel}>Books & Materials:</span>
          <span style={styles.feeAmount}>{levelData.booksAndMaterials}</span>
        </div>
        
        {levelData.examFees && (
          <div style={styles.feeItem}>
            <span style={styles.feeLabel}>Exam Fees:</span>
            <span style={styles.feeAmount}>{levelData.examFees}</span>
          </div>
        )}
        
        {levelData.laboratoryFee && (
          <div style={styles.feeItem}>
            <span style={styles.feeLabel}>Laboratory Fee:</span>
            <span style={styles.feeAmount}>{levelData.laboratoryFee}</span>
          </div>
        )}
        
        {levelData.computerLab && (
          <div style={styles.feeItem}>
            <span style={styles.feeLabel}>Computer Lab:</span>
            <span style={styles.feeAmount}>{levelData.computerLab}</span>
          </div>
        )}
        
        {levelData.sportsAndActivities && (
          <div style={styles.feeItem}>
            <span style={styles.feeLabel}>Sports & Activities:</span>
            <span style={styles.feeAmount}>{levelData.sportsAndActivities}</span>
          </div>
        )}
        
        <div style={styles.feeItem}>
          <span style={styles.feeLabel}>Uniform (Optional):</span>
          <span style={styles.feeAmount}>{levelData.uniformFee}</span>
        </div>
      </div>
      
      <div style={styles.totalSection}>
        <div style={styles.totalLabel}>
          Total: {levelData.total}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Fee Structure</h2>
          <div style={styles.schoolName}>{schoolData.name}</div>
        </div>

        {schoolData.detailedFees.nursery && renderFeeLevel(schoolData.detailedFees.nursery, "nursery")}
        {schoolData.detailedFees.primary && renderFeeLevel(schoolData.detailedFees.primary, "primary")}
        {schoolData.detailedFees.secondary && renderFeeLevel(schoolData.detailedFees.secondary, "secondary")}

        <div style={styles.additionalInfo}>
          <div style={styles.infoTitle}>📋 Additional Information</div>
          <div style={styles.infoText}>
            {schoolData.detailedFees.additionalInfo}
          </div>
        </div>

        <div style={{ ...styles.additionalInfo, backgroundColor: "#e8f5e8", borderColor: "#c3e6cb" }}>
          <div style={{ ...styles.infoTitle, color: "#155724" }}>💳 Payment Modes</div>
          <div style={{ ...styles.infoText, color: "#155724" }}>
            <strong>Accepted Payment Methods:</strong><br/>
            • Bank Transfer (Account: {schoolData.name} School - Standard Bank)<br/>
            • Mobile Money (Airtel Money & TNM Mpamba)<br/>
            • Cash Payment at School Office<br/>
            • Cheque Payment (Made payable to {schoolData.name} School)<br/><br/>
            
            <strong>Payment Schedule:</strong><br/>
            • Term fees due at start of each term<br/>
            • Annual fees can be paid in installments<br/>
            • Late payment penalty: MK 5,000 after 2 weeks<br/>
            • Payment receipts must be presented for school entry
          </div>
        </div>

        <button
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#5a6fd8"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#667eea"}
          aria-label="Close fee modal"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default memo(FeeModal);
