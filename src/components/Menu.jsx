import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/menu.css';

const Menu = ({ onNavigate, currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' }
  ];

  const openMenu = () => {
    setIsOpen(true);
    const overlay = overlayRef.current;

    gsap.timeline()
      .set(overlay, { display: 'flex' })
      .fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .from(
        menuItemsRef.current,
        {
          y: 40,
          opacity: 0,
          stagger: 0.06,
          duration: 0.4,
          ease: 'power2.out'
        },
        '-=0.2'
      );
  };

  const closeMenu = () => {
    const overlay = overlayRef.current;

    gsap.timeline()
      .to(menuItemsRef.current, {
        y: -20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.2,
        ease: 'power2.in'
      })
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setIsOpen(false);
            gsap.set(overlay, { display: 'none' });
          }
        },
        '-=0.1'
      );
  };

  const handleNavigate = (sectionId) => {
    closeMenu();
    setTimeout(() => {
      onNavigate(sectionId);
    }, 400);
  };

  const handleKeyPress = (e, sectionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate(sectionId);
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={isOpen ? closeMenu : openMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Fullscreen Overlay */}
      <div
        ref={overlayRef}
        className="menu-overlay"
        style={{ display: 'none' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="menu-nav">
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li key={item.id} className="menu-list-item">
                <button
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  className={`menu-item interactive ${
                    currentSection === item.id ? 'active' : ''
                  }`}
                  onClick={() => handleNavigate(item.id)}
                  onKeyPress={(e) => handleKeyPress(e, item.id)}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Menu;
