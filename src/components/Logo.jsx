import logo from '../assets/logo.svg';
import '../styles/logo.css';

const Logo = ({ onNavigate }) => {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <button className="logo interactive" onClick={handleClick} aria-label="Go to Home">
      <img src={logo} alt="Abdoul" />
    </button>
  );
};

export default Logo;
