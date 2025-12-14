import logoLight from "../assets/logoLight.svg"; // Black logo for light mode
import logoDark from "../assets/logoDark.svg"; // White logo for dark mode
import "../styles/logo.css";

const Logo = ({ onNavigate, menuRef, theme = "dark" }) => {
  const handleClick = () => {
    // Close the menu if it's open
    if (menuRef?.current?.closeMenu) {
      menuRef.current.closeMenu();
    }

    // Navigate to home after a short delay (to allow menu close animation)
    if (onNavigate) {
      setTimeout(() => {
        onNavigate("home");
      }, 400);
    }
  };

  // Select logo based on theme
  const currentLogo = theme === "light" ? logoLight : logoDark;

  return (
    <button
      className="logo interactive"
      onClick={handleClick}
      aria-label="Go to Home"
    >
      <img src={currentLogo} alt="Abdoul" />
    </button>
  );
};

export default Logo;
