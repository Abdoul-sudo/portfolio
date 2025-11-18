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
    ambientIntensity: 0.03,
    diffuseIntensity: 0.5,
    specularIntensity: 1.5,  // Moderate specular
    specularPower: 8,        // Tighter highlights
    fresnelPower: 1.5,       // Moderate edge glow
    glowIntensity: 0.4,
    rimPower: 2.0,
    contrast: 1.4,
    fogDensity: 0.04,

    // Animation
    smoothness: 0.55,
    animationSpeed: 0.25,

    // Cursor glow settings
    cursorGlowIntensity: 0.35,
    cursorGlowRadius: 1.1,

    // Noise overlay
    noiseOpacity: 0.25
  },

  dark: {
    name: 'Dark Mode',
    // EXACT holographic preset from original
    backgroundColor: new THREE.Color(0x0a0a15),
    bodyBackgroundColor: '#0a0a15',
    textColor: '#ffffff',
    textSecondaryColor: '#cccccc',

    // Single sphere color (original uses one base color, not per-sphere)
    sphereColors: [
      new THREE.Color(0x050510), // Dark base color
      new THREE.Color(0x050510),
      new THREE.Color(0x050510),
      new THREE.Color(0x050510),
      new THREE.Color(0x050510),
      new THREE.Color(0x050510)
    ],

    lightColor: new THREE.Color(0xccaaff),  // Purple-pink light
    cursorGlowColor: new THREE.Color(0xaa77ff), // Purple glow

    // Exact holographic preset lighting
    ambientIntensity: 0.12,
    diffuseIntensity: 1.2,
    specularIntensity: 2.5,  // High specular for shine
    specularPower: 3,        // Low power = wide highlights
    fresnelPower: 0.8,       // Strong edge glow
    glowIntensity: 1.2,      // Moderate overall glow
    rimPower: 0.8,

    // Original settings
    smoothness: 0.8,
    animationSpeed: 0.25,
    contrast: 1.6,
    fogDensity: 0.06,

    // Cursor glow - exact from holographic preset
    cursorGlowIntensity: 1.2,
    cursorGlowRadius: 2.2,

    // Noise overlay
    noiseOpacity: 0.25
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
