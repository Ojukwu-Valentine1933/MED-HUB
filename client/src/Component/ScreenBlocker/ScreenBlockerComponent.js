import React, { useState, useEffect } from "react";

const ScreenBlocker = ({ children }) => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Function to check screen size
  const checkScreenSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 200) {
      setIsMobileOrTablet(true); // Block for screens 768px or less
    } else {
      setIsMobileOrTablet(false); // Allow for screens wider than 200px
    }
  };

  useEffect(() => {
    // Check screen size when the component mounts
    checkScreenSize();

    // Check screen size when the window is resized
    window.addEventListener("resize", checkScreenSize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // If mobile or tablet, show the warning message
  if (isMobileOrTablet) {
    return (
      <div style={styles.blocker}>
        <h1>Website Not Available on Mobile/Tablet</h1>
        <p>Please access this website using a desktop for the best experience.</p>
      </div>
    );
  }

  // Render the children (rest of the website) if the screen is larger than 768px
  return <>{children}</>;
};

// Basic styles for the blocker message
const styles = {
  blocker: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
};

export default ScreenBlocker;
