import { useState, useEffect } from 'react';
import '../styles/mobileBalls.css';

/**
 * CSS-based decorative balls for mobile
 * Replaces WebGL metaballs for better performance and appearance
 * Positions match METABALL_CONFIGS_MOBILE from metaballPositions.js
 */

// Convert metaball world coords to viewport percentages
// x: [-1.5, 1.5] -> [0%, 100%]
// y: [3, -3] -> [0%, 100%] (inverted)
// radius: 0.25-0.65 -> 80-200px
const toViewport = (x, y, radius) => ({
  x: ((x + 1.5) / 3) * 100,
  y: ((3 - y) / 6) * 100,
  size: Math.round(radius * 280)
});

// Ball configurations matching metaballPositions.js mobile config
const BALL_CONFIGS = {
  home: [
    toViewport(-1.2, 2.5, 0.65),   // Top left
    toViewport(0.5, 0.6, 0.5),     // Center right
    toViewport(-1.0, -0.8, 0.35),  // Mid left
    toViewport(1.3, -2.0, 0.65)    // Bottom right
  ],
  work: [
    toViewport(-1.3, 2.5, 0.6),    // Top left
    toViewport(1.3, 2.8, 0.5),     // Top right
    toViewport(-0.1, -0.3, 0.65),  // Center
    toViewport(1.2, 0.5, 0.35)     // Mid right
  ],
  about: [
    toViewport(-1.3, 2.2, 0.55),   // Upper left
    toViewport(-1.7, -1.5, 0.65),  // Lower left
    toViewport(-0.3, 0.1, 0.25),   // Mid center
    toViewport(1.4, -1.0, 0.55)    // Lower right
  ],
  contact: [
    toViewport(-1.2, 2.5, 0.5),    // Upper left
    toViewport(-0.4, -0.9, 0.3),   // Center left
    toViewport(0.9, 2.0, 0.45),    // Top right
    toViewport(1.3, -1.4, 0.6)     // Lower right
  ]
};

const MobileBalls = ({ currentSection = 'home', theme = 'light' }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;
      // Match the same breakpoint as MetaballBackground
      setIsMobile(width < 768 || (width < 900 && aspectRatio < 1));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  const balls = BALL_CONFIGS[currentSection] || BALL_CONFIGS.home;

  return (
    <div className={`mobile-balls ${theme}`}>
      {balls.map((ball, index) => (
        <div
          key={`${currentSection}-${index}`}
          className="mobile-ball"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default MobileBalls;
