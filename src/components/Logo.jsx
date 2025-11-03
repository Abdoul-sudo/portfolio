import logo from '../assets/logo.svg';
import '../styles/logo.css';

const Logo = ({ onNavigate, menuRef }) => {
  const handleClick = () => {
    // Close the menu if it's open
    if (menuRef?.current?.closeMenu) {
      menuRef.current.closeMenu();
    }

    // Navigate to home after a short delay (to allow menu close animation)
    if (onNavigate) {
      setTimeout(() => {
        onNavigate('home');
      }, 400);
    }
  };

  return (
    <button className="logo interactive" onClick={handleClick} aria-label="Go to Home">
      <img src={logo} alt="Abdoul" />
    </button>
  );
};

export default Logo;
