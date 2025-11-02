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
      .set(menuItemsRef.current, { y: 60, opacity: 0 })
      .fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .to(
        menuItemsRef.current,
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power3.out'
        },
        '-=0.2'
      );
  };

  const closeMenu = () => {
    const overlay = overlayRef.current;

    gsap.timeline()
      .to(menuItemsRef.current, {
        y: -40,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
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
      {/* Hamburger Button with SVG - Sharlee Style */}
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={isOpen ? closeMenu : openMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="48"
          height="48"
          className="hamburger-svg"
        >
          <title>Menu</title>

          {/* 8 circles around perimeter */}
          <circle className="circle circle-1" cx="12" cy="12" r="3" />
          <circle className="circle circle-2" cx="24" cy="12" r="3" />
          <circle className="circle circle-3" cx="36" cy="12" r="3" />
          <circle className="circle circle-4" cx="36" cy="24" r="3" />
          <circle className="circle circle-5" cx="36" cy="36" r="3" />
          <circle className="circle circle-6" cx="24" cy="36" r="3" />
          <circle className="circle circle-7" cx="12" cy="36" r="3" />
          <circle className="circle circle-8" cx="12" cy="24" r="3" />

          {/* Center circle */}
          <circle className="circle circle-center" cx="24" cy="24" r="3" />

          {/* Rectangles for hover state (cross/plus shape) */}
          {/* Top vertical bar */}
          <rect className="rect rect-top" x="21" y="9" width="6" height="12" rx="3" ry="3" />
          {/* Right horizontal bar */}
          <rect className="rect rect-right" x="27" y="21" width="12" height="6" rx="3" ry="3" />
          {/* Bottom vertical bar */}
          <rect className="rect rect-bottom" x="21" y="27" width="6" height="12" rx="3" ry="3" />
          {/* Left horizontal bar */}
          <rect className="rect rect-left" x="9" y="21" width="12" height="6" rx="3" ry="3" />
          {/* Center square */}
          <rect className="rect rect-center" x="21" y="21" width="6" height="6" rx="3" ry="3" />
        </svg>
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
