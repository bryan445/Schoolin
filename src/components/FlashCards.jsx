import React, { useState, useEffect, memo } from "react";

function FlashCards({ isDarkMode }) {
  const [currentCard, setCurrentCard] = useState(0);
  
  const features = [
    {
      icon: "📰",
      title: "Stay Updated",
      subtitle: "School Information",
      description: "Get the latest school announcements, news, and important updates from your institution",
      gradient: isDarkMode
        ? "linear-gradient(135deg, #4a5568, #2d3748)"
        : "linear-gradient(135deg, #667eea, #764ba2)"
    },
    {
      icon: "📊",
      title: "Monitor Performance",
      subtitle: "Academic Progress",
      description: "Track your academic performance, view detailed results, and monitor your educational journey",
      gradient: isDarkMode
        ? "linear-gradient(135deg, #4a5568, #2d3748)"
        : "linear-gradient(135deg, #5a6fd8, #667eea)"
    },
    {
      icon: "💰",
      title: "Check School Fees",
      subtitle: "Financial Information",
      description: "View fee structures, check payment status, and manage your school financial obligations",
      gradient: isDarkMode
        ? "linear-gradient(135deg, #4a5568, #2d3748)"
        : "linear-gradient(135deg, #764ba2, #8b5fb8)"
    },
    {
      icon: "📝",
      title: "Examination Results",
      subtitle: "Academic Achievement",
      description: "Access your exam results, grades, and comprehensive academic reports instantly",
      gradient: isDarkMode
        ? "linear-gradient(135deg, #4a5568, #2d3748)"
        : "linear-gradient(135deg, #6c5ce7, #74b9ff)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % features.length);
    }, 4000); // Change card every 4 seconds

    return () => clearInterval(interval);
  }, [features.length]);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "40px",
      height: "300px",
      position: "relative"
    },
    cardContainer: {
      position: "relative",
      width: "100%",
      maxWidth: "500px",
      height: "250px"
    },
    card: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkMode ? "#2d3748" : "white",
      borderRadius: "20px",
      padding: "40px 30px",
      textAlign: "center",
      boxShadow: isDarkMode
        ? "0 15px 40px rgba(0,0,0,0.3)"
        : "0 15px 40px rgba(0,0,0,0.15)",
      transform: "translateY(0)",
      transition: "all 0.6s ease-in-out",
      opacity: 0,
      animation: "fadeIn 0.6s ease-in-out forwards"
    },
    activeCard: {
      opacity: 1,
      zIndex: 2
    },
    iconContainer: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 20px",
      fontSize: "2.5rem",
      color: "white",
      boxShadow: isDarkMode
        ? "0 8px 25px rgba(0,0,0,0.3)"
        : "0 8px 25px rgba(0,0,0,0.15)",
      animation: "pulse 2s infinite"
    },
    title: {
      fontSize: "1.6rem",
      fontWeight: "700",
      color: isDarkMode ? "#e2e8f0" : "#2c3e50",
      marginBottom: "8px",
      letterSpacing: "0.5px"
    },
    subtitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      background: isDarkMode
        ? "linear-gradient(135deg, #a3b1e0, #764ba2)"
        : "linear-gradient(135deg, #667eea, #764ba2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "15px"
    },
    description: {
      fontSize: "1rem",
      color: isDarkMode ? "#cbd5e0" : "#7f8c8d",
      lineHeight: "1.6",
      maxWidth: "400px",
      margin: "0 auto"
    },
    indicators: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "30px",
      position: "relative",
      zIndex: 3
    },
    indicator: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(226, 232, 240, 0.4)"
        : "rgba(255,255,255,0.4)",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    activeIndicator: {
      transform: "scale(1.2)"
    }
  };

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;

  // Inject keyframes into the document
  if (typeof document !== 'undefined' && !document.querySelector('#flashcard-styles')) {
    const style = document.createElement('style');
    style.id = 'flashcard-styles';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.cardContainer}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={{
                ...styles.card,
                ...(index === currentCard ? styles.activeCard : {})
              }}
            >
              <div 
                style={{
                  ...styles.iconContainer,
                  background: feature.gradient
                }}
              >
                {feature.icon}
              </div>
              <h3 style={styles.title}>{feature.title}</h3>
              <p style={styles.subtitle}>{feature.subtitle}</p>
              <p style={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div style={styles.indicators}>
        {features.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.indicator,
              ...(index === currentCard ? styles.activeIndicator : {}),
              backgroundColor: index === currentCard ? features[currentCard].gradient.match(/#[a-fA-F0-9]{6}/)?.[0] || "#667eea" : "rgba(255,255,255,0.4)"
            }}
            onClick={() => setCurrentCard(index)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrentCard(index);
              }
            }}
            aria-label={`View feature ${index + 1} of ${features.length}`}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(FlashCards);
