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

    // Soft pastel colors (visible like the image)
    sphereColors: [
      new THREE.Color(0xDCF2FF), // Light blue
      new THREE.Color(0xFFE5EE), // Light coral/pink
      new THREE.Color(0xF0E6FF), // Light purple/lavender
      new THREE.Color(0xE0FFED), // Light mint green
      new THREE.Color(0xE0F3FF), // Light sky blue
      new THREE.Color(0xFFEBF4)  // Light rose
    ],

    lightColor: new THREE.Color(0xffffff),
    cursorGlowColor: new THREE.Color(0xffffff), // White glow

    // Light mode uses OLD shader style (simple emissive glow)
    ambientIntensity: 0.65,   // Higher for visibility
    diffuseIntensity: 0.25,   // Moderate
    specularIntensity: 0.3,   // Minimal (not used in old shader)
    specularPower: 15,        // Not used in old shader
    fresnelPower: 2.5,        // Not used in old shader
    glowIntensity: 0.6,       // Important for pastel visibility
    rimPower: 3.5,            // Soft rim
    contrast: 1.0,            // No tone mapping for light mode
    fogDensity: 0.0,          // No fog for light mode

    // Animation
    smoothness: 0.55,
    animationSpeed: 0.25,

    // OLD shader cursor settings (simpler)
    cursorGlowIntensity: 0.15,  // From old shader
    cursorGlowRadius: 2.5,      // From old shader

    // Noise overlay
    noiseOpacity: 0.015
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
