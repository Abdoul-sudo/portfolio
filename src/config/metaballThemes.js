import * as THREE from 'three';

/**
 * Metaball theme configurations
 * Each theme defines visual appearance, lighting, and animation properties
 */
export const METABALL_THEMES = {
  light: {
    name: 'Light Mode',
    backgroundColor: new THREE.Color(0xFAFBFC), // Off-white
    bodyBackgroundColor: '#FAFBFC',
    textColor: '#1a1a1a',
    textSecondaryColor: '#666666',

    // Sophisticated desaturated pastels
    sphereColors: [
      new THREE.Color(0xDCF2FF), // Very light blue
      new THREE.Color(0xFFE5EE), // Very light coral/pink
      new THREE.Color(0xF0E6FF), // Very light purple/lavender
      new THREE.Color(0xE0FFED), // Very light mint green
      new THREE.Color(0xE0F3FF), // Very light sky blue
      new THREE.Color(0xFFEBF4)  // Very light rose
    ],

    lightColor: new THREE.Color(0xffffff),
    cursorGlowColor: new THREE.Color(0xCCF5FF), // Light cyan

    // Lighting settings - reduced for subtlety like original
    ambientIntensity: 0.03,  // Much lower ambient
    diffuseIntensity: 0.5,   // Moderate diffuse
    glowIntensity: 0.4,      // Subtle rim glow
    rimPower: 2.0,           // Softer rim

    // Animation
    smoothness: 0.55,
    animationSpeed: 0.25,

    // Cursor glow settings
    cursorGlowIntensity: 0.35,
    cursorGlowRadius: 1.1,

    // Noise overlay
    noiseOpacity: 0.015
  },

  dark: {
    name: 'Dark Mode',
    backgroundColor: new THREE.Color(0x0a0a15), // Very dark blue-black
    bodyBackgroundColor: '#0a0a15',
    textColor: '#ffffff',
    textSecondaryColor: '#cccccc',

    // Holographic/vibrant colors for dark mode
    sphereColors: [
      new THREE.Color(0xccaaff), // Bright purple
      new THREE.Color(0xaa77ff), // Electric purple
      new THREE.Color(0x8899ff), // Bright blue
      new THREE.Color(0x00ffcc), // Cyan
      new THREE.Color(0xff6699), // Pink
      new THREE.Color(0x66ffaa)  // Mint
    ],

    lightColor: new THREE.Color(0xffffff),
    cursorGlowColor: new THREE.Color(0xaa77ff), // Purple glow

    // Lighting settings - subtle like original dark themes
    ambientIntensity: 0.04,  // Very low ambient
    diffuseIntensity: 0.8,   // Moderate diffuse
    glowIntensity: 1.6,      // Strong rim for edge definition
    rimPower: 1.4,           // Softer, wider rim

    // Animation
    smoothness: 0.8,
    animationSpeed: 0.25,

    // Cursor glow settings - more prominent in dark mode
    cursorGlowIntensity: 0.8,
    cursorGlowRadius: 1.5,

    // Noise overlay - less visible on dark
    noiseOpacity: 0.45
  }
};

/**
 * Get theme configuration by name
 * @param {string} themeName - 'light' or 'dark'
 * @returns {object} Theme configuration
 */
export const getTheme = (themeName = 'light') => {
  return METABALL_THEMES[themeName] || METABALL_THEMES.light;
};

/**
 * Get initial theme from localStorage or system preference
 * @returns {string} 'light' or 'dark'
 */
export const getInitialTheme = () => {
  // Check localStorage first
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme && METABALL_THEMES[savedTheme]) {
    return savedTheme;
  }

  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

/**
 * Save theme preference to localStorage
 * @param {string} themeName - Theme to save
 */
export const saveTheme = (themeName) => {
  localStorage.setItem('portfolio-theme', themeName);
};
