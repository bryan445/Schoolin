import React, { memo } from "react";

function ContactPanel({ isDarkMode }) {
  const styles = {
    contactPanel: {
      backgroundColor: isDarkMode ? "#1a202c" : "#2c3e50",
      color: isDarkMode ? "#e2e8f0" : "white",
      padding: "30px 20px",
      marginTop: "auto"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "30px"
    },
    section: {
      textAlign: "center"
    },
    sectionTitle: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      marginBottom: "15px",
      color: isDarkMode ? "#cbd5e0" : "#ecf0f1"
    },
    socialIcons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "15px"
    },
    socialIcon: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none"
    },
    facebookIcon: {
      backgroundColor: "#3b5998"
    },
    whatsappIcon: {
      backgroundColor: "#25d366"
    },
    emailIcon: {
      backgroundColor: "#ea4335"
    },
    phoneIcon: {
      backgroundColor: "#34495e"
    },
    contactInfo: {
      fontSize: "0.95rem",
      lineHeight: "1.6",
      color: isDarkMode ? "#a0aec0" : "#bdc3c7"
    },
    contactItem: {
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      paddingTop: "20px",
      borderTop: isDarkMode ? "1px solid #4a5568" : "1px solid #34495e",
      color: isDarkMode ? "#718096" : "#95a5a6",
      fontSize: "0.9rem"
    }
  };

  const FacebookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.49 3.488"/>
    </svg>
  );

  const EmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );

  return (
    <div style={styles.contactPanel}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Connect With Us</h3>
          <div style={styles.socialIcons}>
            <a
              href="https://facebook.com/schoolin"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.socialIcon, ...styles.facebookIcon }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-3px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              aria-label="Visit our Facebook page"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://wa.me/265999123456"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.socialIcon, ...styles.whatsappIcon }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-3px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              aria-label="Contact us on WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="mailto:info@schoolin.mw"
              style={{ ...styles.socialIcon, ...styles.emailIcon }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-3px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              aria-label="Send us an email"
            >
              <EmailIcon />
            </a>
            <a
              href="tel:+265999123456"
              style={{ ...styles.socialIcon, ...styles.phoneIcon }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-3px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              aria-label="Call us"
            >
              <PhoneIcon />
            </a>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Contact Information</h3>
          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>
              <PhoneIcon />
              <span>+265 999 123 456</span>
            </div>
            <div style={styles.contactItem}>
              <EmailIcon />
              <span>info@schoolin.mw</span>
            </div>
            <div style={styles.contactItem}>
              📍 <span>Lilongwe, Malawi</span>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Office Hours</h3>
          <div style={styles.contactInfo}>
            <div>Monday - Friday</div>
            <div>8:00 AM - 5:00 PM</div>
            <div style={{ marginTop: "10px" }}>Saturday</div>
            <div>9:00 AM - 2:00 PM</div>
            <div style={{ marginTop: "10px" }}>Sunday: Closed</div>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p>&copy; 2025 Schoolin. All rights reserved. | Making education accessible to everyone.</p>
      </div>
    </div>
  );
}

export default memo(ContactPanel);
