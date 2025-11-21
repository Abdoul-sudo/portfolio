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

    // Soft pastel colors (visible and elegant)
    sphereColors: [
      new THREE.Color(0xD4EEFF), // Soft blue - more saturated
      new THREE.Color(0xFFE0EC), // Soft coral/pink - more saturated
      new THREE.Color(0xEDE0FF), // Soft purple/lavender - more saturated
      new THREE.Color(0xDCFFE8), // Soft mint green - more saturated
      new THREE.Color(0xD8EDFF), // Soft sky blue - more saturated
      new THREE.Color(0xFFE5F0)  // Soft rose - more saturated
    ],

    lightColor: new THREE.Color(0xffffff),
    cursorGlowColor: new THREE.Color(0xE8F0FF), // Very subtle blue tint

    // Light mode - improved elegance while keeping visibility
    ambientIntensity: 0.55,   // Slightly reduced for more elegance
    diffuseIntensity: 0.35,   // Increased for better definition
    specularIntensity: 0.3,   // Not used in simple shader
    specularPower: 15,        // Not used in simple shader
    fresnelPower: 2.5,        // Not used in simple shader
    glowIntensity: 0.5,       // Balanced glow
    rimPower: 4.0,            // Softer, wider rim
    contrast: 1.0,            // No tone mapping
    fogDensity: 0.03,         // Lighter fog for airiness

    // Animation
    smoothness: 0.6,          // Slightly smoother blending
    animationSpeed: 0.25,

    // Cursor settings - more subtle
    cursorGlowIntensity: 0.12,  // Reduced for elegance
    cursorGlowRadius: 2.0,      // Slightly smaller radius

    // Opacity reveal settings (desktop only)
    baseOpacity: 0.20,          // More visible at rest
    maxOpacity: 0.95,           // Almost full opacity near cursor

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

    // Opacity reveal settings (desktop only)
    baseOpacity: 0.15,          // Barely visible at rest
    maxOpacity: 1.0,            // Full opacity near cursor

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
