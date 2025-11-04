import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    // Mouse move handler
    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power3.out'
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power3.out'
      });
    };

    // Interactive elements hover handlers - includes all text elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .filter-btn, .interactive, h1, h2, h3, h4, h5, h6, p, .hero-line, .hero-cta, .about-title, .about-description, .work-item-name, .contact-title, .contact-column-title, .contact-arrow, .contact-text, .menu-item'
    );

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: 'rgb(92, 104, 135)',
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.out',
        borderWidth: 0
      });

      // Hide the dot on hover
      gsap.to(cursorDot, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          duration: 0.3,
          opacity: 1,
          ease: 'power2.out',
          borderWidth: '2px',
      });

      // Show the dot again
      gsap.to(cursorDot, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default Cursor;
