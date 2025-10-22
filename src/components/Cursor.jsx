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
        duration: 0.5,
        ease: 'power3.out'
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power3.out'
      });
    };

    // Interactive elements hover handlers
    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .filter-btn, .interactive'
    );

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.8,
        backgroundColor: 'rgba(34, 211, 238, 0.15)',
        borderColor: '#22D3EE',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: '#FFFFFF',
        duration: 0.3,
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
