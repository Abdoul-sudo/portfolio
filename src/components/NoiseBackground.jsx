import { useEffect, useRef } from 'react';
import { getTheme } from '../config/metaballThemes';
import '../styles/noise.css';

const NoiseBackground = ({ theme = 'light' }) => {
  const noiseRef = useRef(null);

  useEffect(() => {
    if (!noiseRef.current) return;

    const themeConfig = getTheme(theme);
    // Update noise opacity based on theme
    noiseRef.current.style.opacity = themeConfig.noiseOpacity;
  }, [theme]);

  return <div ref={noiseRef} className="noise" aria-hidden="true" />;
};

export default NoiseBackground;
