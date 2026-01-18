import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import '../styles/menu.css';

const Menu = forwardRef(({ onNavigate, currentSection, theme, onThemeChange }, ref) => {
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
    document.body.classList.add('menu-open');
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
            document.body.classList.remove('menu-open');
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

  // Expose closeMenu function to parent via ref
  useImperativeHandle(ref, () => ({
    closeMenu
  }));

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

          {/* Theme Toggle in Menu */}
          <button
            className="menu-theme-toggle"
            onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
            tabIndex={isOpen ? 0 : -1}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </>
  );
});

Menu.displayName = 'Menu';

export default Menu;
